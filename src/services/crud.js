import firebase from '../Firebase'


class FirebaseService {
    constructor(){
        this.ref = firebase

    }
    getRef(){
        return this.ref;
    }
}

export default new FirebaseService();
