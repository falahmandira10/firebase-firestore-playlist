import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, doc, deleteDoc, query, where, orderBy, limit, onSnapshot, updateDoc} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js'

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
        
    });
}


const conn = collection(db, "cafes");

// add data to firestore
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const docRef = await addDoc(conn, {
        name: form.name.value,
        city: form.city.value
    });
    form.name.value = "";
    form.city.value = "";
});

// // update data (unfinished)
// in console web, we can do -> doc.collection('cafes').doc('id').update({
//     property: 'something'
// })
// const arabikaRef = query(conn, where('data-id', '==', '5qI5flLh5EsMn9napZGB'));

// await updateDoc( arabikaRef, {
//     'name': 'arabika coffeeshop'
// });


// real-time listener
const quer = query(conn, orderBy("city"));
const unsubscribe = onSnapshot(quer, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
            // console.log("New city: ", change.doc.data());
            renderCafe(change.doc);
        }
        else if (change.type === "removed") {
            // console.log("Removed city: ", change.doc.data());
            let li = cafeList.querySelector('[data-id=' + change.doc.id + ']');
            cafeList.removeChild(li);
        }
      });
});

// const querySnapshot = await getDocs(conn);

// // get data from firestore
// querySnapshot.forEach((docc) => {
//     console.log(`${docc.id} => ${docc.data().name}`);
//     console.log(docc.data());
//     renderCafe(docc);
// });



// // query 
// const quer = query(conn, where("city", "==", "lampung"));
// const querySnapshot = await getDocs(quer);


// // get data queries from firestore
// querySnapshot.forEach((docc) => {
//     console.log(`${docc.id} => ${docc.data().name}`);
//     console.log(docc.data());
//     renderCafe(docc);
// });


// // order by and limit
// // order by -> ascending for default and capital letter will prioritize
// const quer = query(conn, orderBy("name", "desc"), limit(2));
// const querySnapshot = await getDocs(quer);


// // get data after order by and limit from firestore
// querySnapshot.forEach((docc) => {
//     console.log(`${docc.id} => ${docc.data().name}`);
//     console.log(docc.data());
//     renderCafe(docc);
// });

// // where, order by, and limit
// // sometimes need to add an index in firebase console
// const quer = query(conn, where("city", "==", "bogor"), orderBy("name"), limit(2));
// const querySnapshot = await getDocs(quer);


// // get data after order by and limit from firestore
// querySnapshot.forEach((docc) => {
//     console.log(`${docc.id} => ${docc.data().name}`);
//     console.log(docc.data());
//     renderCafe(docc);
// });
