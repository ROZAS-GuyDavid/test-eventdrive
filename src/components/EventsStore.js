import axios from 'axios'
import Vuex from 'vuex'

const state = {
  // J'initialise mon jeton en verifiant l'existant dans le cache
  accessToken: '' || null,
  refreshToken: '' || null,
  eventList: [],
  showCreateEvent: false,
  showUpdateEvent: false
}

const mutations = {
  // Je définit les evenement à déclancher pour :
  // Recuper mon jeton depuis le cache
  TokenMut: (state, token) => {
    state.accessToken = token.access_token
    state.refreshToken = token.refresh_token
  },

  // Détruire mon jeton
  destroyToken: (state) => {
    state.accessToken = null
    state.refreshToken = null
  },

  // Recupérer ma liste d'evenement
  eventsMut: (state, eventList) => {
    state.eventList = JSON.parse(eventList)
  },

  // Montrer le formulaire d'ajout d'évenement
  showCreateEvent: (state) => {
    state.showUpdateEvent = false
    state.showCreateEvent = true
  },

  // Cacher le formulaire d'ajout d'évenement
  hideCreateEvent: (state) => {
    state.showUpdateEvent = false
    state.showCreateEvent = false
  },

  // Montrer le formulaire d'update d'évenement
  showUpdateEvent: (state) => {
    state.showCreateEvent = false
    state.showUpdateEvent = true
  },

  // Cacher le formulaire d'update d'évenement
  hideUpdateEvent: (state) => {
    state.showCreateEvent = false
    state.showUpdateEvent = false
  }
}

const instance = axios.create({
  baseURL: 'https://api.dev.eventdrive.com/public/v1/'
})

const actions = {
  loginUser: (store, fields) => {
    return new Promise((resolve, reject) => {
      instance.post('/token', {
        client_id: fields.id,
        client_secret: fields.clientSecret
      })
        .then(response => {
          // J'appelle ma mutation TokenMut qui mettra à jour mon jeton dans le store
          store.commit('TokenMut', {
            access_token: response.data.access_token,
            refresh_token: response.data.refresh_token
          })
          resolve(response)
        })
        .catch(error => {
          // en cas d'erreur je renvoie le message
          console.log(error)
          reject(error)
        })
    })
  },

  getEvents (store) {
    // si la requette ne fonctionne pas
    // décommenter le code suivant

    // let data = {
    //   available_locales: []
    // }

    return new Promise((resolve, reject) => {
      // si la requette ne fonctionne pas
      // injectez la data    =>     instance.get('/events', data {
      instance.get('/events', {
        headers: {
          'Authorization': 'Bearer ' + store.state.accessToken
        }
      })
        .then(response => {
          store.commit('eventsMut', JSON.stringify(response.data))
        })
        .catch(error => {
          // en cas d'erreur je renvoie le message
          console.log(error)
          reject(error)
        })
    })
  },

  createEvent: (store, requestFields) => {
    let data = {
      main_manager_id: requestFields.mainManagerId,
      name: {
        'en': requestFields.name
      },
      start_date: requestFields.startDate,
      end_date: requestFields.endDate,
      default_locale: 'en',
      available_locales: ['en']
    }

    return new Promise((resolve, reject) => {
      instance.post('/events', data, {
        headers: {
          'Authorization': 'Bearer ' + store.state.accessToken
        }
      })
        .then(response => {
          // je récuère une nouvelle list d'event
          store.dispatch('getEvents')
          //  je masque le formulaire
          store.commit('hideCreateEvent')
        })
        .catch(error => {
          // en cas d'erreur je renvoie le message
          console.log(error)
          reject(error)
        })
    })
  },

  updateEvent: (store, requestFields) => {
    let data = {
      main_manager_id: requestFields.mainManagerId,
      name: {
        'en': requestFields.name
      },
      start_date: requestFields.startDate,
      end_date: requestFields.endDate,
      default_locale: 'en',
      available_locales: ['en']
    }
    return new Promise((resolve, reject) => {
      instance.put('/events/' + requestFields.id, data, {
        headers: {
          'Authorization': 'Bearer ' + store.state.accessToken
        }
      })
        .then(response => {
          // je récuère une nouvelle liste d'event
          store.dispatch('getEvents')
          //  je masque le formulaire
          store.commit('hideUpdateEvent')
        })
        .catch(error => {
          // en cas d'erreur je renvoie le message
          console.log(error)
          reject(error)
        })
    })
  },

  removeEvent: (store, id) => {
    if (confirm("voullez vous vraiment supprimer l'évenement ")) {
      return new Promise((resolve, reject) => {
        instance.delete('/events/' + id, {
          headers: {
            'Authorization': 'Bearer ' + store.state.accessToken
          }
        })
          .then(response => {
            // je récuère une nouvelle liste d'event
            store.dispatch('getEvents')
          })
          .catch(error => {
            // en cas d'erreur je renvoie le message
            console.log(error)
            reject(error)
          })
      })
    }
  },

  loggedOrCached: ({ dispatch, commit, getters }, fields) => {
    // Je verifie si j'ai un token dans le cache
    // Sinon je fait une nouvelle requette
    return getters.loggedIn ? '' : dispatch('loginUser', {id: fields.id, clientSecret: fields.clientSecret})
  },

  eventOrCached: ({ dispatch, commit, getters }) => {
    // Je verifie qu'une liste existe dans le cache
    if (getters.hasEvents === false) {
      // requette ur l'Api
      dispatch('getEvents')
    }
  }
}

const getters = {
  // Je défini les getters que je vais pouvoir déclancher notament depuis ma vue Events
  hasToken: state => state.accessToken !== null,
  loggedIn: (state, getters) => getters.hasToken !== false,
  eventCount: state => state.eventList.length,
  hasEvents: (state, getters) => getters.eventCount !== 0,
  createShowed: state => state.showCreateEvent !== false,
  updateShowed: state => state.showUpdateEvent !== false,
  getEventStoredById: (state) => (id) => {
    return state.eventList.items.find(event => event.id === id)
  },
  formatDate: state => (date) => {
    let d = new Date(date)
    return d.toISOString().substring(0, 10)
  }
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
