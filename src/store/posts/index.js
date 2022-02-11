import { getDatabase, ref, update, set, onValue } from "firebase/database";
// import { getDatabase, ref, onValue } from "firebase/database";

export default {
    namespaced: true,
    state() {
        return {
            posts: [

            ]
        }
    },
    getters: {
        posts(state) {
            return state.posts;
        }
    },
    mutations: {
        addPost(state, data) {
            state.posts.push(data);
        },
        clear(state) {
            state.posts = [];
        }
    },
    actions: {
        gotPosts(context, data) {
            const db = getDatabase();
            const path = '/posts';

            if (data && data != []) {
                console.log('data:', data);
                context.commit('clear');
                for (let i in data) {
                    console.log(`data[${i}]=${data[i]}`);

                    onValue(ref(db, `/posts/${data[i]}`), (snapshot) => {
                        const postsObject = snapshot.val();
                        context.commit('addPost', postsObject);
                    });
                }
            } else {
                onValue(ref(db, path), (snapshot) => {
                    context.commit('clear');
                    const postsObject = snapshot.val();
                    for (const [key, value] of Object.entries(postsObject)) {
                        context.commit('addPost', value, key);
                    }
                });
            }
        },
        createPost(context, data) {
            const db = getDatabase();
            set(ref(db, '/posts/' + data.id), data)
                .then(() => {
                    onValue(ref(db, `/users/${data.authorLink}/myPosts`), (snapshot) => {
                        console.log('snapshot: ', snapshot);

                        const temp = snapshot.val();
                        const usersPostsList = Object.entries(temp);

                        console.log('usersPostsList: ', usersPostsList);
                        console.log('typeof', typeof usersPostsList);

                        for (const [key, value] of usersPostsList) {
                            console.log(`key: ${key}; value: ${value}`);
                        }

                        set(ref(db, `/users/${data.authorLink}/myPosts/${data.id}`), data.id)
                        console.log("успех");
                    })
                })
        },
        updatePost(context, data) {
            console.log('DATA in updatePost', data);

            const updates = {};
            updates['/posts/' + data.id] = data;
            const db = getDatabase();
            return update(ref(db), updates);
        },
        deletePost(context, data) {
            const updates = {};
            updates['/posts/' + data.id] = null;
            const db = getDatabase();
            return update(ref(db), updates)
                .then(() => {
                    updates['/users/' + data.authorLink + '/myPosts/' + data.id] = null;
                    update(ref(db), updates)
                });
        }
    }
}