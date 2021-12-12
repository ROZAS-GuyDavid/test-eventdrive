<template>
  <div class="event-list text-center">
    <p class="h2">Liste d'evenement :</p>
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
        <tbody v-for="event in eventList" :key ="event.id">
            <tr>
                <th scope="row">{{ event.id }}</th>
                <td>{{ event.name.en }}</td>
                <td>{{ event.start_date }}</td>
                <td>{{ event.end_date }}</td>
                <td>
                    <div class="d-grid gap-2 d-md-flex justify-content-md-center">
                        <button class="btn btn-primary" type="button"><i class="bi bi-pen"></i></button>
                        <button class="btn btn-primary" type="button"><i class="bi bi-trash"></i></button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
import store from './EventsStore'
import Vuex from 'vuex'

export default {

  store: store,

  name: 'EventList',

  mounted () {
    store.dispatch('eventCached')
  },

  computed: {
    ...Vuex.mapGetters([
      'hasEvents'
    ]),
    eventList () {
      return store.state.eventList.items
    }
  },

  methods: {
    // je récupère mes actions depuis mon EventsStore
    ...Vuex.mapActions([
      'eventCached'
    ])
  }
}
</script>

<style scoped>

</style>
