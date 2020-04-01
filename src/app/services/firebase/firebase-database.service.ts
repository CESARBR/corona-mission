import * as firebase from 'firebase/app';
import 'firebase/database';
import { Injectable } from '@angular/core';

@Injectable()
export class FirebaseDatabaseServices {
    constructor(

    ) { }

    createItem(path: string, item) {
        const modelReference = firebase.database().ref(path);

        return modelReference.push(item).key;

    }

    bruteUpdateItem(path, itemToReplace) {
        const modelReference = firebase.database().ref(path);
        return modelReference.set(itemToReplace);
    }

    createManyItem(path: string, item: Array<any>) {
        item.forEach(value => {
            this.createItem(path, value);
        });
    }

    readItemByKey(path, key?): Promise<any> {
        const modelReference = firebase.database().ref(path + (key ? '/' + key : ''));
        return modelReference.once("value");
    }

}