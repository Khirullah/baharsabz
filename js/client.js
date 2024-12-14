import { onAuthStateChanged, getAuth} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, set, child, get, onValue, push, update, query, orderByChild, onChildAdded, limitToFirst, limitToLast, 
startAt, startAfter, endAt, endBefore, equalTo} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import {firebaseConfig} from './config.js';
//const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseApps = initializeApp(firebaseConfig);
const auth = firebase.auth();
const firestore = firebase.firestore();
        const recived = document.querySelector('.recived');
        const owner_recived = document.querySelector('.owner_recived');
        const spend = document.querySelector('.spend');
        const anchors = document.querySelectorAll('a');
        recived.style.display = 'block';
        owner_recived.style.display = 'none';
        spend.style.display = 'none';
        anchors.forEach(anchor => {
            anchor.addEventListener('click', () => {
                const id = anchor.id;
                switch (id) {
                    case 'recived':
                        recived.style.display = 'block';
                        owner_recived.style.display = 'none';
                        spend.style.display = 'none';
                        //document.getElementById('back').style.visibility = 'visible';

                        break;
                    case 'owner_recived':
                        recived.style.display = 'none';
                        owner_recived.style.display = 'block';
                        spend.style.display = 'none';
                        //document.getElementById('back').style.visibility = 'visible';
                        break;

                    case 'spend':
                        recived.style.display = 'none';
                        owner_recived.style.display = 'none';
                        spend.style.display = 'block';
                        //document.getElementById('back').style.visibility = 'visible';
                        break;
                }
            });
        });
		onAuthStateChanged(auth, (user) => {
  if (user) {
	  
	  
  }else{
	   location.replace("./index.html");
  }
		})