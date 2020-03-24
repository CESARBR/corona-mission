import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { v4 as uuidv4 } from 'uuid';

export interface Item {
  id: number,
  name: string,
  email: string,
  password: string,
  created: number
}

export interface Person {
  id: string,
  name: string,
  relationship: string,
  age: number,
  phone: string,
  avatar: string,
  mission: string,
  mission_color: string,
  mission_label_color: string
}

const ITEMS_KEY = 'my-items';
const PERSON_KEY = 'my-persons';
const SEEN_SLIDES_KEY = 'seenSlides';
const LOGGED_USER_KEY = 'logged-user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage : Storage) { }


  isSeenSlides (): Promise<boolean> {
    return this.storage.get(SEEN_SLIDES_KEY);
  }

  markSeenSlides (): Promise<any> {
    return this.storage.set(SEEN_SLIDES_KEY, true);
  }

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
    person.id = uuidv4();
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

  setPersons(persons: Person[]): Promise<Person[]>{
    return this.storage.set(PERSON_KEY, persons);
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

    addLoggedUser (item: Item): Promise<any> {
      return this.storage.set(LOGGED_USER_KEY, item);
    }

    removeLoggedUser (): Promise<any> {
      return this.storage.remove(LOGGED_USER_KEY);
    }
}
