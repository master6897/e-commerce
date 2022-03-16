import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "super secret keys.....asgvegxgevergfvr",
    authDomain: 'e-commerce-35f70.firebaseapp.com',
    databaseURL: 'https://e-commerce-35f70-default-rtdb.europe-west1.firebasedatabase.app/',
    projectId: 'e-commerce-35f70',
    storageBucket: 'e-commerce-35f70.appspot.com',
    messagingSenderId: "super secret keys.....asgvegxgevergfvr",
    appId: "super secret app id....adsfa;lsdkjf",
    measurementId: "super secret as;dlkfjal;dskjf"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export {
    storage, firebase as default
}