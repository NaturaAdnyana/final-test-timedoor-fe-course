import { createStore } from 'vuex'
import product from './product'
import auth from './auth'

export const store = createStore({
  modules: {
    product,
    auth,
  },
})
