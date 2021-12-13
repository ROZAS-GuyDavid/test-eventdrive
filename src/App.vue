<template>
  <div id="app" class="vh-100">
    <div class="container">
      <p class="h2 text-white mb-5">Eventdrive</p>
      <div v-if="!loggedIn">
        <Login/>
      </div>
      <div v-else>
        <CreateEvent/>
        <EventList/>
      </div>
    </div>
  </div>
</template>

<script>
import Login from './components/Login'
import EventList from './components/EventList'
import store from './components/EventsStore'
import CreateEvent from './components/CreateEvent'
import Vuex from 'vuex'

export default {

  name: 'App',

  store: store,

  components: {
    Login,
    EventList,
    CreateEvent
  },

  computed: {
    // je récupère mes getters depuis mon EventsStore
    ...Vuex.mapGetters(['loggedIn'])
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-top: 60px;
  background: linear-gradient(#e66465, #9198e5);
}
</style>
