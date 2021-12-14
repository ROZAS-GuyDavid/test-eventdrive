<template>
    <div class="create-event mb-5">
      <div class="row">
        <div class="col-12">
          <button @click.prevent="toggleCreateEvent()" class="btn btn-primary mb-2">
              Créer un évenement&nbsp;&nbsp;
              <i class="bi bi-calendar-event-fill"></i>
            </button>
        </div>
      </div>
      <transition appear name="fade">
        <div v-if="createShowed" @click.self="toggleCreateEvent()" class="vh-100 position-absolute w-100 bg-opacity-50 bg-dark top-0 start-0 pt-5">
          <transition appear name="fade-slidey">
            <div class="card mx-auto col-3 p-3">
              <h5 class="card-title">Créer un évenement</h5>
              <div class="mb-3">
                  <input type="text" class="form-control" v-model="mainManagerId" placeholder="manager id">
              </div>
              <div class="mb-3">
                  <input type="text" class="form-control" v-model="name" placeholder="nom">
              </div>
              <div class="mb-3">
                  <input type="date" class="form-control" v-model="startDate" placeholder="date de debut">
              </div>
              <div class="mb-3">
                  <input type="date" class="form-control" v-model="endDate" placeholder="date de fin">
              </div>
              <button @click="createEvent()" type="submit" class="btn btn-primary" :class="{'disabled' : !validatedFields}">Submit</button>
            </div>
          </transition>
        </div>
      </transition>
    </div>
</template>

<script>
import store from './EventsStore'
import Vuex from 'vuex'

export default {

  store: store,

  name: 'CreateEvent',

  data () {
    return {
      name: '',
      startDate: '',
      endDate: '',
      mainManagerId: 5962
    }
  },

  computed: {
    // je récupère mes getter depuis mon EventsStore
    ...Vuex.mapGetters([
      'createShowed'
    ]),

    validatedFields: function () {
      if (this.name !== '' && this.startDate !== '' && this.endDate !== '' && this.mainManagerId !== '') {
        return true
      } else {
        return false
      }
    }
  },

  methods: {
    toggleCreateEvent: function () {
      if (this.createShowed) {
        store.commit('hideCreateEvent')
      } else {
        store.commit('showCreateEvent')
      }
    },

    createEvent: function () {
      store.dispatch('createEvent', {
        mainManagerId: this.mainManagerId,
        name: this.name,
        startDate: this.startDate,
        endDate: this.endDate
      })
    }
  }
}
</script>
