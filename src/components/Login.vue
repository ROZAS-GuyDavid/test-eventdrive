<template>
    <transition appear name="fade-slidey">
      <div class="login mx-auto col-3">
        <div class="card p-3">
          <h5 class="card-title">Connexion</h5>
          <div class="mb-3">
              <input type="text" class="form-control" v-model="id" placeholder="id">
          </div>
          <div class="mb-3">
              <input type="text" class="form-control" v-model="clientSecret" placeholder="client secret">
          </div>
          <button @click.prevent="loggedOrCached()" type="submit" class="btn btn-primary" :class="{'disabled' : !validatedFields}">Submit</button>
        </div>
      </div>
    </transition>
</template>

<script>
import store from './EventsStore'
import Vuex from 'vuex'

export default {

  store: store,

  name: 'Login',

  data () {
    return {
      id: '',
      clientSecret: ''
    }
  },

  computed: {
    validatedFields  () {
      if (this.id !== '' && this.clientSecret !== '') {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    // je récupère mes actions depuis mon EventsStore
    ...Vuex.mapActions({
      sendLogin: 'loggedOrCached'
    }),

    loggedOrCached () {
      this.sendLogin({
        id: this.id,
        clientSecret: this.clientSecret
      })
    }
  }
}
</script>

<style scoped>

</style>
