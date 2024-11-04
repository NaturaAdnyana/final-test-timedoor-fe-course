import axios from 'axios'
import Cookies from 'js-cookie'
export default {
  namespaced: true,
  state() {
    return {
      token: null,
      tokenExpirationDate: null,
      userLogin: {},
      isLogin: false,
    }
  },
  mutations: {
    setToken(state, { idToken, expiresIn }) {
      state.token = idToken
      state.tokenExpirationDate = expiresIn
      Cookies.set('tokenExpirationDate', expiresIn)
      Cookies.set('jwt', idToken)
    },
    setUserLogin(state, { userData, loginStatus }) {
      state.userLogin = userData
      state.isLogin = loginStatus
    },
    setUserLogout(state) {
      state.token = null
      state.userLogin = {}
      state.isLogin = false
      state.tokenExpirationDate = null
      Cookies.remove('jwt')
      Cookies.remove('tokenExpirationDate')
      Cookies.remove('UID')
    },
  },
  actions: {
    async getRegisterData({ commit, dispatch }, payload) {
      const APIkey = import.meta.env.VITE_FIREBASE_AUTH_API_KEY
      const authUrl =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='
      try {
        const { data } = await axios.post(authUrl + APIkey, {
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        })
        commit('setToken', {
          idToken: data.idToken,
          expiresIn:
            new Date().getTime() + Number.parseInt(data.expiresIn) * 1000,
        })
        const newUserData = {
          userId: data.localId,
          fullname: payload.fullname,
          username: payload.username,
          email: payload.email,
          imageLink:
            payload.imageLink ||
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjxTOc1Z5yT4gzy6apVD7dFJXL-nHVcYA3xg&s',
        }

        Cookies.set('UID', newUserData.userId)
        await dispatch('addNewUser', newUserData)
      } catch (err) {
        console.log(err)
      }
    },
    async addNewUser({ commit, state }, payload) {
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_FIREBASE_DATABASE_URL}/users.json?auth=${state.token}`,
          payload,
        )
        console.log(data)
        commit('setUserLogin', { userData: payload, loginStatus: true })
      } catch (err) {
        console.log(err)
      }
    },
    async getLoginData({ commit, dispatch }, payload) {
      const APIkey = import.meta.env.VITE_FIREBASE_AUTH_API_KEY
      const authUrl =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='
      try {
        const { data } = await axios.post(authUrl + APIkey, {
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        })
        commit('setToken', {
          idToken: data.idToken,
          expiresIn:
            new Date().getTime() + Number.parseInt(data.expiresIn) * 1000,
        })
        await dispatch('getUser', data.localId)
        await dispatch('cart/getCartData', null, { root: true })
      } catch (err) {
        console.log(err)
      }
    },
    async getUser({ commit }, payload) {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_FIREBASE_DATABASE_URL}/users.json`,
        )
        for (let key in data) {
          if (data[key].userId === payload) {
            Cookies.set('UID', data[key].userId)
            commit('setUserLogin', {
              userData: data[key],
              loginStatus: true,
            })
          }
        }
      } catch (err) {
        console.log(err)
      }
    },
    async updateUserEmail({ state, dispatch }, payload) {
      const APIkey = import.meta.env.VITE_FIREBASE_AUTH_API_KEY
      const authUrl =
        'https://identitytoolkit.googleapis.com/v1/accounts:update?key='

      try {
        const { data } = await axios.post(authUrl + APIkey, {
          idToken: state.token,
          email: payload.email,
          returnSecureToken: true,
        })

        // commit('setToken', {
        //   idToken: data.idToken,
        //   expiresIn:
        //     new Date().getTime() + Number.parseInt(data.expiresIn) * 1000,
        // })

        const newUpdateData = {
          userId: data.localId,
          fullname: payload.fullname,
          username: payload.username,
          email: payload.email,
          imageLink:
            payload.imageLink ||
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjxTOc1Z5yT4gzy6apVD7dFJXL-nHVcYA3xg&s',
        }

        await dispatch('updateUser', { newUpdateData })
      } catch (err) {
        console.log('Error updating email:', err)
      }
    },
    async updateUser({ dispatch, rootState }, { newUpdateData }) {
      try {
        const { data } = await axios.put(
          `${import.meta.env.VITE_FIREBASE_DATABASE_URL}/users/${newUpdateData.userId}.json?auth=${rootState.auth.token}`,
          newUpdateData,
        )

        await dispatch('getUser', data.userId)
      } catch (err) {
        console.log(err)
      }
    },
  },
}
