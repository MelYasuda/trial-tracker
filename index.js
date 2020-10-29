import { registerRootComponent } from 'expo';
import * as firebase from 'firebase';
import App from './App';

var firebaseConfig = {
  apiKey: "AIzaSyBHwLwmTmA1G_WbRRC0RBlDVpjhxb9UkVI",
  authDomain: "trial-tracker-478ef.firebaseapp.com",
  databaseURL: "https://trial-tracker-478ef.firebaseio.com",
  projectId: "trial-tracker-478ef",
  storageBucket: "trial-tracker-478ef.appspot.com",
  messagingSenderId: "1000383050416",
  appId: "1:1000383050416:web:691fef41c93b4e0310c175",
  measurementId: "G-2DKEP6C2NE"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(App);