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

const dbRef = ref(db, uid + '/spend');

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
const ssearch = document.getElementById('ssearch');
ssearch.addEventListener('click', () => {
	var ssearchmonth = document.getElementById('ssearchmonth').value;
	var ssearchyear = document.getElementById('ssearchyear').value;
		update(ref(db, uid + "/" + "spend"),{
			ssearchm: ssearchmonth,
			ssearchy: ssearchyear,
	},);

function GetAllDataOnce(){
	const que = query(ref(db, uid + '/spend' + '/' + ssearchyear ), orderByChild(ssearchmonth));
	
	get(que).then((snapshot)=>{
		var data = [];
		
		snapshot.forEach(childSnapshot =>{
			data.push(childSnapshot.val());
		});
		console.log(data)
	
	})
}
let spendlist = [];
let sno = 0;
let tbody = document.getElementById('tbody3');
const selectAllDataOnce = () =>{
	const dbRefs = ref(db);
	get(child(dbRefs, uid + '/spend')).then((snapshot)=>{
		spendlist = [];
		snapshot.forEach(spend =>{
			spendlist.push(spend.val());
			
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
	const dbRefs = ref(db, uid + '/spend' + '/' + ssearchyear + '/' + ssearchmonth);
	onValue(dbRefs, (snapshot) => {
		spendlist = [];
		snapshot.forEach(spend =>{
			spendlist.push(spend.val());
			//let toint = shop.child("is").val();
			//let total = parseInt(toint);
			//console.log(total)
		});
	

		
		AddAllRecords();
		var table = document.getElementById("tbody3"), sumVal = 0;
            
            for(var i = 0; i < table.rows.length; i++)
            {
                //sumVal = sumVal + parseInt(table.rows[i].cells[2].innerHTML);
				var aa = table.rows[i].cells[2].innerHTML.toEnglishDigits();
				var aaa = parseInt(aa);
                sumVal = sumVal + aaa;
            }
            var a = sumVal.toString();
            //document.getElementById("val").innerHTML = "Sum Value = " + sumVal;
			let stotal = document.getElementById('stotal');
			stotal.innerHTML = 'به مقدار' + a.toPersianDigits().bold() + 'ماه  ' + ssearchmonth.toPersianDigits() + ' ' + 'سال ' + ssearchyear.toPersianDigits();
            //console.log(sumVal);
	
	})

}
const AddSingleRecords = (info, dateday, datemonth, dateyear, money, is) => {
	let trow = document.createElement('tr');
	let td1 = document.createElement('td');
	let td2 = document.createElement('td');
	let td3 = document.createElement('td');
	let td4 = document.createElement('td');
	let td5 = document.createElement('td');
	
	
	
	td1.innerHTML = ++sno;
	td2.innerHTML = info;
	td3.innerHTML = dateday.toPersianDigits() + '/' + datemonth.toPersianDigits() + '/' + dateyear.toPersianDigits();
	td4.innerHTML = money.toPersianDigits();
	td5.innerHTML = is;
	
	trow.append(td2,td3,td4,td5);
	
	tbody.append(trow);
	

}
const AddAllRecords = () =>{
	sno=0;
	tbody.innerHTML = ""; 
	spendlist.forEach(spend =>{
		AddSingleRecords(spend.info, spend.dateday, spend.datemonth, spend.dateyear, spend.money, spend.is);

 //document.getElementById("see").innerText += text + '\n';
 

//const jn = JSON.parse(text);('id: '+ text);
  //console.log(text)
  
  //console.log(jn)

	})
		




}


let ex = document.getElementById('sex');
let actionLabel = document.getElementById('sactionLabel');
let sday = document.getElementById('spend_day');
let smonth = document.getElementById('spend_month');
let syear = document.getElementById('spend_year');
let modmoney = document.getElementById('smodmoney');
let modids = document.getElementById('smodids');
let info = document.getElementById('info');
let ditBtn = document.getElementById('sditBtn');
let addBtn = document.getElementById('sadd-0');
//let moodmo = modmoney.value.toPersianDigits()

const LoadModal = (event) => {

    var targetId = (event.target.id.length > 1 ) ? event.target.id : event.target.parentElement.id;

    let string = targetId.split('-');
    let mode = string[0];
    let selectedIndex = string[1] - 1;


	   if(mode==='sadd'){
	   ditBtn.className = 'btn btn-lg btn-success';
	   actionLabel.innerText = 'پول مصرف شده';
	   ditBtn.innerText = 'Add';
	   ditBtn.addEventListener('click', AddData);

	   //modids.value = ranuid;
	   sday.value = '';
	   smonth.value = '';
	   syear.value = '';
	   modmoney.value = '';
	   info.value = '';
	   modmoney.placeholder = 'مقدار پول';
   


		modids.style.display = "none";
        //modis.disabled = false;
        modids.disabled = true;
        sday.disabled = false;
        smonth.disabled = false;
        syear.disabled = false;
        modmoney.disabled = false;
        info.disabled = false;
   }
   }

   const AddData = () => {
	//actionBtn.disabled = true;
	set(ref(db, uid + '/spend/' + syear.value + '/' + smonth.value + '/' + ranuid), {
		info: info.value,
		money: modmoney.value,
		dateday: sday.value,
		datemonth:  smonth.value,
		dateyear: syear.value,
		is: a,
		ids: ranuid,

	}).then(() => {
		ex.click(); 
	window.location.reload();
})
}


window.addEventListener('load', selectAllDataRealtime());
addBtn.addEventListener('click', LoadModal);
//const topUserPostsRef = query(ref(db, uid + '/recived/2i2uzTCuNdznHqOroj6V7jreVeO8Y367'), orderByChild('money'));
//console.log(topUserPostsRef)

})



    const sear = () =>{
	const dbRefs = ref(db, uid);
	onValue(dbRefs, (snapshot) => {
		snapshot.forEach(spend =>{
			let smon = spend.child("ssearchm").val();
			let syea = spend.child("ssearchy").val();
			switch(smon){
				case '01':{
					document.getElementById("ssearchmonth").selectedIndex = 0;
					document.getElementById('ssearch').click();
					break;
				}
				case '02':{
					document.getElementById("ssearchmonth").selectedIndex = 1;
					document.getElementById('ssearch').click();
					break;
				}
				case '03':{
					document.getElementById("ssearchmonth").selectedIndex = 2;
					document.getElementById('ssearch').click();
					break;
				}
				case '04':{
					document.getElementById("ssearchmonth").selectedIndex = 3;
					document.getElementById('ssearch').click();
					break;
				}
				case '05':{
					document.getElementById("ssearchmonth").selectedIndex = 4;
					document.getElementById('ssearch').click();
					break;
				}
				case '06':{
					document.getElementById("ssearchmonth").selectedIndex = 5;
					document.getElementById('ssearch').click();
					break;
				}
				case '07':{
					document.getElementById("ssearchmonth").selectedIndex = 6;
					document.getElementById('ssearch').click();
					break;
				}
				case '08':{
					document.getElementById("ssearchmonth").selectedIndex = 7;
					document.getElementById('ssearch').click();
					break;
				}
				case '09':{
					document.getElementById("ssearchmonth").selectedIndex = 8;
					document.getElementById('ssearch').click();
					break;
				}
				case '10':{
					document.getElementById("ssearchmonth").selectedIndex = 9;
					document.getElementById('ssearch').click();
					break;
				}
				case '11':{
					document.getElementById("ssearchmonth").selectedIndex = 10;
					document.getElementById('ssearch').click();
					break;
				}
				case '12':{
					document.getElementById("ssearchmonth").selectedIndex = 11;
					document.getElementById('ssearch').click();
					break;
				}
				
			}
			switch(syea){
				case '1403':{
					document.getElementById("ssearchyear").selectedIndex = 0;
					document.getElementById('ssearch').click();
					break;
				}
				case '1404':{
					document.getElementById("ssearchyear").selectedIndex = 1;
					document.getElementById('ssearch').click();
					break;
				}
				case '1405':{
					document.getElementById("ssearchyear").selectedIndex = 2;
					document.getElementById('ssearch').click();
					break;
				}
				case '1406':{
					document.getElementById("ssearchyear").selectedIndex = 3;
					document.getElementById('ssearch').click();
					break;
				}
				case '1407':{
					document.getElementById("ssearchyear").selectedIndex = 4;
					document.getElementById('ssearch').click();
					break;
				}
				case '1408':{
					document.getElementById("ssearchyear").selectedIndex = 5;
					document.getElementById('ssearch').click();
					break;
				}
				case '1409':{
					document.getElementById("ssearchyear").selectedIndex = 6;
					document.getElementById('ssearch').click();
					break;
				}
				case '1410':{
					document.getElementById("ssearchyear").selectedIndex = 7;
					document.getElementById('ssearch').click();
					break;
				}
			}
		});
	})
}
  window.addEventListener('load', sear());
  }

  })
