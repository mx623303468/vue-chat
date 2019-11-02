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
  error: 'Test Error Message',
  currentUser: {},
  reconnect: false,
  activeRoom: null,
  rooms: [],
  users: [],
  messages: [
    // {
    //   username: 'Jack',
    //   date: '2019-10-10',
    //   text: '悔创阿里杰克马'
    // },
    // {
    //   username: 'Poin',
    //   date: '2019-10-11',
    //   text: '普通人家马皮诺'
    // },
    // {
    //   username: 'Robin',
    //   date: '2019-10-11',
    //   text: `红颜祸水 What's your problem？`
    // }
  ],
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
