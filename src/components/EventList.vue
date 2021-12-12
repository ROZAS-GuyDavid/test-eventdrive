<template>
  <div class="event-list">
    <h2>Liste d'evenement :</h2>
    <table v-if="hasEvents">
        <thead>
            <tr>
                <th>Id</th>
                <th>Nom</th>
                <th>Date de début</th>
                <th>Date de fin</th>
            </tr>
        </thead>
        <tbody v-for="event in eventList" :key ="event.id">
            <tr>
                <td>{{ event.id }}</td>
                <td>{{ event.name.en }}</td>
                <td>{{ event.start_date }}</td>
                <td>{{ event.end_date }}</td>
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
