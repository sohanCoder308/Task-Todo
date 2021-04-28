// Importing firebase dependecy and firestore dependency
import firebase from 'firebase';
require('@firebase/firestore');

/* For Firebase JS SDK v7.20.0 and later, measurementId is optional
// DB Details saved in variable 'firebaseConfig' */
var firebaseConfig = {
  apiKey: 'AIzaSyCAt6x2azWXEdUzh_AvExRslg1HbX646hc',
  authDomain: 'todo-app-3b6e1.firebaseapp.com',
  databaseURL: 'https://todo-app-3b6e1-default-rtdb.firebaseio.com',
  projectId: 'todo-app-3b6e1',
  storageBucket: 'todo-app-3b6e1.appspot.com',
  messagingSenderId: '425156990945',
  appId: '1:425156990945:web:d684bd87600f7e2c45e4a0',
  measurementId: 'G-Y8TBDBVNZN',
};

// Initializing Firebase with DB Details
firebase.initializeApp(firebaseConfig);

// Exporting DB to be used in another files
export default firebase.firestore();