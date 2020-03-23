import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

export interface Item {
  id: number,
  name: string,
  email: string,
  password: string,
  created: number
}

export interface Person {
  id: number,
  name: string,
  relationship: string,
  age: number,
  phone: string,
  avatar: string
}

const ITEMS_KEY = 'my-items';
const PERSON_KEY = 'my-persons';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage : Storage) { }

  //Create user
  addItem(item : Item) : Promise<any> {    
    return this.storage.get(ITEMS_KEY).then((items: Item[]) => {
      if(items){
        items.push(item);        
        return this.storage.set(ITEMS_KEY, [items]);
      } else {
        return this.storage.set(ITEMS_KEY, [item]);
      }
    });
  }

  //Read users
  getItems() : Promise<Item[]>{
    return this.storage.get(ITEMS_KEY);
  }

  //Update user
  updateItem(item : Item) : Promise<Item> {
    return this.storage.get(ITEMS_KEY).then((items: Item[]) => {
      if(!items || items.length == 0){
        return null;
      } 
      let newItems: Item[] = [];

      for(let i of items){
        if(i.id === item.id){
          newItems.push(item);
        } else {
          newItems.push(i);
        }
      }

      return this.storage.set(ITEMS_KEY, newItems);

    });
  }

  //Delete user
  deleteItem(id: number) : Promise<Item> {
    return this.storage.get(ITEMS_KEY).then((items: Item[]) => {
      if(!items || items.length == 0){
        return null;
      }

      let toKeep: Item[] = [];

      for(let i of items){
        if(i.id !== id){
          toKeep.push(i);
        }
      }
      return this.storage.set(ITEMS_KEY, toKeep);
    });  
  }

  deleteAll(){
    this.storage.clear();
  }

  //Create person
  addPerson(person : Person) : Promise<any> {   
    return this.storage.get(PERSON_KEY).then((persons: Person[]) => {
      if(persons){        
        persons.push(person);        
        return this.storage.set(PERSON_KEY, persons);
      } else {
        return this.storage.set(PERSON_KEY, [person]);
      }
    });
  }

  //Read persons
  getPersons(): Promise<Person[]>{
    return this.storage.get(PERSON_KEY);
  }

    //Update person
    updatePerson(person : Person) : Promise<Person> {
      return this.storage.get(PERSON_KEY).then((persons: Person[]) => {
        if(!persons || persons.length == 0){
          return null;
        } 
        let newPersons: Person[] = [];
  
        for(let i of persons){
          if(i.id === person.id){
            newPersons.push(person);
          } else {
            newPersons.push(i);
          }
        }  
        return this.storage.set(ITEMS_KEY, newPersons);
      });
    }
}
