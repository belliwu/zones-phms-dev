import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/axios/axios-firebase.js'

Vue.use(Vuex)

let store = new Vuex.Store(
    {
        state:
        {
            idToken: null,
            userId: null
        },
        mutations: {

        },
        actions: {
            signup({ commit }, authData)
            {
                axios.post("/signupNewUser?key=AIzaSyAwO0lOWwdLbSEyQDz5N9AJKuBIKRbpuBI",
                    {
                        email: authData.email,
                        password: authData.password,
                        returnSecureToken: true
                    })
                    .then(res => console.log(res))
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
                    .then(res => console.log(res))
                    .catch(error => console.log(error));
            }
        },
        getters: {

        }
    })

export default store;