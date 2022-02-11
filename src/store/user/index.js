import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
//import { getDatabase, ref, update, set,onValue } from "firebase/database";
import { getDatabase, onValue, ref, set, } from "firebase/database";


function isValidToken(token) {
    return token !== '';
}

export default {
    namespaced: true,
    state() {
        return {
            name: '',
            email: '',
            uid: '',
            authState: null,
            profileLink: '',
            userData: null,
        }
    },
    getters: {
        isAuth(state) {
            return isValidToken(state.uid);
        },
        profileInfo(state) {
            return {
                userData: state.userData,
                
                name: state.name,
                email: state.email,
                uid: state.uid,
                authState: state.authState,
                profileLink: state.email.slice(0, state.email.indexOf('@')),
            };
        },
    },
    mutations: {
        setUser(state, data) {
            state.name = data.name;
            state.email = data.email;
            state.uid = data.uid;
            state.profileLink = data.email.slice(0, data.email.indexOf('@'));
            state.authState = true;
        },
        setCurentUser(state, data) {
            state.userData = data;
        }
    },
    actions: {
        getUser(context, uid) {
            const db = getDatabase();
            onValue(ref(db, `/users/${uid}`), (snapshot) => {
                context.commit('setCurentUser', snapshot.val())
            });
        },

        login(context, data) {
            const auth = getAuth();

            return signInWithEmailAndPassword(auth, data.email, data.password)
                .then((userCredential) => {

                    context.state.email = userCredential.user.email;
                    context.state.uid = userCredential.user.uid;

                    return 'log ok';
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log('login errorCode: ', errorCode);
                    console.log('login errorMessage: ', errorMessage);
                    if (errorCode == 'auth/user-not-found')
                        throw new Error('login');
                    else if (errorCode == 'auth/wrong-password')
                        throw new Error('password');
                    else return 'login ne ok';
                })
                .finally((e) => { console.log('result', e); return e });
        },
        signIn(context, data) {
            const auth = getAuth();
            return createUserWithEmailAndPassword(auth, data.email, data.password) // отсылаем запрос с email и password пользователя
                .then((userCredential) => { //userCredential - ответ на запрос firebase
                    const user = userCredential.user;
                    data.uid = user.uid;
                    return data;
                })
                .then((data) => {
                    data.publicList = {};
                    data.privateList = [];
                    data.myPosts = [];
                    data.ava = '';

                    const db = getDatabase();
                    set(ref(db, '/users/' + data.uid), data);
                    return 'reg ok';
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log('reg errorCode: ', errorCode);
                    console.log('reg errorMessage: ', errorMessage);

                    return 'reg ne ok';
                });
        },
        AuthStateChanged(context, data) {
            const auth = getAuth();
            console.log(data);
            return onAuthStateChanged(auth, (user) => {
                if (user) {
                    context.uid = user.uid;
                }
            });
        },
        logOut(context) {
            const auth = getAuth();
            signOut(auth).then(() => {
                context.state.email = '';
                context.state.uid = '';
                context.state.name = '';
                context.state.profileLink = '';
                context.state.authState = false;

            })
        },
    },
}