import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NavController, Platform, ToastController } from '@ionic/angular';
import { StorageService, Item } from '../../services/storage.service';

@Component({
  selector: 'app-login-email',
  templateUrl: './login-email.page.html',
  styleUrls: ['./login-email.page.scss'],
})

export class LoginEmailPage implements OnInit {
  ionicForm: FormGroup;
  isSubmitted = false;

  items: Item[] = [];
  newItem: Item = <Item>{}; 

  constructor(public formBuilder: FormBuilder, private navCtrl: NavController,
    private storageService: StorageService, private plt:Platform) { 
      this.plt.ready().then(() => {
        this.loadItems();        
      });
  }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
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
      this.navCtrl.setDirection('forward');
      this.navCtrl.navigateForward('/home');      
    }
  }  

  //READ ITEMS
  loadItems(){
    this.storageService.getItems().then(items => {
      this.items = items;
      console.log(this.items);
    });
  } 

  addUser() {        
    this.newItem.id = Date.now();
    this.newItem.created = Date.now();
    this.newItem.email = this.ionicForm.value.email;    
    
    this.storageService.addItem(this.newItem).then(item => {
      this.newItem = <Item>{};
      console.log('Items added');
      this.loadItems();
      console.log(this.loadItems());
    });
  }

}
