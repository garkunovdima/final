import { createStore } from 'vuex'
import userFolder from './user/index.js'
import postsFolder from './posts/index.js'

// import { initializeApp } from 'firebase/app';
// import { getDatabase, ref, onValue } from "firebase/database";

export default createStore({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: { user: userFolder, posts: postsFolder }

})