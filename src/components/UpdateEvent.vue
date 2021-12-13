<template>
    <div class="card mx-auto col-3 p-3">
      <h5 class="card-title">Modifier l'évenement {{ id }}</h5>
      <div class="mb-3">
          <input type="text" class="form-control" v-model="newName" placeholder="nom">
      </div>
      <div class="mb-3">
          <input type="date" class="form-control" placeholder="date de debut" disabled>
      </div>
      <div class="mb-3">
          <input type="date" class="form-control" placeholder="date de fin" disabled>
      </div>
      <button @click="updateEvent()" type="submit" class="btn btn-primary" :class="{'disabled' : !validatedFields}">Submit</button>
    </div>
</template>

<script>
import store from './EventsStore'

export default {

  store: store,

  name: 'UpdateEvent',

  data () {
    return {
      newName: '',
      startDate: '',
      endDate: '',
      mainManagerId: 5962
    }
  },

  props: [
    'id'
  ],

  mounted () {
    // TODO FIX récupérer name, startDate et endDate depuis mon store
    this.getEventStoredById(this.id)
  },

  computed: {
    currentName: function () {
      return this.event.name.en
    },
    validatedFields: function () {
      if (this.newName !== '') {
        return true
      } else {
        return false
      }
    }
  },

  methods: {
    // TODO FIX récupérer name, startDate et endDate depuis mon store
    getEventStoredById: function (id) {
      return store.getters.getEventStoredById(id)
    },
    updateEvent: function () {
      store.dispatch('updateEvent', {
        id: this.event.id,
        name: this.newName,
        startDate: this.startDate,
        endDate: this.endDate
      })
    }
  }
}
</script>
