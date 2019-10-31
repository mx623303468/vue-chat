import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

const state = {
  loading: false,
  sending: false,
  error: null,
  user: [],
  reconnect: false,
  activeRoom: null,
  rooms: [],
  users: [],
  messages: [],
  userTyping: null
}

const getters = {
  hasError: state => (state.error ? true : false)
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {},
  plugins: [vuexLocal.plugin],
  strict: debug
})
