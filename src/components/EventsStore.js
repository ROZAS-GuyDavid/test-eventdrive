import axios from 'axios'
import jwt_decode from 'jwt-decode'
import Vuex from 'vuex'

const state = {
  // J'initialise mon jeton en verifiant l'existant dans le cache
  accessToken: localStorage.getItem('access_token') ? localStorage.getItem('access_token') : '' || null,
  refreshToken: '' || null
}

const mutations = {
  // Je définit les evenement à déclancher pour :
  // Recuper mon jeton depuis le cache
  loginUser: (state) => {
    state.accessToken = localStorage.getItem('access_token')
    state.refreshToken = localStorage.getItem('refresh_token')
  },
  // Détruire mon jeton
  destroyToken: (state) => {
    state.accessToken = null
    state.refreshToken = null
  }
}

const actions = {
  loginUser: (store) => {
    return new Promise((resolve, reject) => {
      axios.post('https://api.dev.eventdrive.com/public/v1/token', {
        client_id: 25,
        client_secret: 'my_client_seceret'
      })
        .then(response => {
          // Je stock mon jeton dans le cache
          localStorage.setItem('access_token', response.data.access_token)
          localStorage.setItem('refresh_token', response.data.refresh_token)

          // J'appelle ma mutation loginUser qui mettra à jour mon jeton depuis mon cache
          store.commit('loginUser')
          resolve(response)
        })
        .catch(error => {
          // en cas d'erreur je renvoie le message
          console.log(error)
          reject(error)
        })
    })
  },
  refreshToken: (store) => {
    store.dispatch('loginUser')
    store.dispatch('autoRefresh')
  },

  autoRefresh: (store) => {
    // je recupère le temps restant en decodant le jeton
    const { exp } = jwt_decode(store.state.accessToken)

    const now = Date.now() / 1000
    let timeUntilRefresh = exp - now

    // Je reduit mon le temps restant de 15 min avant de raffraichir,
    timeUntilRefresh -= (15 * 60)
    const refreshToken = setTimeout(() => store.dispatch('refreshToken'), Math.round(timeUntilRefresh))
  }
}

const getters = {
  // Je défini les getters que je vais pouvoir déclancher notament depuis ma vue Events
  loggedIn: state => state.accessToken != null
}

let store = new Vuex.Store({

  state: state,

  mutations: mutations,

  getters: getters,

  actions: actions,

  strict: true

})

global.store = store

export default store
