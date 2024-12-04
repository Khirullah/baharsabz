import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";

  const firebaseConfig = {
  apiKey: "AIzaSyDRZWKsDOjfpksMngKvflSI4zG6KrC46XI",
  authDomain: "rent-96032.firebaseapp.com",
  databaseURL: "https://rent-96032-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "rent-96032",
  appId: "1:142602401003:web:b1130f353065e3af077aae",
};  

   const phoneInputField = document.querySelector("#lname");
		const phoneInput = window.intlTelInput(phoneInputField, {
			utilsScript: "js/utils.js",
      // Initialize Firebase
	     });
    const app = initializeApp(firebaseConfig);

    import { getDatabase, ref, set, child, get } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

    document
      .getElementById('loginform')
      .addEventListener('submit', formSubmit1);

    //Submit form(2)
    function formSubmit1(e) {
      e.preventDefault();
      // Get Values from the DOM
      //let lname = document.querySelector('#lname').value;
	  let lname = phoneInput.getNumber();
      let lpassword = document.querySelector('#lpassword').value;

      //send message values(3)
      sendMessage1(lname, lpassword);

    }
function sendMessage1(lname, lpassword) {
    const dbRef = ref(getDatabase());
    get(child(dbRef, 'users/'+ lname + '/password')).then((snapshot) => {
        if (snapshot.exists()) {
            const ex = snapshot.val();
            if(lpassword == ex) {
                console.log("available");
				window.location.replace("./client.html");
            } else {
                 document.getElementById('output').innerHTML = "Wrong Password";
            }
            } else {
                console.log("No data available");
                }
                }).catch((error) => {
                    console.error(error);
                    });
                    }