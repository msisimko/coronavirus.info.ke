import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.firestore();
  }

  // *** App API ***

  getServerTimestamp = () => app.firestore.FieldValue.serverTimestamp();
  
  // *** Auth API ***
 
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);
  
  doSignOut = () => 
    this.auth.signOut();

  doSendPasswordResetEmail = email => 
    this.auth.sendPasswordResetEmail(email);

  doUpdateEmail = email =>
    this.auth.currentUser.updateEmail(email);

  doUpdatePassword = password =>
    this.auth.currentUser.updatePassword(password);
  
  doUpdateProfile = displayName =>
    this.auth.currentUser.updateProfile({ displayName });
  
  doSendEmailVerification = () =>
    this.auth.currentUser.sendEmailVerification({
      url: process.env.REACT_APP_CONFIRM_EMAIL_REDIRECT,
    });
  
  // *** Email Action Handler API ***

  doCheckActionCode = actionCode => 
    this.auth.checkActionCode(actionCode);

  doApplyActionCode = actionCode => 
    this.auth.applyActionCode(actionCode);

  doVerifyPasswordResetCode = actionCode => 
    this.auth.verifyPasswordResetCode(actionCode);

  doConfirmPasswordReset = (actionCode, password) => 
    this.auth.confirmPasswordReset(actionCode, password);

  // *** Firestore API ***
  sources = () => this.db.collection('sources');

  source = id => this.db.collection('sources').doc(id);

  counties = () => this.db.collection('counties');

  county = id => this.db.collection('counties').doc(id);

  drafts = () => this.db.collection('drafts');

  draft = id => this.db.collection('drafts').doc(id);

  posts = () => this.db.collection('posts');

  post = id => this.db.collection('posts').doc(id);
}

export default Firebase;
