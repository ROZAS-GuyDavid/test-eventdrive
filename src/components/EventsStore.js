import axios from 'axios'
import jwtDecode from 'jwt-decode'
import Vuex from 'vuex'

const state = {
  // J'initialise mon jeton en verifiant l'existant dans le cache
  accessToken: localStorage.getItem('access_token') ? localStorage.getItem('access_token') : '' || null,
  refreshToken: '' || null,
  eventList: [] || null
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
  },
  // Recupérer ma liste d'evenement
  getEvents: (state) => {
    state.eventList = JSON.parse(localStorage.getItem('event_list'))
  }
}

const instance = axios.create({
  baseURL: 'https://api.dev.eventdrive.com/public/v1/'
})

const actions = {
  loginUser: (store) => {
    return new Promise((resolve, reject) => {
      instance.post('/token', {
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

  async getEvents (store) {
    // J'attend mon token
    await store.dispatch('loginUser')

    return new Promise((resolve, reject) => {
      instance.get('/events', {
        headers: {
          'Authorization': 'Bearer ' + store.state.accessToken
        }
      })
        .then(response => {
          localStorage.setItem('event_list', JSON.stringify(response.data))
          store.commit('getEvents')
        })
        .catch(error => {
          // en cas d'erreur je renvoie le message
          console.log(error)
          reject(error)
        })
    })
  },

  loggedInCached: ({ dispatch, commit, getters }, store) => {
    // Je verifie si j'ai un token dans le cache
    // Sinon je fait une nouvelle requette
    return getters.loggedIn ? '' : dispatch('loginUser')
  },

  eventCached: (store) => {
    // Je verifie qu'une liste existe dans le cache
    if (!localStorage.event_list) {
      // requette ur l'Api
      store.dispatch('getEvents')
    } else {
      // Evenement dans le store
      store.commit('getEvents')
    }
  },

  refreshToken: (store) => {
    store.dispatch('loginUser')
    store.dispatch('autoRefresh')
  },

  autoRefresh: (store) => {
    // je recupère le temps restant en decodant le jeton
    const { exp } = jwtDecode(store.state.accessToken)

    const now = Date.now() / 1000
    let timeUntilRefresh = exp - now

    // Je reduit mon le temps restant de 15 min avant de raffraichir,
    timeUntilRefresh -= (15 * 60)
    const refreshToken = setTimeout(() => store.dispatch('refreshToken'), Math.round(timeUntilRefresh))
  }
}

const getters = {
  // Je défini les getters que je vais pouvoir déclancher notament depuis ma vue Events
  loggedIn: state => state.accessToken != null,
  hasEvents: state => state.eventList != null
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
