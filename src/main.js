// native
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//bootstrap
import '@/../bootstrap/dist/css/bootstrap.css'

//firebase
import { initializeApp } from 'firebase/app';
// import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// firebase config
const firebaseConfig = {
    apiKey: "AIzaSyC1IpFwhpgHk6Aaq3GQJWzPLbmi-JoLiTM",
    authDomain: "harkunov-88060.firebaseapp.com",
    databaseURL: "https://harkunov-88060-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId: "harkunov-88060",
    storageBucket: "harkunov-88060.appspot.com",
    messagingSenderId: "827265746885",
    appId: "1:827265746885:web:e5884ca0b7ed4b304a2dac",
    measurementId: "G-0KD89ZK2WD"
};

// initialize firebase components and consts
initializeApp(firebaseConfig);

const auth = getAuth();

// const db = getDatabase();
// const path = '/posts';

// onValue(ref(db, path), (snapshot) => {
//     store.commit('posts/clear');
//     const postsObject = snapshot.val();
//     for (const [key, value] of Object.entries(postsObject)) {
//         store.commit('posts/addPost', value, key);
//     }
// });

onAuthStateChanged(auth, (user) => {
    if (user) {
        store.dispatch('user/getUser', user.uid);
        store.commit('user/setUser', user);
    } else store.dispatch('user/logout');
})

createApp(App).use(store).use(router).mount('#app')