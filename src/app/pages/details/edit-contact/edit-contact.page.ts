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

    var pathBack = "../";
    this.person.avatar = pathBack.concat(this.person.avatar);

    this.loading.dismiss();
  }
  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
      age: ['', [Validators.required, Validators.minLength(1),Validators.maxLength(3)]],
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
      console.log('Please provide all the required values!');
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
    
    if(this.imageSrc){
      this.person.avatar = this.imageSrc;
    } else {
      this.person.avatar = "../../assets/img/person_icon.png";
    }       
    
    const key = await this.firebaseDataService.bruteUpdateItem('/users/' + await this.auth.getCurrentUserId() + '/contacts/' + this.idContact, this.person);    
    console.log(key);
    
    this.dataService.setData(this.idContact, this.idContact);
    // let str = 'details/' + this.idContact;
    this.navCtrl.setDirection('forward');
    this.navCtrl.navigateForward("/home");   
   }

   defineCameraOptions(){
    this.cameraOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.FILE_URI,
      quality: 100,
      correctOrientation: true
    };
   }

   async openGalleryPhotos() {  
     debugger   
    this.defineCameraOptions();
    
    try {
      const fileUri: string = await this.camera.getPicture(this.cameraOptions);

      let file: string;

      if(this.plt.is('ios')){
        file = fileUri.split('/').pop();
      } else {
        file = fileUri.substring(fileUri.lastIndexOf('/') + 1, fileUri.indexOf("?"));
      }

      const path: string = fileUri.substring(0, fileUri.lastIndexOf('/'));

      const buffer: ArrayBuffer = await this.file.readAsArrayBuffer(path, file);
      const blob: Blob = new Blob([buffer], { type: 'image/jpeg'});

      this.uploadPictureFirebaseStorage(blob);

    } catch (error) {
      console.log(error);
    }    
   }
   
   uploadPictureFirebaseStorage(blob: Blob){
     debugger
    this.fireStorage.ref('images/ionic.jpg').put(blob);
   }

   async showWaitLoading(){
    this.loading = await this.loadingController.create({
      message: 'Aguarde...',
    });
    await this.loading.present();   
   }

}