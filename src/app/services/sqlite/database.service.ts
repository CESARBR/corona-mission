import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import challenges from "../../../assets/challenges.json"; 

@Injectable()
export class DatabaseProvider {

  private db: SQLiteObject;

  constructor(private sqlite: SQLite) { }

  public async getDB() {

    if (!this.db) {
      this.db = await this.sqlite.create({
        name: 'grandpa_mission.db',
        location: 'default'
      });
    } 
    return this.db;
  }

  public async createDatabase() {

    const db = await this.getDB();
    await this.createTables(db);
    await this.insertDefaultItems(db);
  }

  private async createTables(db: SQLiteObject) {
    
    await db.sqlBatch([
      ['CREATE TABLE IF NOT EXISTS challenges (id integer primary key NOT NULL, title varchar(200) NOT NULL, description TEXT NOT NULL, icon varchar(200) NOT NULL)'],
      [`CREATE TABLE IF NOT EXISTS contacts (id integer primary key AUTOINCREMENT  NOT NULL, name varchar(250), age integer, 
      register_date DATE, avatar TEXT, phone varchar(20), relationship varchar(20), mission varchar(200), mission_color varchar(30), mission_label_color varchar(30))`],
      [`CREATE TABLE IF NOT EXISTS contact_challenges (id_contact integer NOT NULL, id_challenge integer NOT NULL, 
        status varchar(150) NOT NULL, last_change DATE, FOREIGN KEY(id_contact) REFERENCES contacts(id), FOREIGN KEY(id_challenge) REFERENCES challenges(id),
        PRIMARY KEY (id_contact, id_challenge) )`],
    ]);
  }

  private async insertDefaultItems(db: SQLiteObject) {

    const data = await db.executeSql('select COUNT(id) as qtd from challenges', []);

    if (data.rows.item(0).qtd == 0) {

      const insertChallenges: Array<any> = [];

      challenges.forEach((challenge) => {
          insertChallenges.push(['insert into challenges (id, title, description, icon) values (?, ?, ?, ?)', 
          [challenge.id, challenge.title, challenge.description, challenge.icon]]);
      });

      await db.sqlBatch(insertChallenges);
      console.log('Challenges incluídos');
    }
  }
}