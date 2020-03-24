import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NavController, Platform } from '@ionic/angular';
import { StorageService, Person } from '../../services/storage.service';
import { Storage } from '@ionic/storage';
import { DatabaseServices } from '../../Firebase-Services/firebase.Database';
import { AuthFirebaseService } from '../../Firebase-Services/firebase.Auth';
//import { database, auth } from '../../Firebase-Services/firebase.Services'

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  ionicForm: FormGroup;
  isSubmitted = false;

  persons: Person[] = [];
  newPerson: Person = <Person>{};

  people: any

  constructor(public formBuilder: FormBuilder, private navCtrl: NavController,
    private storageService: StorageService, private database : DatabaseServices, private auth : AuthFirebaseService) {
  }

  ionViewWillLeave() {
  }

  ngOnInit() {

    this.ionicForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      age: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      relationship: ['', Validators.required],
    })
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

      this.addUser();
    }
  }

  //READ ITEMS
  loadPersons() {
    this.storageService.getPersons().then(persons => {
      this.persons = persons;
    });
  }

  addUser() {
    this.newPerson.name = this.ionicForm.value.name;
    this.newPerson.age = this.ionicForm.value.age;
    this.newPerson.phone = this.ionicForm.value.phone;
    this.newPerson.relationship = this.ionicForm.value.relationship;
    this.newPerson.mission = "Clique para realizar missões!";
    this.newPerson.mission_color = "dark";
    this.newPerson.mission_label_color = "dark";
    this.newPerson.avatar = "../../assets/img/person_icon.png";

    const key = this.database.createItem('/users/' + this.auth.getCurrentUserId() + '/contacts', this.newPerson);
    console.log(key);

    this.navCtrl.setDirection('forward');
    this.navCtrl.navigateForward('/home');
  }


}
