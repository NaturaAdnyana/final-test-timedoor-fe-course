import axios from 'axios'

export default {
  namespaced: true,
  state() {
    return {
      products: [],
      productDetail: {},
    }
  },
  getters: {},
  mutations: {
    setProductData(state, payload) {
      state.products = payload
    },
    setProductDetail(state, payload) {
      state.productDetail = payload
    },
    setNewProduct(state) {
      state.products.push.payload
    },
  },
  actions: {
    async getProductData({ commit }) {
      try {
        const { data } = await axios.get(
          'https://vintage-store-natura-default-rtdb.asia-southeast1.firebasedatabase.app/products.json',
        )

        const arr = []
        for (let key in data) {
          arr.push({ id: key, ...data[key] })
        }

        commit('setProductData', arr)
      } catch (error) {
        console.log(error)
      }
    },

    // async getRecipeDetail({ commit }, payload) {
    //   try {
    //     const { data } = await axios.get(
    //       `https://vue-js-project-6b699-default-rtdb.firebaseio.com/recipes/${payload}.json`,
    //     )
    //     commit('setRecipeDetail', data)
    //   } catch (err) {}
    // },

    // async addNewRecipe({ commit, rootState }, payload) {
    //   const newData = {
    //     ...payload,
    //     username: rootState.auth.userLogin.username,
    //     createdAt: Date.now(),
    //     likes: ['null'],
    //     userId: rootState.auth.userLogin.userId,
    //   }
    //   try {
    //     const { data } = await axios.post(
    //       `https://vue-js-project-6b699-default-rtdb.firebaseio.com/recipes.json?auth=${rootState.auth.token}`,
    //       newData,
    //     )

    //     commit('setNewRecipe', { id: data.name, ...newData })
    //   } catch (err) {
    //     console.log(err)
    //   }
    // },

    // async deleteRecipe({ dispatch, rootState }, payload) {
    //   try {
    //     const { data } = await axios.delete(
    //       `https://vue-js-project-6b699-default-rtdb.firebaseio.com/recipes/${payload}.json?auth=${rootState.auth.token}`,
    //     )
    //     await dispatch('getRecipeData')
    //   } catch (err) {
    //     console.log(err)
    //   }
    // },

    // async updateRecipe({ dispatch, rootState }, { id, newRecipe }) {
    //   try {
    //     const { data } = await axios.put(
    //       `https://vue-js-project-6b699-default-rtdb.firebaseio.com/recipes/${id}.json?auth=${rootState.auth.token}`,
    //       newRecipe,
    //     )
    //     await dispatch('getRecipeData')
    //   } catch (err) {
    //     console.log(err)
    //   }
    // },
  },
}
