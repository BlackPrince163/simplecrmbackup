<template>
  <div className="container">
    <div className="columns is-multiline">
      <div className="column is-12">
        <h1 className="title">Clients</h1>

        <router-link
            to="/dashboard/clients/add"
            v-if="$store.state.team.max_clients > num_clients"
        >Add client</router-link>

        <div class="notification is-danger" v-else>
          You have reached the top of your limitations. Please upgrade!
        </div>

        <hr>

        <form @submit.prevent="submitForm">
          <div class="field has-addons">
            <div class="control">
              <input type="text" class="input" v-model="query">
            </div>
            <div class="control">
              <button class="button is-success">Search</button>
            </div>
          </div>
        </form>
      </div>
      <div class="column is-12">
        <div v-if="clients.length">
          <table class="table is-fullwidth">
            <thead>
            <tr>
              <th>Name</th>
              <th>Contact person</th>
              <th></th>
            </tr>
            </thead>

            <tbody>
            <tr v-for="client in clients"
                v-bind:key="client.id">
              <td>{{ client.name }}</td>
              <td>{{ client.contact_person }}</td>
              <td>
                <router-link :to="{ name: 'Client', params: {id: client.id}}">Details</router-link>
              </td>
            </tr>
            </tbody>
          </table>
          <div class="buttons">
            <button class="button is-light" v-if="showPreviousButton" @click="goToPreviousPage()">Previous</button>
            <button class="button is-light" v-if="showNextButton" @click="goToNextPage()">Next</button>
          </div>
        </div>
        <div v-else>
          <p>You don't have any clients yet...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Clients",
  data() {
    return {
      clients: [],
      showNextButton: false,
      showPreviousButton: false,
      currentPage: 1,
      query: '',
      num_clients: 0
    }
  },
  mounted() {
    this.getClients()
  },
  methods: {
    async goToNextPage() {
      this.currentPage += 1
      await this.getClients()
    },
    async goToPreviousPage() {
      this.currentPage -= 1
      await this.getClients()
    },
    async getClients() {
      this.$store.commit('setIsLoading', true)

      this.showNextButton = false
      this.showPreviousButton = false

      await axios
          .get(`/api/v1/clients/?page=${this.currentPage}&search=${this.query}`)
          .then(response => {
            this.num_clients = response.data.count
          })

      await axios
          .get(`/api/v1/clients/?page=${this.currentPage}&search=${this.query}`)
          .then(response => {
            this.clients = response.data.results

            if (response.data.next) {
              this.showNextButton = true
            }

            if (response.data.previous) {
              this.showPreviousButton = true
            }

          })
          .catch(error => {
            console.log(error)
          })

      this.$store.commit('setIsLoading', false)
    },
    submitForm() {
      this.getClients()
    }
  }
}
</script>

<style scoped>

</style>