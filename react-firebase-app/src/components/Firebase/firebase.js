import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
    //YOUR CONFIG
};

class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);
        this.auth = app.auth();
        this.db = app.database();
    }

    // *** Auth API ***
    createUser = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    signIn = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    signOut = () => this.auth.signOut();

    resetPassword = email => this.auth.sendPasswordResetEmail(email);

    updatePassword = password =>
        this.auth.currentUser.updatePassword(password);

    // *** User API ***
    user = uid => this.db.ref(`users/${uid}`);

    users = () => this.db.ref('users');
}

export default Firebase;