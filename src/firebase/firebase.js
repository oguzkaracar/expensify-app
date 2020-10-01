import * as firebase from "firebase";

const firebaseConfig = {
	apiKey: process.env.FIREBASE_API_KEY,
	authDomain: process.env.FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.FIREBASE_DATABASE_URL,
	projectId: process.env.FIREBASE_PROJECT_ID,
	storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.FIREBASE_APP_ID,
	measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider, database as default };

// Subscribers  event

// child_removed -- ilgili refden bir child data silinince tetiklenecek olan metod..
// database.ref('expenses').on('child_removed',(snapshot)=>{
//     console.log(snapshot.key,snapshot.val()); //
// });

// //child_changed -- ilgili refde bir child datası değişince tetiklenir..
// database.ref('expenses').on('child_changed',(snapshot)=>{
//     console.log(snapshot.key,snapshot.val());
// });

// // child_added -- ilgili ref e child datası eklenirse tetiklenecek olan metod...
// database.ref('expenses').on('child_added',(snapshot)=>{
//     console.log(snapshot.key,snapshot.val());
// })

// databasedeki objeleri kullanabileceğimiz bir formata dönüştürmek için...
// database
// 	.ref("expenses")
// 	.once("value")
// 	.then((snapshot) => {
// 		const expenses = [];
// 		snapshot.forEach((childSnapshot) => {
// 			// console.log(childSnapshot.key,childSnapshot.val());
// 			expenses.push({
// 				id: childSnapshot.key,
// 				...childSnapshot.val(),
// 			});
// 		});
// 		console.log(expenses);
// 		// console.log(snapshot.val());
// 	})
// 	.catch((e) => {
// 		console.log("error,", e);
// 	});

// subscribe expenses snapshot...

// database.ref("expenses").on("value", (snapshot) => {
// 	const expenses = [];
// 	snapshot.forEach((childSnapshot) => {
// 		// console.log(childSnapshot.key,childSnapshot.val());
// 		expenses.push({
// 			id: childSnapshot.key,
// 			...childSnapshot.val(),
// 		});
// 	});
// 	console.log(expenses);
// });

// ** Array dataları ile çalışma....
// push metodu database e veri eklerken, verilerimizi array yapısı şeklinde id vs ile seçmemize ve manipüle etmemize yarayan unique id'ler oluşturur..

// database.ref('expenses').push({
//     description:'Telefon faturası',
//     note:'ilk harcama',
//     amount:109500,
//     createadAt:435345345
// });

// database.ref('expenses').push({
//     description:'Elektrik faturası',
//     note:'',
//     amount:125500,
//     createadAt:435345345
// });

// ** Data Fetching

// on metodu databasedeki değişiklikleri dinler ve ona göre çalışır. 2. parametre olarak callback func. alır ve geriye fonksiyon gönderir. burada da işlemlerimizi tamamlarız...
// const onValueChange = database.ref().on(
// 	"value",
// 	(snapshot) => {
// 		console.log(snapshot.val());
// 	},
// 	(e) => {
// 		console.log("Error with data fetching", e);
// 	}
// );
// setTimeout(() => {
// 	database.ref("age").set(22);
// 	database.ref("location/city").set("Çorum");
// }, 3000);

// setTimeout(() => {
// 	database.ref().off("value",onValueChange); // off() metodu ile database ref. dinleme işlemi unsubscribe edilir. ve data fetching işlemleri sonlanır.
// }, 6000);

// setTimeout(() => {
// 	database.ref("location/city").set("Ankara");
// 	database.ref("age").set(25); // Bu değer değişecek ama databese ref. off yaptığımız için değişiklikten haberimiz olmayacak...
// }, 9000);

// once metodu sadece bir kere çalışır... geriye Promise nesnesi döndürür...

// database.ref().once("value").then((dataSnapShot) => {
// 	const name = dataSnapShot.child("location/city").val();
// 	console.log(name);
// 	console.log(dataSnapShot.val());
// }).catch((err)=>{
//     console.log('Hata oluştu.',err);
// });

//  ** Database write işlemi...
// database
// 	.ref() // reference kısaltması, farklı verileri tutmamıza yarayacak. (user,expenses vs. gibi)
// 	.set({
// 		name: "oğuzhan",
// 		age: 25,
// 		isSingle: true,
// 		location: {
// 			city: "İstanbul",
// 			country: "Turkey",
// 		},
// 		job: "Software Developer",
// 	})
// 	.then(() => {
// 		console.log("data is saved...");
// 	})
// 	.catch((e) => {
// 		console.log("error", e);
// 	});

// database.ref().set("This is my database"); --- tek bir veri olduğu için üstteki objenin üzerine yazmış olduk..

//database.ref("age").set(26); // -- ref metodu ile databasedeki spesifik bir location'ı değiştirmemize, değer atamamıza ya da verileri silmemize yardım eder..

//database.ref("location/city").set("Ankara"); // *- obje içindeki propertylere erişmek için '/' kullanılır..

// database.ref("tools").set({
// 	editor: "VS Code",
// 	pc: "Windows 10 - Asus Laptop",
// 	database: "Firebase",
// });

//**  veri silme
// database.ref('location').remove(); -- reference.remove() metodu ile seçili reference alanı silindi...

// database.ref('tools/pc').remove().then(()=>{
//     console.log('silindi');
// }).catch((e)=>{
//     console.log('zaten silindi...',e);
// });

// Ayrıca set metodunun reference değerini null olarak gönderirsek de database den veri silme işlemi yapabiliriz.

//database.ref('isSingle').set(null); // set metodu ile ref. e null değer atadığımızda veri databaseden silinir...

// ** Updating
// update metodu ile varolan reference değerlerini değiştermenin yanı sıra yeni reference valueları ekleyebilir, varolanları null vererek silebiliriz de.
// update metodunda verileri güncellemek için arguman olarak object içinde yeni değeri vermemiz gerekiyor...
// database.ref().update({
// 	name: "Oğuzhan",
//     age: 25,
//     'location/city':'Ankara'
//     // burada child object reference'ine erişmek için böyle bir syntax kullandık. city değerini değiştirecek, country ye bakmayacak bile..
// });

// database.ref("tools").update({ pc: "Asus Laptop i5" });
