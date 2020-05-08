import { Injectable } from '@angular/core';
import { DatabaseProvider } from './database.service';
import { Person } from 'src/app/models';
import { SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable()
export class ContactDatabaseService {


  constructor(private dbProvider: DatabaseProvider) {
      
  }

  public async getAll() {

    const db = await this.dbProvider.getDB();

        //await db.executeSql("DELETE FROM contacts", []);

    return db.executeSql("select * from contacts order by name asc", []);
  }

  public async getById(id: number) {

    const db = await this.dbProvider.getDB();

    return db.executeSql("select * from contacts where id = ?", [id]);
  }

  public async insert (person: Person) {

    const db = await this.dbProvider.getDB();

    return db.executeSql(`INSERT INTO CONTACTS (name, age, phone, relationship, mission, register_date, avatar, mission, mission_color, mission_label_color)
     VALUES (?,?,?,?,?,?,?,?,?,?)`, [person.name, person.age, person.phone, person.relationship, person.mission, person.register_date, person.avatar, person.mission,
    person.mission, person.mission_label_color]);
  }

  public async deleteById (id: number) {
    const db = await this.dbProvider.getDB();

    return db.executeSql("DELETE FROM CONTACTS WHERE ID = ?", [id]);
  }

  public async updateContactInfo (person: Person) {

    const db = await this.dbProvider.getDB();

    return db.executeSql('UPDATE CONTACTS set name = ?, age = ?, phone = ?, relationship = ? WHERE id = ?'
    , [person.name, person.age, person.phone, person.relationship, person.id]);
  }

  public async updateContactAvatar (id: number, avatar: string) {

    const db = await this.dbProvider.getDB();

    return db.executeSql('UPDATE CONTACTS set avatar = ? WHERE id = ?'
    , [avatar, id]);
  }
}