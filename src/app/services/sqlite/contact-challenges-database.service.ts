import { Injectable } from '@angular/core';
import { DatabaseProvider } from './database.service';
import { Challenge } from 'src/app/models';
import { ChallengeDatabaseService } from './challenge-database.service';
import { SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable()
export class ContactChallengesDatabaseService {

  constructor(private dbProvider: DatabaseProvider, private challengeDatabaseService: ChallengeDatabaseService) {}

  public async getAll() {

    const db = await this.dbProvider.getDB();

    return db.executeSql(`select * from contact_challenges`, []);
  }

  public async getAllByContact(idContact: number) {

    const db = await this.dbProvider.getDB();

    return db.executeSql(`select * from contact_challenges inner join challenges on contact_challenges.id_challenge = challenges.id where contact_challenges.id_contact = ?`, [idContact]);
  }

  public async deleteByContact(idContact: number) {

    const db = await this.dbProvider.getDB();

    return db.executeSql(`delete from contact_challenges where contact_challenges.id_contact = ?`, [idContact]);
  }

  public async updateStatus(idContact: number, idChallenge: number, status: string) {

    const db = await this.dbProvider.getDB();
    const lastChange = new Date(new Date().getTime() - 3 * 3600 * 1000).toISOString();
    return db.executeSql(`update contact_challenges set status = ?, last_change = ? where id_contact = ? and id_challenge = ?`, [status, lastChange, idContact, idChallenge]);
  }

  public async configureNewContactChallenges (insertContactId: number) {

    const insertChallenges: Array<any> = [];
    const lastChange = new Date(new Date().getTime() - 3 * 3600 * 1000).toISOString();
    const challenges = await this.challengeDatabaseService.getAll();

    for (let i = 0; i < challenges.rows.length; i++) {
      const challenge = challenges.rows.item(i);

      insertChallenges.push(['insert into contact_challenges (id_contact, id_challenge, status, last_change) values (?, ?, ?, ?)', 
      [insertContactId, challenge.id, 'ellipse-outline', lastChange]]);
    }

    const db = await this.dbProvider.getDB();

    return db.sqlBatch(insertChallenges);
  }
}