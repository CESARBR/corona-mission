import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NavController } from '@ionic/angular';
import { Person, Challenge } from '../../models';
import { ContactDatabaseService } from 'src/app/services/sqlite/contact-database.service';
import { ChallengeDatabaseService } from 'src/app/services/sqlite/challenge-database.service';
import { ContactChallengesDatabaseService } from 'src/app/services/sqlite/contact-challenges-database.service';

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
    private contactDatabaseService : ContactDatabaseService, private contactChallengesDatabaseService: ContactChallengesDatabaseService) {
  }

  ionViewWillLeave() {
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

  get errorControl() {
    return this.ionicForm.controls;
  }

  async submitForm() {
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      return false;
    } else {

      await this.addUser();
    }
  }

  async addUser() {
    this.newPerson.name = this.ionicForm.value.name;
    this.newPerson.age = this.ionicForm.value.age;
    this.newPerson.phone = this.ionicForm.value.phone;
    this.newPerson.relationship = this.ionicForm.value.relationship;
    this.newPerson.mission = "Clique para realizar missões!";
    this.newPerson.mission_color = "dark";
    this.newPerson.mission_label_color = "dark";
    this.newPerson.avatar = "../../assets/img/person_icon.png";
    this.newPerson.register_date = new Date((new Date().getTime() - (3*3600*1000))).toISOString();

    const resultInsert = await this.contactDatabaseService.insert(this.newPerson);
    await this.contactChallengesDatabaseService.configureNewContactChallenges(resultInsert.insertId);

    this.navCtrl.setDirection('forward');
    this.navCtrl.navigateForward('/home');
  }

  ageValidation(formGroup: FormGroup){
    const { value: age } = formGroup.get('age');
    return age == 0 || age >= 130 ? {ageInvalid: true} : false;
  }

}
