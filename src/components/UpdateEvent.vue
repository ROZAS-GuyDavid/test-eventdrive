<template>
    <div class="card mx-auto col-3 p-3">
      <h5 class="card-title">Modifier l'évenement {{ id }}</h5>
      <div class="mb-3">
          <input type="text" class="form-control" v-model="newName" placeholder="nom">
      </div>
      <div class="mb-3">
          <input type="date" class="form-control" v-model="startDate" placeholder="date de debut">
      </div>
      <div class="mb-3">
          <input type="date" class="form-control" v-model="endDate" placeholder="date de fin">
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
      endDate: ''
    }
  },

  props: [
    'id'
  ],

  computed: {
    validatedFields: function () {
      if (this.newName !== '') {
        return true
      } else {
        return false
      }
    }
  },

  methods: {
    updateEvent: function () {
      store.dispatch('updateEvent', {
        id: 1,
        newName: this.newName
      })
    }
  }
}
</script>
