import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as firebase from 'firebase';
import Gapi from './Gapi';

const initApp = async () => {
    await Gapi.initialize();

    // Initialize Firebase
    const config = {
        apiKey: "AIzaSyAR404r2GLCFRZMotNTkP9RyIENhjDKYEI",
        authDomain: "magicmirror-48ff3.firebaseapp.com",
        databaseURL: "https://magicmirror-48ff3.firebaseio.com",
        projectId: "magicmirror-48ff3",
        storageBucket: "magicmirror-48ff3.appspot.com",
        messagingSenderId: "817595799697"
    };
    firebase.initializeApp(config);

    ReactDOM.render(<App/>, document.getElementById('root'));
    registerServiceWorker();
}

initApp();
