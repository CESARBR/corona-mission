import { Injectable } from '@angular/core';
import { DatabaseProvider } from './database.service';
import { Challenge } from 'src/app/models';

@Injectable()
export class ChallengeDatabaseService {

  constructor(private dbProvider: DatabaseProvider) {}

  public async getAll() {

    const db = await this.dbProvider.getDB();

    return db.executeSql("select * from challenges", []);
  }

}