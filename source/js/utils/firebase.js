// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyB_TBw6muVSw-NV8oZR2ctmXbqKhPrDOaQ',
  authDomain: 'family-finances-b9fab.firebaseapp.com',
  projectId: 'family-finances-b9fab',
  storageBucket: 'family-finances-b9fab.appspot.com',
  messagingSenderId: '714307133254',
  appId: '1:714307133254:web:9706a7d90f6b2969108f47',
  measurementId: 'G-FQ9KZ9J6QY',
};

// Initialize Firebase
const initFirebase = () => {
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
};

export {initFirebase};

