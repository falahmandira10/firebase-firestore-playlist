import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD8uLPmbCIUozmYSsFAnqDgt9c2QVyNHdw",
    authDomain: "netninja-firestore-29aee.firebaseapp.com",
    projectId: "netninja-firestore-29aee",
    storageBucket: "netninja-firestore-29aee.appspot.com",
    messagingSenderId: "414510755635",
    appId: "1:414510755635:web:203133ccdbc4408df29846"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const cafeList = document.querySelector('#cafe-list');
function renderCafe(doc) {
    let li = document.createElement('li');
    let name = document.createElement('span');
    let city = document.createElement('span');

    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    city.textContent = doc.data().city;

    li.appendChild(name);
    li.appendChild(city);

    cafeList.appendChild(li);
}

const querySnapshot = await getDocs(collection(db, "cafes"));
querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data().name}`);
    console.log(doc.data());
    renderCafe(doc);
});


// db.collection('cafes').get().then((snapshot) => {
//     snapshot.docs.forEach(doc => {
//         console.log(`${doc.data()}`);
//     })
// })

