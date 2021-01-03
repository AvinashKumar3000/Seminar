import firebase from '../Firebase'


class FirebaseService {
    constructor(){
        this.ref = firebase.collection("Management")

    }
    getAll(){
        return this.ref;
    }
}

export default new FirebaseService();
