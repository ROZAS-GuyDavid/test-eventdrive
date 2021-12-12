<template>
  <div class="event-list text-center">
    <div class="row" v-if="updateShowed">
      <!-- TODO récupérer ma date de début et de fin et le passer au composant UpdateEvent -->
      <UpdateEvent v-bind:id="selectedId"/>
    </div>
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
                        <!-- TODO passer la clée à showUpdateEvent -->
                        <button @click.prevent="showUpdateEvent(1)" class="btn btn-primary" type="button"><i class="bi bi-pen"></i></button>
                        <button class="btn btn-primary" type="button"><i class="bi bi-trash"></i></button>
                    </div>
                </td>
            </tr>
        </tbody>

        <!-- Mon test   -->
        <!-- <tbody>
            <tr>
                <th scope="row">1</th>
                <td>Evenement test</td>
                <td>12/12/2021 00:00:00</td>
                <td>13/12/2021 00:00:00</td>
                <td>
                    <div class="d-grid gap-2 d-md-flex justify-content-md-center">
                        <button @click.prevent="showUpdateEvent(1)" class="btn btn-primary" type="button"><i class="bi bi-pen"></i></button>
                        <button class="btn btn-primary" type="button"><i class="bi bi-trash"></i></button>
                    </div>
                </td>
            </tr>
            <tr>
                <th scope="row">2</th>
                <td>Evenement test 2</td>
                <td>12/12/2021 00:00:00</td>
                <td>13/12/2021 00:00:00</td>
                <td>
                    <div class="d-grid gap-2 d-md-flex justify-content-md-center">
                        <button @click.prevent="showUpdateEvent(2)" class="btn btn-primary" type="button"><i class="bi bi-pen"></i></button>
                        <button class="btn btn-primary" type="button"><i class="bi bi-trash"></i></button>
                    </div>
                </td>
            </tr>
        </tbody> -->
    </table>
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
    // TODO à décomenter ne fois que l'api dev sera à nouveau utilisable
    // store.dispatch('eventCached')
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
    ...Vuex.mapActions([
      'eventCached'
    ]),

    showUpdateEvent: function (selectedId) {
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
