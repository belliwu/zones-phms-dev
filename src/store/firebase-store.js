import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/axios/axios-firebase.js'
import globalAxios from 'axios';

Vue.use(Vuex)

let store = new Vuex.Store(
    {
        //1. State Object is vuex core
        state:
        {
            idToken: null,
            userId: null,
            user: null
        },

        //2. Store any data into State Object , have to by mutation
        mutations: {
            // Store idToken and userId after signup
            authUser(state, userData)
            {
                state.idToken = userData.token;
                state.userId = userData.userId;
            },
            // Store all user information 
            storeUser(state, user)
            {
                state.user = user;
            }
        },

        //3. Provide interfaces to store data into State Object for application 
        actions: {
            signup({ commit, dispatch }, authData)
            {
                axios.post("/signupNewUser?key=AIzaSyAwO0lOWwdLbSEyQDz5N9AJKuBIKRbpuBI",
                    {
                        email: authData.email,
                        password: authData.password,
                        returnSecureToken: true
                    })
                    .then(res =>
                    {
                        console.log(res);
                        commit("authUser", {
                            token: res.data.idToken,
                            userId: res.data.localId
                        });
                        dispatch("storeUser", authData)
                    })
                    .catch(error => console.log(error));
            },

            login({ commit }, authData)
            {
                axios.post("/verifyPassword?key=AIzaSyAwO0lOWwdLbSEyQDz5N9AJKuBIKRbpuBI",
                    {
                        email: authData.email,
                        password: authData.password,
                        returnSecureToken: true
                    }
                )
                    .then(res =>
                    {
                        console.log("Login Response >>> ", res);
                        commit("authUser", {
                            token: res.data.idToken,
                            userId: res.data.localId
                        })
                        // this.$router.push("Dashboard");
                    })
                    .catch(error => console.log(error));
            },

            storeUser({ commit, state }, userData)
            {
                if (!state.idToken) return;
                console.log(">>><<< storeUser() : state.idToken : ", state.idToken)
                globalAxios.post('/users.json' + '?auth=' + state.idToken, userData)
                    .then(res => console.log(res))
                    .catch(error => console.log(error))
            },

            fetchUser({ commit, state })
            {
                console.log(">>><<<1. fetchUser() : state.idToken : ", state.idToken)
                if (!state.idToken) return
                globalAxios.get("/users.json" + "?auth=" + state.idToken)
                    .then(res =>
                    {
                        console.log(">>>>2.  Fetch Users response : ", res);
                        const data = res.data;
                        const users = [];
                        for (let key in data)
                        {
                            const user = data[key];
                            user.id = key;
                            users.push(user);
                        }
                        console.log(">>>3. Fetch Users data : ", users);

                        // Bug : user[0] all fetch first user from firebase.
                        // But It wull be not same user if exist many users
                        commit("storeUser", users[0]);
                    })
                    .catch(error => console.log(error));
            }
        },

        //4. Provide interfaces to access data into State Object for application 
        getters: {
            user(state)
            {
                return state.user;
            }
        }
    })

export default store;