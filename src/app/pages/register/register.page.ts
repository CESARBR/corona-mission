import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NavController, Platform } from '@ionic/angular';
import { StorageService, Person } from '../../services/storage.service';

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

  constructor(public formBuilder: FormBuilder, private navCtrl: NavController,
    private storageService: StorageService, private plt:Platform) { 
    this.plt.ready().then(() => {        
      this.loadPersons();
      this.storageService.deleteAll();
    });
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
      console.log('Please provide all the required values!')
      return false;
    } else {
      this.navCtrl.setDirection('forward');
      this.navCtrl.navigateForward('/home');
    }
  }

  //READ ITEMS
  loadPersons(){
    this.storageService.getPersons().then(persons => {
      this.persons = persons;      
    });
  } 

  addUser() {        
    this.newPerson.id = Date.now();
    this.newPerson.name = this.ionicForm.value.name;
    this.newPerson.age = this.ionicForm.value.age;
    this.newPerson.phone = this.ionicForm.value.phone;
    this.newPerson.relationship = this.ionicForm.value.relationship;

    this.storageService.addPerson(this.newPerson).then(person => {
      this.newPerson = <Person>{};
    });
    this.loadPersons();
    console.log(this.persons);
  }

}
