import axios from 'axios'

export default {
  namespaced: true,
  state() {
    return {
      order: [],
      totalOrder: 0,
      orderHistory: [],
    }
  },
  getters: {},
  mutations: {
    setProductToOrder(state, { newData, countData }) {
      state.order = newData
      state.totalOrder = countData
    },
    setOrderHistory(state, payload) {
      state.orderHistory = payload
    },
  },
  actions: {
    async getOrderHistory({ commit, rootState }) {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_FIREBASE_DATABASE_URL}/orders.json`,
        )

        const arr = []
        for (let key in data) {
          arr.push({ id: key, ...data[key] })
        }

        const userOrderHistory = arr.filter(
          item => item.buyerUserId === rootState.auth.userLogin.userId,
        )

        commit('setOrderHistory', userOrderHistory)
      } catch (error) {
        console.log(error)
      }
    },

    async addProductToOrder({ commit }, payload) {
      const newData = payload
      const countData = newData.length
      try {
        commit('setProductToOrder', { newData, countData })
      } catch (err) {
        console.log(err)
      }
    },

    async orderProduct({ commit, rootState, dispatch }, payload) {
      const newData = {
        ...payload,
        buyerUsername: rootState.auth.userLogin.username,
        createdAt: Date.now(),
        buyerUserId: rootState.auth.userLogin.userId,
      }
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_FIREBASE_DATABASE_URL}/orders.json?auth=${rootState.auth.token}`,
          newData,
        )

        const deleteRequests = payload.map(id =>
          axios.delete(
            `${import.meta.env.VITE_FIREBASE_DATABASE_URL}/carts/${id.id}.json?auth=${rootState.auth.token}`,
          ),
        )
        await Promise.all(deleteRequests)

        commit('setOrderHistory', { id: data.name, ...newData })

        await dispatch('getOrderHistory')
        await dispatch('cart/getCartData', null, { root: true })
      } catch (err) {
        console.log(err)
      }
    },
  },
}
