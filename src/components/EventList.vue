<template>
  <div class="event-list text-center">
    <transition appear name="fade">
      <div v-if="updateShowed" @click.self="toggleUpdateEvent()" class="vh-100 position-absolute w-100 bg-opacity-50 bg-dark top-0 start-0 pt-5">
        <UpdateEvent v-bind:id="selectedId"/>
      </div>
    </transition>
    <transition appear name="fade4s">
      <p class="h2 text-white mb-3">Liste d'evenement :</p>
    </transition>
    <transition appear name="fade-slidey">
      <table class="table table-light table-striped mx-auto" v-if="hasEvents">
          <thead>
              <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Nom</th>
                  <th scope="col">Date de début</th>
                  <th scope="col">Date de fin</th>
                  <th scope="col">Actions</th>
              </tr>
          </thead>
          <tbody name="event-table" is="transition-group">
              <tr class="event-table-item align-middle" v-for="event in eventList" :key ="event.id" appear>
                  <th scope="row">{{ event.id }}</th>
                  <td>{{ event.name.en }}</td>
                  <td>{{ event.start_date }}</td>
                  <td>{{ event.end_date }}</td>
                  <td>
                      <div class="d-grid gap-2 d-md-flex justify-content-md-center">
                          <button @click.prevent="toggleUpdateEvent(event.id)" class="btn btn-primary" type="button"><i class="bi bi-pen"></i></button>
                          <button @click.prevent="removeEvent(event.id)" class="btn btn-danger" type="button"><i class="bi bi-trash"></i></button>
                      </div>
                  </td>
              </tr>
          </tbody>
      </table>
    </transition>
  </div>
</template>

<script>
import UpdateEvent from './UpdateEvent'
import store from './EventsStore'
import Vuex from 'vuex'

export default {

  store: store,

  name: 'EventList',

  components: {
    UpdateEvent
  },

  data () {
    return {
      selectedId: ''
    }
  },

  mounted () {
    // j'appelle une actions qui va soit chercher dans le cache soit faire une nouvelle requette
    store.dispatch('eventOrCached')
  },

  computed: {
    ...Vuex.mapGetters([
      'hasEvents',
      'updateShowed'
    ]),
    eventList () {
      return store.state.eventList.items
    }
  },

  methods: {
    // je récupère mes actions depuis mon EventsStore
    ...Vuex.mapActions({
      getEventsStore: 'eventOrCached',
      removeEventStore: 'removeEvent'
    }),

    removeEvent: function (selectedId) {
      this.removeEventStore(selectedId)
    },

    toggleUpdateEvent: function (selectedId) {
      this.selectedId = selectedId
      if (this.updateShowed) {
        store.commit('hideUpdateEvent')
      } else {
        store.commit('showUpdateEvent')
      }
    }
  }
}
</script>

<style scoped>

</style>
