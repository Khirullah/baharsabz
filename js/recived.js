import { onAuthStateChanged, getAuth} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, set, child, get, onValue, push, update, query, orderByChild, onChildAdded, limitToFirst, limitToLast, 
startAt, startAfter, endAt, endBefore, equalTo, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import {firebaseConfig} from './config.js';
const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseApps = initializeApp(firebaseConfig);
const auth = firebase.auth();
const firestore = firebase.firestore();

onAuthStateChanged(auth, (user) => {
  if (user) {
	const uid = user.uid;
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


const search = document.getElementById('search');
search.addEventListener('click', () => {
	var searchmonth = document.getElementById('searchmonth').value;
	var searchyear = document.getElementById('searchyear').value;
		update(ref(db, uid + "/" + "recived"),{
			searchm: searchmonth,
			searchy: searchyear,
	},);


const dbRef = ref(db, uid + '/recived');


onValue(dbRef, (snapshot) => {
  snapshot.forEach((childSnapshot) => {
    const childKey = childSnapshot.key;
    const childData = childSnapshot.val();

	//console.log(childData);
	//console.log(childSnapshot.searchmonth.val())


	//document.getElementById('name').innerHTML =  childData;
	
	

  });
});
	
function GetAllDataOnce(){
	const que = query(ref(db, uid + '/recived' + '/' + searchyear), orderByChild(searchmonth));
	
	get(que).then((snapshot)=>{
		var data = [];
		
		snapshot.forEach(childSnapshot =>{
			data.push(childSnapshot.val());
		});
		
	
	})
}
let shoplist = [];
let sno = 0;
let tbody = document.getElementById('tbody1');
const selectAllDataOnce = () =>{
	const dbRefs = ref(db);
	get(child(dbRefs, uid + '/recived')).then((snapshot)=>{
		shoplist = [];
		snapshot.forEach(shop =>{
			shoplist.push(shop.val());
			
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
	const dbRefs = ref(db, uid + '/recived' + '/' + searchyear + '/' + searchmonth);
	onValue(dbRefs, (snapshot) => {
		shoplist = [];
		snapshot.forEach(shop =>{
			shoplist.push(shop.val());
			//let toint = shop.child("is").val();
			//let total = parseInt(toint);
			//console.log(total)
		});
	

		
		AddAllRecords();
		var table = document.getElementById("tbody1"), sumVal = 0;
            
            for(var i = 0; i < table.rows.length; i++)
            {
                //sumVal = sumVal + parseInt(table.rows[i].cells[3].innerHTML);
				var aa = table.rows[i].cells[2].innerHTML.toEnglishDigits();
				var aaa = parseInt(aa);
                sumVal = sumVal + aaa;
				
            }
            var a = sumVal.toString();
            //document.getElementById("val").innerHTML = "Sum Value = " + sumVal;
			let total = document.getElementById('total');
			total.innerHTML = 'به مبلغ ' + a.toPersianDigits().bold() + ' ماه  ' + searchmonth.toPersianDigits() + ' ' + 'سال ' + searchyear.toPersianDigits();
            //console.log(sumVal);
	
	})

}
const AddSingleRecords = (name, dateday, datemonth, dateyear, money) => {
	let trow = document.createElement('tr');
	let td1 = document.createElement('td');
	let td2 = document.createElement('td');
	let td3 = document.createElement('td');
	let td4 = document.createElement('td');
	
	let td6 = document.createElement('td');
	
	
	
	td1.innerHTML = ++sno;
	td2.innerHTML = name;
	td3.innerHTML = dateday.toPersianDigits() + '/' + datemonth.toPersianDigits() + '/' + dateyear.toPersianDigits();
	td4.innerHTML = money.toPersianDigits();

	let EditBtn = document.createElement('button')

	EditBtn.id = 'edit-' + sno;

	EditBtn.className = 'btn btn-primary me-2';
	EditBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
	EditBtn.setAttribute("data-bs-toggle", 'modal');
	EditBtn.setAttribute("data-bs-target", '#actionModal');
    EditBtn.addEventListener('click', LoadModal);

	td6.append(EditBtn);

	trow.append(td2,td3,td4,td6);
	
	tbody.append(trow);
	

}
const AddAllRecords = () =>{
	sno=0;
	tbody.innerHTML = ""; 
	shoplist.forEach(shop =>{
		AddSingleRecords(shop.name, shop.dateday, shop.datemonth, shop.dateyear, shop.money);

  })


	
			return onValue(ref(db, uid + '/recived' + '/' + searchyear + '/' + searchmonth), (snapshot) => {
		
		const money = (snapshot.val() && snapshot.val().money);
		//console.log(money)
		})
		
		




}
let ex = document.getElementById('ex');
let actionLabel = document.getElementById('actionLabel');
let modname = document.getElementById('modname');
let sday = document.getElementById('sday');
let smonth = document.getElementById('smonth');
let syear = document.getElementById('syear');
let modmoney = document.getElementById('modmoney');
let modids = document.getElementById('modids');
let ditBtn = document.getElementById('ditBtn');
let addBtn = document.getElementById('add-0');
let moodmo = modmoney.value.toPersianDigits()

const LoadModal = (event) => {

    var targetId = (event.target.id.length > 1 ) ? event.target.id : event.target.parentElement.id;

    let string = targetId.split('-');
    let mode = string[0];
    let selectedIndex = string[1] - 1;


	   if(mode==='add'){
	   ditBtn.className = 'btn btn-lg btn-success';
	   actionLabel.innerText = 'پول گرفته شده از دکاندار';
	   ditBtn.innerText = 'Add';
	   ditBtn.addEventListener('click', AddData);

	   //modids.value = ranuid;
	   modname.value = '';
	   modname.placeholder = 'نام دکاندار';
	   sday.value = '';
	   smonth.value = '';
	   syear.value = '';
	   modmoney.value = '';
	   modmoney.placeholder = 'مقدار پول';
   


		modids.style.display = "none";
        //modis.disabled = false;
        modids.disabled = true;
        modname.disabled = false;
        sday.disabled = false;
        smonth.disabled = false;
        syear.disabled = false;
        modmoney.disabled = false;
   }
   else if(mode==='edit'){
        actionLabel.innerText = 'آیا پول برای مالک جایدات رسیده؟';
		ditBtn.innerText='update';
        ditBtn.addEventListener('click', UpdData);

        modids.value = shoplist[selectedIndex].ids;
        modname.value = shoplist[selectedIndex].name;
        sday.value = shoplist[selectedIndex].dateday;
        smonth.value = shoplist[selectedIndex].datemonth;
        syear.value = shoplist[selectedIndex].dateyear;
        modmoney.value = shoplist[selectedIndex].money.toPersianDigits();
        //modis.value = ownerlist[selectedIndex].is;

        modids.style.display = "none";
        //modis.disabled = false;
        modids.disabled = true;
        modname.disabled = false;
        sday.disabled = false;
        smonth.disabled = false;
        syear.disabled = false;
        modmoney.disabled = false;

    }

}
const AddData = () => {
	//actionBtn.disabled = true;
	set(ref(db, uid + '/recived/' + syear.value + '/' + smonth.value + '/' + ranuid), {
		name: modname.value,
		money: modmoney.value,
		dateday: sday.value,
		datemonth:  smonth.value,
		dateyear: syear.value,
		ids: ranuid,

	}).then(() => {
		ex.click(); 
	window.location.reload();
})
}

const UpdData = () => {
    let data = {};
	
    data[uid +  '/recived/' + syear.value + '/' + smonth.value + '/' + modids.value + '/ids'] = modids.value;
    data[uid +  '/recived/' + syear.value + '/' + smonth.value + '/' + modids.value + '/name'] = modname.value;
    data[uid +  '/recived/' + syear.value + '/' + smonth.value + '/' + modids.value + '/dateday'] = sday.value;
    data[uid +  '/recived/' + syear.value + '/' + smonth.value + '/' + modids.value + '/datemonth'] = smonth.value;
    data[uid +  '/recived/' + syear.value + '/' + smonth.value + '/' + modids.value + '/dateyear'] = syear.value;
    data[uid +  '/recived/' + syear.value + '/' + smonth.value + '/' + modids.value + '/money'] = modmoney.value;
	remove(ref(db, uid + '/recived/' + searchyear + '/' + searchmonth + '/' + modids.value ));

    update(ref(db), data).then(() => {
		ex.click();
		window.location.reload();
		})
	
	

}


window.addEventListener('load', selectAllDataRealtime());
addBtn.addEventListener('click', LoadModal);
  })
  const sear = () =>{
	const dbRefs = ref(db, uid);
	onValue(dbRefs, (snapshot) => {
		snapshot.forEach(shop =>{
			let mon = shop.child("searchm").val();
			let yea = shop.child("searchy").val();
			switch(mon){
				case '01':{
					document.getElementById("searchmonth").selectedIndex = 0;
					document.getElementById('search').click();
					break;
				}
				case '02':{
					document.getElementById("searchmonth").selectedIndex = 1;
					document.getElementById('search').click();
					break;
				}
				case '03':{
					document.getElementById("searchmonth").selectedIndex = 2;
					document.getElementById('search').click();
					break;
				}
				case '04':{
					document.getElementById("searchmonth").selectedIndex = 3;
					document.getElementById('search').click();
					break;
				}
				case '05':{
					document.getElementById("searchmonth").selectedIndex = 4;
					document.getElementById('search').click();
					break;
				}
				case '06':{
					document.getElementById("searchmonth").selectedIndex = 5;
					document.getElementById('search').click();
					break;
				}
				case '07':{
					document.getElementById("searchmonth").selectedIndex = 6;
					document.getElementById('search').click();
					break;
				}
				case '08':{
					document.getElementById("searchmonth").selectedIndex = 7;
					document.getElementById('search').click();
					break;
				}
				case '09':{
					document.getElementById("searchmonth").selectedIndex = 8;
					document.getElementById('search').click();
					break;
				}
				case '10':{
					document.getElementById("searchmonth").selectedIndex = 9;
					document.getElementById('search').click();
					break;
				}
				case '11':{
					document.getElementById("searchmonth").selectedIndex = 10;
					document.getElementById('search').click();
					break;
				}
				case '12':{
					document.getElementById("searchmonth").selectedIndex = 11;
					document.getElementById('search').click();
					break;
				}
				
			}
			switch(yea){
				case '1403':{
					document.getElementById("searchyear").selectedIndex = 0;
					document.getElementById('search').click();
					break;
				}
				case '1404':{
					document.getElementById("searchyear").selectedIndex = 1;
					document.getElementById('search').click();
					break;
				}
				case '1405':{
					document.getElementById("searchyear").selectedIndex = 2;
					document.getElementById('search').click();
					break;
				}
				case '1406':{
					document.getElementById("searchyear").selectedIndex = 3;
					document.getElementById('search').click();
					break;
				}
				case '1407':{
					document.getElementById("searchyear").selectedIndex = 4;
					document.getElementById('search').click();
					break;
				}
				case '1408':{
					document.getElementById("searchyear").selectedIndex = 5;
					document.getElementById('search').click();
					break;
				}
				case '1409':{
					document.getElementById("searchyear").selectedIndex = 6;
					document.getElementById('search').click();
					break;
				}
				case '1410':{
					document.getElementById("searchyear").selectedIndex = 7;
					document.getElementById('search').click();
					break;
				}
			}
			
		});
	})
}
  window.addEventListener('load', sear());
  
 }
 
  })
  
