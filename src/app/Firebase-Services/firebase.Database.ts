import * as firebase from 'firebase/app';
import 'firebase/database';



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

    readItemByKey(path, key?): Promise<any> {
        const modelReference = firebase.database().ref(path + (key ? '/' + key : ''));
        return modelReference.once("value");
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