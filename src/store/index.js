import Vue from 'vue'
import Vuex from 'vuex'

import { Api } from '../helpers/api'

const api = new Api(Api.ROUTES().persona)
console.log(api)

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    modalInfo: {
      type: 'info', // error, info, success, warning
      active: false,
      message: '',
      title: ''
    },
    user: {}
  },
  mutations: {

    SET_USER_DATA (state, userData = undefined) {
      if (userData === undefined) {
        var uData = JSON.parse(localStorage.getItem('user'))
        if (uData) userData = uData
      }
      if (userData !== undefined) {
        state.user = userData
        localStorage.setItem('user', JSON.stringify(userData))
      }
      return state.user
    },
    CLEAR_USER_DATA () {
      localStorage.removeItem('user')
      location.reload()
      return true
    },

    SET_MODAL (state, modalData) {
      state.modalInfo = modalData
      return state.modalInfo
    }
  },
  actions: {

    login ({ commit }, data) {
      return commit('SET_USER_DATA', data)
    },
    logout ({ commit }) {
      return commit('CLEAR_USER_DATA')
    },
    showModal ({ commit }, { type = 'info', active = true, message = '', title = '' }) {
      return commit('SET_MODAL', { type, active, message, title })
    },
    closeModal ({ commit }) {
      return commit('SET_MODAL', { type: 'info', active: true, message: '', title: '' })
    }
  },
  modules: {
  }
})
