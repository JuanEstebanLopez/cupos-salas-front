import Vue from 'vue'
import Vuex from 'vuex'

import CuposSalaConnection from '../helpers/BackConnection'

Vue.use(Vuex)

const conection = new CuposSalaConnection()

function showError (error, dispatch, title = 'Se ha presentado un problema') {
  var message = Array.isArray(error) ? error.join(', ') : error
  return dispatch('showModal', { type: 'error', active: true, message, title })
}

export default new Vuex.Store({
  state: {
    setup: true,
    modalInfo: {
      type: 'info', // error, info, success, warning
      active: false,
      message: '',
      title: ''
    },
    user: {},
    salas: {},
    personas: {}
  },
  getters: {
    setup: state => state.setup,
    modalInfo: state => state.modalInfo,
    user: state => state.user,
    salas: state => state.salas,
    personas: state => state.personas
  },
  mutations: {
    SET_SETUP (state, setup) {
      state.setup = setup
      return state.setup
    },

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
    },

    SET_SALAS (state, salas) {
      state.salas = salas
      return state.salas
    },
    SET_SALA (state, sala) {
      state.salas[sala.id] = sala
      return state.salas[sala.id]
    },

    SET_PERSONAS (state, personas) {
      state.personas = personas
      return state.personas
    },
    SET_PERSONA (state, persona) {
      state.personas[persona.id] = persona
      return state.personas[persona.id]
    }

  },
  actions: {

    isSetup ({ commit, dispatch }) {
      return conection.isSetup()
        .then(r => {
          if (r.data.error) { return showError(r.data.error, dispatch) }
          return commit('SET_SETUP', r.data.setup || false)
        })
    },
    setup ({ commit, dispatch }, infoPersona) {
      return conection.setup(infoPersona).then(r => {
        if (r.data.error) return showError(r.data.error, dispatch)
        if (r.data.mensaje) dispatch('showModal', { title: 'Configuración', message: r.data.mensaje })

        return commit('SET_SETUP', r.data.setup || false)
      })
    },

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
    },

    loadSalas ({ commit, dispatch }) {
      return conection.salas().then(r => {
        if (r.data.error) return showError(r.data.error, dispatch)
        if (r.data.mensaje) dispatch('showModal', { title: 'Carga de salas', message: r.data.mensaje })
        var salas = r.data.reduce((ss, sala) => {
          ss[sala.id] = sala
          return ss
        }, {})
        return commit('SET_SALAS', salas)
      })
    },
    loadSala ({ commit, dispatch }, id) {
      return conection.sala(id).then(r => {
        if (r.data.error) return showError(r.data.error, dispatch)
        if (r.data.mensaje) dispatch('showModal', { title: 'Carga de sala', message: r.data.mensaje })
        if (!(r.data.id && r.data.nombre)) return showError('Error al cargar la sala', dispatch)
        return commit('SET_SALA', r.data)
      })
    },
    loadPersonas ({ commit, dispatch }) {
      return conection.personas().then(r => {
        if (r.data.error) return showError(r.data.error, dispatch)
        if (r.data.mensaje) dispatch('showModal', { title: 'Carga de personas', message: r.data.mensaje })
        var personas = r.data.reduce((ss, persona) => {
          ss[persona.id] = persona
          return ss
        }, {})
        return commit('SET_PERSONAS', personas)
      })
    },
    loadPersona ({ commit, dispatch }, id) {
      return conection.persona(id).then(r => {
        if (r.data.error) return showError(r.data.error, dispatch)
        if (r.data.mensaje) dispatch('showModal', { title: 'Carga de persona', message: r.data.mensaje })
        if (!(r.data.id && r.data.nombre)) return showError('Error al cargar la persona', dispatch)
        return commit('SET_PERSONA', r.data)
      })
    }
  }
})
