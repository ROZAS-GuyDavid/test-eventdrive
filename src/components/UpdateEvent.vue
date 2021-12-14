<template>
    <transition appear name="fade-slidey">
      <div class="card mx-auto col-3 p-3">
        <h5 class="card-title">Modifier l'évenement {{ id }}</h5>
        <div class="mb-3">
            <input type="text" class="form-control" v-model="newName" placeholder="nom">
        </div>
        <div class="mb-3">
            <input type="text" class="form-control" v-model="mainManagerId" placeholder="main manager id ex: 5962">
        </div>
        <div class="mb-3">
            <input type="date" class="form-control" v-model="startDate" placeholder="date de debut" disabled>
        </div>
        <div class="mb-3">
            <input type="date" class="form-control" v-model="endDate" placeholder="date de fin" disabled>
        </div>
        <button @click="updateEvent()" type="submit" class="btn btn-primary" :class="{'disabled' : !validatedFields}">Submit</button>
      </div>
    </transition>
</template>

<script>
import store from './EventsStore'
import Vuex from 'vuex'

export default {

  store: store,

  name: 'UpdateEvent',

  data () {
    return {
      newName: '',
      startDate: '',
      endDate: '',
      mainManagerId: ''
    }
  },

  props: [
    'id'
  ],

  mounted () {
    let event = this.getEventStoredById(this.id)

    this.newName = event.name.en
    this.startDate = this.getFormatedDate(event.start_date)
    this.endDate = this.getFormatedDate(event.end_date)
    this.mainManagerId = event.main_manager_id
  },

  computed: {
    validatedFields: function () {
      if (this.newName !== '' && this.mainManagerId !== '') {
        return true
      } else {
        return false
      }
    }
  },

  methods: {
    // je récupère mes actions depuis mon EventsStore
    ...Vuex.mapActions({
      updateEventStore: 'updateEvent'
    }),

    getFormatedDate: function (date) {
      return this.$store.getters.formatDate(date)
    },

    getEventStoredById: function (id) {
      return this.$store.getters.getEventStoredById(id)
    },

    updateEvent: function () {
      this.updateEventStore({
        id: this.id,
        name: this.newName,
        startDate: this.startDate,
        endDate: this.endDate,
        mainManagerId: this.mainManagerId
      })
    }
  }
}
</script>
