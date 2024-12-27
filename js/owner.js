import { onAuthStateChanged, getAuth} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, set, child, get, onValue, push, update, query, orderByChild, onChildAdded, limitToFirst, limitToLast, 
startAt, startAfter, endAt, endBefore, equalTo} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import {firebaseConfig} from './config.js';
//const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseApps = initializeApp(firebaseConfig);
const auth = firebase.auth();
const firestore = firebase.firestore();

onAuthStateChanged(auth, (user) => {
  if (user) {
	let a = "خیر";
	const uid = user.uid;
    //console.log(uid);
	const db = getDatabase();
	const auths = getAuth();
	function randomString(length, chars) {
    var mask = '';
    if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
    if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (chars.indexOf('#') > -1) mask += '0123456789';
    var result = '';
    for (var i = length; i > 0; --i) result += mask[Math.floor(Math.random() * mask.length)];
    return result;
}
const ranuid = randomString(32, '#aA');
	
		
//const topUserPostsRef = query(ref(db, uid), orderByChild('name'));
//console.log(topUserPostsRef)
const osearch = document.getElementById('osearch');
osearch.addEventListener('click', () => {
	var osearchmonth = document.getElementById('osearchmonth').value;
	var osearchyear = document.getElementById('osearchyear').value;
	update(ref(db, uid + "/" + "owner"),{
			osearchm: osearchmonth,
			osearchy: osearchyear,
	},);
	
const dbRef = ref(db, uid + '/owner');

onValue(dbRef, (snapshot) => {
  snapshot.forEach((childSnapshot) => {
    const childKey = childSnapshot.key;
    const childData = childSnapshot.val('money');
    // ...
	//console.log(childKey);
	//console.log(childData);


	//document.getElementById('name').innerHTML =  childData;
	
	

  });
});



function GetAllDataOnce(){
	const que = query(ref(db, uid + '/owner' + osearchyear), orderByChild(osearchmonth));
	
	get(que).then((snapshot)=>{
		var data = [];
		
		snapshot.forEach(childSnapshot =>{
			data.push(childSnapshot.val());
		});
		console.log(data)
	
	})
}
let ownerlist = [];
let sno = 0;
let tbody = document.getElementById('tbody2');
const selectAllDataOnce = () =>{
	const dbRefs = ref(db);
	get(child(dbRefs, uid + '/owner')).then((snapshot)=>{
		ownerlist = [];
		snapshot.forEach(owner =>{
			ownerlist.push(owner.val());
			
		});
		AddAllRecords();
	
	})

}
String.prototype.toEnglishDigits = function () {
    var persian = { '۰': '0', '۱': '1', '۲': '2', '۳': '3', '۴': '4', '۵': '5', '۶': '6', '۷': '7', '۸': '8', '۹': '9' };
    var arabic = { '٠': '0', '١': '1', '٢': '2', '٣': '3', '٤': '4', '٥': '5', '٦': '6', '٧': '7', '٨': '8', '٩': '9' };
    return this.replace(/[^0-9.]/g, function (w) {
        return persian[w] || arabic[w] || w;
    });
};
String.prototype.toPersianDigits = function () {
    //var persian = { '۰': '0', '۱': '1', '۲': '2', '۳': '3', '۴': '4', '۵': '5', '۶': '6', '۷': '7', '۸': '8', '۹': '9' };
    var persian = {'0': '۰', '1': '۱', '2': '۲', '3': '۳','4': '۴', '5': '۵', '6': '۶', '7': '۷', '8': '۸', '9': '۹' };
    //var arabic = { '٠': '0', '١': '1', '٢': '2', '٣': '3', '٤': '4', '٥': '5', '٦': '6', '٧': '7', '٨': '8', '٩': '9' };
    return this.replace(/[^۰-۹.]/g, function (w) {
        return persian[w] || w;
    });
};

const selectAllDataRealtime = () =>{
	const dbRefs = ref(db, uid + '/owner' + '/' + osearchyear + '/' + osearchmonth);
	onValue(dbRefs, (snapshot) => {
		ownerlist = [];
		snapshot.forEach(owner =>{
			ownerlist.push(owner.val());
			//let toint = shop.child("is").val();
			//let total = parseInt(toint);
			//console.log(total)
		});
	

		
		AddAllRecords();
		var table = document.getElementById("tbody2"), sumVal = 0;
            
            for(var i = 0; i < table.rows.length; i++)
            {
                //sumVal = sumVal + parseInt(table.rows[i].cells[2].innerHTML);
				var aa = table.rows[i].cells[1].innerHTML.toEnglishDigits();
				var aaa = parseInt(aa);
                sumVal = sumVal + aaa;
            }
            var a = sumVal.toString();
            //document.getElementById("val").innerHTML = "Sum Value = " + sumVal;
			let ototal = document.getElementById('ototal');
			ototal.innerHTML = 'مبلغ ' + a.toPersianDigits().bold() + ' در ماه ' + osearchmonth.toPersianDigits() + ' ' + 'سال ' + osearchyear.toPersianDigits() + " رسیده است ";
            //console.log(sumVal);
	
	})

}
const AddSingleRecords = (dateday, datemonth, dateyear, money, is) => {
	let trow = document.createElement('tr');
	let td1 = document.createElement('td');
	let td2 = document.createElement('td');
	let td3 = document.createElement('td');
	let td4 = document.createElement('td');
	
	
	
	td1.innerHTML = ++sno;
	td2.innerHTML = dateday.toPersianDigits() + '/' + datemonth.toPersianDigits() + '/' + dateyear.toPersianDigits();
	td3.innerHTML = money.toPersianDigits();
	td4.innerHTML = is;


	trow.append(td2,td3,td4);
	
	tbody.append(trow);
	

}
const AddAllRecords = () =>{
	sno=0;
	tbody.innerHTML = ""; 
	ownerlist.forEach(owner =>{
		AddSingleRecords(owner.dateday, owner.datemonth, owner.dateyear, owner.money, owner.is);
 

//const jn = JSON.parse(text);('id: '+ text);
  //console.log(text)
  
  //console.log(jn)

	})
			return onValue(ref(db, uid + '/owner' + '/' + osearchyear + '/' + osearchmonth), (snapshot) => {
		
		const money = (snapshot.val() && snapshot.val().money);
		//console.log(money)
		})
		




}
let oex = document.getElementById('oex');
let oactionLabel = document.getElementById('oactionLabel');
let osday = document.getElementById('owner_day');
let osmonth = document.getElementById('owner_month');
let osyear = document.getElementById('owner_year');
let omodmoney = document.getElementById('omodmoney');
let omodids = document.getElementById('omodids');
let oditBtn = document.getElementById('oditBtn');
let addBtn = document.getElementById('oadd-0');
//let moodmo = modmoney.value.toPersianDigits()

const LoadModal = (event) => {

    var targetId = (event.target.id.length > 1 ) ? event.target.id : event.target.parentElement.id;

    let string = targetId.split('-');
    let mode = string[0];
    let selectedIndex = string[1] - 1;


	   if(mode==='oadd'){
	   oditBtn.className = 'btn btn-lg btn-success';
	   oactionLabel.innerText = 'پول رسیده شده به مالک جایدات';
	   oditBtn.innerText = 'Add';
	   oditBtn.addEventListener('click', AddData);

	   //modids.value = ranuid;
	   osday.value = '';
	   osmonth.value = '';
	   osyear.value = '';
	   omodmoney.value = '';
	   omodmoney.placeholder = 'مقدار پول';
   


		omodids.style.display = "none";
        //modis.disabled = false;
        omodids.disabled = true;
        osday.disabled = false;
        osmonth.disabled = false;
        osyear.disabled = false;
        omodmoney.disabled = false;
   }
   }

   const AddData = () => {
	//actionBtn.disabled = true;
	set(ref(db, uid + '/owner/' + osyear.value + '/' + osmonth.value + '/' + ranuid), {
		money: omodmoney.value,
		dateday: osday.value,
		datemonth:  osmonth.value,
		dateyear: osyear.value,
		is: a,
		ids: ranuid,

	}).then(() => {
		oex.click(); 
	window.location.reload();
})
}
window.addEventListener('load', selectAllDataRealtime());
addBtn.addEventListener('click', LoadModal);
  });
    const osear = () =>{
	const dbRefs = ref(db, uid);
	onValue(dbRefs, (snapshot) => {
		snapshot.forEach(owner =>{
			let omon = owner.child("osearchm").val();
			let oyea = owner.child("osearchy").val();
			switch(omon){
				case '01':{
					document.getElementById("osearchmonth").selectedIndex = 0;
					document.getElementById('osearch').click();
					break;
				}
				case '02':{
					document.getElementById("osearchmonth").selectedIndex = 1;
					document.getElementById('osearch').click();
					break;
				}
				case '03':{
					document.getElementById("osearchmonth").selectedIndex = 2;
					document.getElementById('osearch').click();
					break;
				}
				case '04':{
					document.getElementById("osearchmonth").selectedIndex = 3;
					document.getElementById('osearch').click();
					break;
				}
				case '05':{
					document.getElementById("osearchmonth").selectedIndex = 4;
					document.getElementById('osearch').click();
					break;
				}
				case '06':{
					document.getElementById("osearchmonth").selectedIndex = 5;
					document.getElementById('osearch').click();
					break;
				}
				case '07':{
					document.getElementById("osearchmonth").selectedIndex = 6;
					document.getElementById('osearch').click();
					break;
				}
				case '08':{
					document.getElementById("osearchmonth").selectedIndex = 7;
					document.getElementById('osearch').click();
					break;
				}
				case '09':{
					document.getElementById("osearchmonth").selectedIndex = 8;
					document.getElementById('osearch').click();
					break;
				}
				case '10':{
					document.getElementById("osearchmonth").selectedIndex = 9;
					document.getElementById('osearch').click();
					break;
				}
				case '11':{
					document.getElementById("osearchmonth").selectedIndex = 10;
					document.getElementById('osearch').click();
					break;
				}
				case '12':{
					document.getElementById("osearchmonth").selectedIndex = 11;
					document.getElementById('osearch').click();
					break;
				}
				
			}
			switch(oyea){
				case '1403':{
					document.getElementById("osearchyear").selectedIndex = 0;
					document.getElementById('osearch').click();
					break;
				}
				case '1404':{
					document.getElementById("osearchyear").selectedIndex = 1;
					document.getElementById('osearch').click();
					break;
				}
				case '1405':{
					document.getElementById("osearchyear").selectedIndex = 2;
					document.getElementById('osearch').click();
					break;
				}
				case '1406':{
					document.getElementById("osearchyear").selectedIndex = 3;
					document.getElementById('osearch').click();
					break;
				}
				case '1407':{
					document.getElementById("osearchyear").selectedIndex = 4;
					document.getElementById('osearch').click();
					break;
				}
				case '1408':{
					document.getElementById("osearchyear").selectedIndex = 5;
					document.getElementById('osearch').click();
					break;
				}
				case '1409':{
					document.getElementById("osearchyear").selectedIndex = 6;
					document.getElementById('osearch').click();
					break;
				}
				case '1410':{
					document.getElementById("osearchyear").selectedIndex = 7;
					document.getElementById('osearch').click();
					break;
				}
			}
		});
	})
}
  window.addEventListener('load', osear());
  }
  
})
