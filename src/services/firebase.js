import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/functions";

export const firebaseConfig = {
	apiKey: "AIzaSyD5xAMPHxNMUQxHCtuUXDABpTGk8l_sH5s",
	authDomain: "mailman-b292a.firebaseapp.com",
	databaseURL: "https://mailman-b292a.firebaseio.com",
	projectId: "mailman-b292a",
	storageBucket: "mailman-b292a.appspot.com",
	messagingSenderId: "411912352287",
	appId: "1:411912352287:web:a70a4df3dddd47047d5b2a",
	measurementId: "G-FC5TPH2YQF",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export const Auth = firebase.auth();
export const FieldValue = firebase.firestore.FieldValue;
export const Db = firebase.firestore();
export const Function = firebase.functions();
