import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NavController, Platform, ToastController, LoadingController } from '@ionic/angular';
import { FirebaseDatabaseServices } from 'src/app/services/firebase/firebase-database.service';
import { AuthFirebaseService } from '../../../services/firebase/firebase-auth.service';
import { DataService } from 'src/app/services/data.service';
import { Camera } from '@ionic-native/camera/ngx';
import { AngularFireStorage } from '@angular/fire/storage';
import { File } from '@ionic-native/file/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';

@Component({
  templateUrl: './edit-contact.page.html',
  styleUrls: ['./edit-contact.page.scss'],
})

export class EditContactPage implements OnInit {
  idContact: string;
  ionicForm: FormGroup;  
  contactsPath: string;  
  person: any;
  isSubmitted = false;
  loading: any;
  imageSrc: string;
  cameraOptions: {}

  constructor(public formBuilder: FormBuilder, private navCtrl: NavController,
    private plt:Platform, private dataService: DataService, private toastCtrl: ToastController,
    private firebaseDataService: FirebaseDatabaseServices, private router: ActivatedRoute, 
    private auth: AuthFirebaseService, public loadingController: LoadingController,
    private camera: Camera, private fireStorage: AngularFireStorage,
    private webview: WebView,
    private file: File) {

      this.auth.getCurrentUserId().then((id) => {

        this.contactsPath = '/users/' + id + '/contacts';
      })
  }

  async ionViewWillEnter() {
    this.loading = await this.loadingController.create({
      message: 'Aguarde...',
    });
    await this.loading.present();

    this.idContact = this.router.snapshot.params.id;
    const contact = await this.firebaseDataService.readItemByKey(`${this.contactsPath}/${this.idContact}`);    
    this.person = contact.val();
    this.ionicForm.controls['name'].setValue(this.person.name);
    this.ionicForm.controls['age'].setValue(this.person.age);
    this.ionicForm.controls['phone'].setValue(this.person.phone);
    this.ionicForm.controls['relationship'].setValue(this.person.relationship);

    this.imageSrc = this.webview.convertFileSrc(this.file.dataDirectory + this.person.avatar);

    this.loading.dismiss();
  }
  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
      age: ['', [Validators.required, Validators.pattern('[1-9]{1}[0-9]{0,2}')]],
      phone: ['', [Validators.required]],
      relationship: ['', Validators.required],
    }, {
      validators: this.ageValidation.bind(this)
    });
  }

  ageValidation(formGroup: FormGroup){    
    const { value: age } = formGroup.get('age');
    return age == 0 || age >= 130 ? {ageInvalid: true} : false;
  }

  get errorControl() {
    return this.ionicForm.controls;
  }

  submitForm() {
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      return false;
    } else {
      this.updateUser();
    }
  }

   async updateUser() {     
     debugger
    this.person.name = this.ionicForm.value.name;
    this.person.age = this.ionicForm.value.age;
    this.person.phone = this.ionicForm.value.phone;
    this.person.relationship = this.ionicForm.value.relationship;
    this.person.mission = "Clique para realizar missões!";
    this.person.mission_color = "dark";
    this.person.mission_label_color = "dark";
    
    const key = await this.firebaseDataService.bruteUpdateItem('/users/' + await this.auth.getCurrentUserId() + '/contacts/' + this.idContact, this.person);
    
    this.dataService.setData(this.idContact, this.idContact);
    // let str = 'details/' + this.idContact;
    this.navCtrl.setDirection('forward');
    this.navCtrl.navigateForward("/home");   
   }

   defineCameraOptions(){
    this.cameraOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.FILE_URI,
      quality: 50,
      correctOrientation: true
    };
   }

   async openGalleryPhotos() {         
    this.defineCameraOptions();
    
    try {
      const fileUri: string = await this.camera.getPicture(this.cameraOptions);
      const tempImage = fileUri;

      let fileName: string;

      if(this.plt.is('ios')){
        fileName = fileUri.split('/').pop();
      } else {
        fileName = fileUri.substring(fileUri.lastIndexOf('/') + 1, fileUri.indexOf("?"));
      }

      const tempBaseFilesystemPath = tempImage.substr(0, tempImage.lastIndexOf('/') + 1);
      const newBaseFilesystemPath = this.file.dataDirectory;
      const createdFile = await this.file.copyFile(tempBaseFilesystemPath, fileName, 
                              newBaseFilesystemPath, fileName);
      
      const storedPhoto = newBaseFilesystemPath + fileName;
      this.person.avatar = fileName;


      //await this.uploadPictureFirebaseStorage(blob, fileName);

    } catch (error) {
      console.log(error);
    }    
   }
   
   async uploadPictureFirebaseStorage(blob: Blob, fileName: string){
    let pathImage = "images" + this.contactsPath + "/" + this.idContact + "/" + fileName;

    await this.fireStorage.ref(pathImage).put(blob);
   }

   async showWaitLoading(){
    this.loading = await this.loadingController.create({
      message: 'Aguarde...',
    });
    await this.loading.present();
   }

   storePictureInfoToDatabase(metaInfo) {
     let toSave = {
       created: metaInfo.timeCreated,
       url: metaInfo.downloadURLs[0],
       fullPath: metaInfo.fullPath,
       contentType: metaInfo.contentType
     }
   }

}