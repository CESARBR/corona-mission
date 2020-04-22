import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NavController, Platform, ToastController, LoadingController } from '@ionic/angular';
import { FirebaseDatabaseServices } from 'src/app/services/firebase/firebase-database.service';
import { AuthFirebaseService } from '../../../services/firebase/firebase-auth.service';
import { DataService } from 'src/app/services/data.service';
import { Camera } from '@ionic-native/camera/ngx';

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

  constructor(public formBuilder: FormBuilder, private navCtrl: NavController,
    private plt:Platform, private dataService: DataService, private toastCtrl: ToastController,
    private firebaseDataService: FirebaseDatabaseServices, private router: ActivatedRoute, 
    private auth: AuthFirebaseService, public loadingController: LoadingController,
    private camera: Camera) {

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

   openGalleryPhotos() {     
    let cameraOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.NATIVE_URI,      
      quality: 100,      
      encodingType: this.camera.EncodingType.JPEG,      
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      saveToPhotoAlbum: true
    }
  
    this.camera.getPicture(cameraOptions).then((imageData) => {
      console.log(imageData);
      this.imageSrc = imageData;
    }, (err) => {
      console.log(err);
    });
   }

}