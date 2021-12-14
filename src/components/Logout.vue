<template>
    <button @click="logout" class="btn btn-light rounded-circle position-absolute top-0 end-0 m-3"><i class="bi bi-box-arrow-left"></i></button>
</template>

<script>
import store from './EventsStore'
import Vuex from 'vuex'

export default {

  store: store,

  name: 'Logout',

  methods: {
    ...Vuex.mapActions([
      'logout'
    ])
  }

}
</script>
