<template>
    <div class="events">
        <p>logged in: {{ loggedIn }}</p>
        <button @click="autoRefreshStore">test autoRefresh</button>
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
    this.loggedIn ? '' : store.commit('loginUser')
  },

  computed: {
    // je récupère mes getters depuis mon EventsStor
    ...Vuex.mapGetters(['loggedIn'])
  },
  methods: {
    // je récupère mes actions depuis mon EventsStor
    ...Vuex.mapActions({
      loginUserStore: 'loginUser',
      autoRefreshStore: 'autoRefresh'
    })
  }
}
</script>

<style scoped>

</style>
