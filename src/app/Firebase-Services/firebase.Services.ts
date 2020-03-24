import { environment } from 'src/environments/environment';
import * as firebase from 'firebase/app';
import {DatabaseServices} from './firebase.Database';
import { AuthServices } from './firebase.Auth';


firebase.initializeApp(environment.firebase);


export const database = new DatabaseServices();

export const auth = new AuthServices();

