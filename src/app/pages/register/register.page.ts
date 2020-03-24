import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NavController, Platform } from '@ionic/angular';
import { StorageService, Person } from '../../services/storage.service';
import { Storage } from '@ionic/storage';

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
    private storageService: StorageService, private plt:Platform, private storage: Storage) { 
    this.plt.ready().then(() => {        
      this.loadPersons();
    });
}

  ngOnInit() {
    // set a key/value
    // this.storage.set('name', 'Max');

    // Or to get a key/value pair
    this.storage.get('persons').then((val) => {
      console.log('persons is', val);
      this.people = val;
    });

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
      let newPerson = {
        id: Date.now(),
        name: this.ionicForm.value.name,
        age: this.ionicForm.value.age,
        phone: this.ionicForm.value.phone,
        relationship: this.ionicForm.value.relationship,
        mission: "Realizar missões!",
        mission_color: "dark",
        mission_label_color: "dark",
        avatar: "../../assets/img/person_icon.png"
      }
      if (this.people === null) {
        this.people = [newPerson]
      } else {
        this.people.push(newPerson)
      }
      this.storage.set('persons', this.people);
      this.ionicForm.reset()
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
