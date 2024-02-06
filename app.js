import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, doc, deleteDoc } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js'

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
const form = document.querySelector('#add-cafe-form');

function renderCafe(docc) {
    let li = document.createElement('li');
    let name = document.createElement('span');
    let city = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id', docc.id);
    name.textContent = docc.data().name;
    city.textContent = docc.data().city;
    cross.textContent = 'x';

    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(cross);

    cafeList.appendChild(li);

    // deleting data
    cross.addEventListener('click', async (e) => {
        // e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        await deleteDoc(doc(db, "cafes", id));
        // db.collection("cities").doc(id).delete();

    })
}
const conn = collection(db, "cafes");
const querySnapshot = await getDocs(conn);

// get data from firestore
querySnapshot.forEach((docc) => {
    console.log(`${docc.id} => ${docc.data().name}`);
    console.log(docc.data());
    renderCafe(docc);
});


// save data to firestore
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const docRef = await addDoc(conn, {
        name: form.name.value,
        city: form.city.value
    });
    form.name.value = "";
    form.city.value = "";
})
