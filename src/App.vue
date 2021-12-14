<template>
  <div id="app" class="vh-100">
    <transition appear name="fade">
      <div class="app-bg h-100 w-100">
        <div class="container">
          <transition appear name="fade2s">
            <p class="h2 text-white mb-5">Eventdrive</p>
          </transition>
          <div v-if="!loggedIn">
            <Login/>
          </div>
          <div v-else>
            <transition appear name="fade4s">
              <CreateEvent/>
            </transition>
            <EventList/>
          </div>
        </div>
      </div>
    </transition>
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
}
.app-bg {
  padding-top: 60px;
  background: linear-gradient(#e66465, #9198e5);
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-active{
  opacity: 0;
}
.fade2s-enter-active, .fade2s-leave-active {
  transition: opacity 2.5s;
}
.fade2s-enter, .fade2s-leave-active{
  opacity: 0;
}
.fade3s-enter-active, .fade4s-leave-active {
  transition: opacity 4s;
}
.fade3s-enter, .fade4s-leave-active{
  opacity: 0;
}
.fade-slidey-enter-active, .fade-slidey-leave-active {
  transition: opacity 1s, transform 1s;
}
.fade-slidey-enter, .fade-slidey-leave-active{
  opacity: 0;
  transform: translateY(20px);
}
.event-table-item {
  transition: all 3s;
}
.event-table-item > * {
  transition: all 3s;
  overflow: hidden;
}
.event-table-enter, .event-table-leave-to {
  line-height: 0;
}
.event-table-enter > *, .event-table-leave-to > * {
  padding-top: 0px !important;
  padding-bottom: 0px !important;
}
</style>
