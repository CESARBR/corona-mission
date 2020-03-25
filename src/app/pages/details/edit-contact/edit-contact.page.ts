import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { CallNumber } from '@ionic-native/call-number/ngx';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Storage } from '@ionic/storage';
import { NavController, Platform } from '@ionic/angular';
import { ThrowStmt } from '@angular/compiler';
import { StorageService, Person } from 'src/app/services/storage.service';

import {RegisterPage} from 'src/app/pages/register/register.page'
import { DatabaseServices } from 'src/app/Firebase-Services/firebase.Database';
import { AuthFirebaseService } from '../../../Firebase-Services/firebase.Auth';

@Component({
  templateUrl: './edit-contact.page.html',
  styleUrls: ['./edit-contact.page.scss'],
})
export class EditContactPage implements OnInit {

  idContact: string;
  ionicForm: FormGroup;
  persons: Person[] = [];
  contactsPath: string;
  newPerson: Person = <Person>{};  

  constructor(public formBuilder: FormBuilder, private navCtrl: NavController,
    private storageService: StorageService, private plt:Platform, private firebaseDataService: DatabaseServices, private router: ActivatedRoute, private auth: AuthFirebaseService) { 
      this.contactsPath = '/users/' + this.auth.getCurrentUserId() + '/contacts';

  }

  async ionViewWillEnter() {
    
    this.idContact = this.router.snapshot.params.id;
    const contact = await this.firebaseDataService.readItemByKey(`${this.contactsPath}/${this.idContact}`);
    console.log(contact.val());
    this.newPerson = contact.val();
    this.ionicForm.controls['name'].setValue(this.newPerson.name);
    this.ionicForm.controls['age'].setValue(this.newPerson.age);
    this.ionicForm.controls['phone'].setValue(this.newPerson.phone);
    this.ionicForm.controls['relationship'].setValue(this.newPerson.relationship);
  }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      age: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      relationship: ['', Validators.required],
    }); 
  }

  submitForm() {

    if (!this.ionicForm.valid) {
      console.log('Please provide all the required values!');
      return false;
    } else {
      this.updateUser();
    }
  }
  updateUser() {
    this.newPerson.name = this.ionicForm.value.name;
    this.newPerson.age = this.ionicForm.value.age;
    this.newPerson.phone = this.ionicForm.value.phone;
    this.newPerson.relationship = this.ionicForm.value.relationship;
    this.newPerson.mission = "Clique para realizar missões!";
    this.newPerson.mission_color = "dark";
    this.newPerson.mission_label_color = "dark";
    this.newPerson.avatar = "../../assets/img/person_icon.png";
    
    this.storageService.updatePerson(this.newPerson).then(() => {
        this.navCtrl.navigateBack('/home');
    })

  }
}
