import * as firebase from 'firebase';

export function addfirebase(){
  if (!firebase.apps.length){
    firebase.initializeApp( {
        apiKey: "AIzaSyA672p-Ii3Vvg9fiQAnMbwfJ6bDlSU3j6s",
        authDomain: "manager-3ef2a.firebaseapp.com",
        databaseURL: "https://manager-3ef2a.firebaseio.com",
        projectId: "manager-3ef2a",
        storageBucket: "manager-3ef2a.appspot.com",
        messagingSenderId: "270401339119",
        appId: "1:270401339119:web:5944de6a47f6dd7794251a",
        measurementId: "G-CENLNY23P5"
      });
  } else {
    firebase.app();
  }
}

export function addRegIdtodb(regId,email,uid){
    firebase.database().ref(`Users/Dentists/${uid}`).push({
        regId,
        email,
        uid
      }).catch((error)=>{
        console.log('error',error)
      })
}

