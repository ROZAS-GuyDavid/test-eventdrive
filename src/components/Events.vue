<template>
    <div class="events">
        <p>logged in: {{ loggedIn }}</p>
    </div>
</template>

<script>
import store from './EventsStore'
import Vuex from 'vuex'

export default {

  store: store,

  name: 'Events',

  mounted () {
    // verifie si on est toujours connecter
    store.dispatch('loggedInCached')
  },

  computed: {
    // je récupère mes getters depuis mon EventsStore
    ...Vuex.mapGetters(['loggedIn'])
  },
  methods: {
    // je récupère mes actions depuis mon EventsStore
    ...Vuex.mapActions([
      'loggedInCached'
    ])
  }
}
</script>

<style scoped>

</style>
