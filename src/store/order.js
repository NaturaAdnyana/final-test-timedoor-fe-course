export default {
  namespaced: true,
  state() {
    return {
      order: [],
    }
  },
  getters: {},
  mutations: {
    setProductToOrder(state, payload) {
      state.order = payload
    },
  },
  actions: {
    async addProductToOrder({ commit }, payload) {
      const newData = {
        ...payload,
      }
      try {
        console.log(newData)
        commit('setProductToOrder', { ...newData })
      } catch (err) {
        console.log(err)
      }
    },
  },
}
