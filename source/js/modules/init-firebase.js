import {initializeApp} from 'firebase/app';
import {getDatabase} from 'firebase/database';

let database;

const firebaseConfig = {
  apiKey: 'AIzaSyB_TBw6muVSw-NV8oZR2ctmXbqKhPrDOaQ',
  authDomain: 'family-finances-b9fab.firebaseapp.com',
  projectId: 'family-finances-b9fab',
  storageBucket: 'family-finances-b9fab.appspot.com',
  messagingSenderId: '714307133254',
  appId: '1:714307133254:web:9706a7d90f6b2969108f47',
  measurementId: 'G-FQ9KZ9J6QY',
  databaseURL: 'family-finances-b9fab-default-rtdb.europe-west1.firebasedatabase.app',
};

const initFirebase = () => {
  const app = initializeApp(firebaseConfig);
  database = getDatabase(app);

};

export {initFirebase, database};

