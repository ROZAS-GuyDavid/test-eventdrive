<template>
  <div id="app" class="container">
    <p class="h2">Eventdrive</p>
    <Events/>
    <EventList/>
  </div>
</template>

<script>
import Events from './components/Events'
import EventList from './components/EventList'

export default {
  name: 'App',
  components: {
    Events,
    EventList
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
  margin-top: 60px;
}
</style>
