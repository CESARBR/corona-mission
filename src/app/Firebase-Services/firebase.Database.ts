import { environment } from 'src/environments/environment';
import * as firebase from 'firebase/app';
import 'firebase/database';

firebase.initializeApp(environment.firebase);

export class DatabaseServices {
    constructor(

    ) { }



    createItem(path: string, item) {
        var modelReference = firebase.database().ref(path);

        modelReference.push(item);

    }

    createManyItem(path: string, item: Array<any>) {
        item.forEach(value => {
            this.createItem(path, value);
        });
    }

    readItemByKey(path: string, key: string) {
        var response;
        var modelReference = firebase.database().ref(path + (key ? '/' + key : ''));
        modelReference.once('value',snapshot => {
            if (snapshot.val())
                response = snapshot.val();
            else response = '';
        });
        return response;

    }

    //readItemByAtribute(path:string, atribute:string ) {

    // }

    // updateItemByKey() {

    // }

    // updateItemByAtribute() {

    // }

    // deleteItemByKey() {

    // }

    // deleteItemByAtribute() {

    // }


}