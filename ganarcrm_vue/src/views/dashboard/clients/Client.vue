<template>
  <div className="container">
    <div className="columns is-multiline">
      <div className="column is-12">
        <h1 class="title">{{ client.name }}</h1>
        <router-link :to="{ name: 'EditClient', params: { client: client.id }}" class="button is-light">Edit
        </router-link>
        <button @click="deleteClient" class="button is-danger">Delete</button>
      </div>
      <div class="column is-6">
        <div class="box">
          <h2 class="subtitle">Details</h2>
          <p><strong>Created at: </strong>{{ client.created_at }}</p>
          <p><strong>Modified at: </strong>{{ client.modified_at }}</p>
        </div>
      </div>

      <div class="column is-6">
        <div class="box">
          <h2 class="subtitle">Contact information</h2>

          <p><strong>Contact person: </strong>{{ client.contact_person }}</p>
          <p><strong>Email: </strong>{{ client.email }}</p>
          <p><strong>Phone: </strong>{{ client.phone }}</p>
          <p><strong>Website: </strong>{{ client.website }}</p>
        </div>
      </div>

      <hr>

      <div class="column is-12">
        <h2 class="subtitle">Notes</h2>
        <router-link :to="{ name: 'AddNote', params: { client: client.id }}" class="button is-success mb-6">Add Note
        </router-link>

        <div class="box" v-for="note in notes" :key="note.id">
          <h3 class="is-size-4">{{ note.name }}</h3>
          <p>{{ note.body }}</p>
          <router-link :to="{ name: 'EditNote', params: { client: client.id, note_id: note.id }}" class="button is-success mt-6">Edit Note
          </router-link>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import axios from "axios";
import {toast} from "bulma-toast";

export default {
  name: "Client",
  data() {
    return {
      client: {},
      notes: [],
    }
  },
  mounted() {
    this.getClient()
  },
  methods: {
    async deleteClient() {
      this.$store.commit('setIsLoading', true)

      const clientID = this.$route.params.id

      await axios
          .post(`api/v1/clients/delete_client/${clientID}/`)
          .then(response => {
            console.log(response.data)
            this.$router.push({'name': 'Clients'})
            toast({
              message: 'The client was deleted!',
              type: 'is-success',
              dismissible: true,
              pauseOnHover: true,
              duration: 2000,
              position: 'bottom-right',
            })
          })
          .catch(error => {
            console.log(error)
          })
      this.$store.commit('setIsLoading', false)
    },
    async getClient() {
      this.$store.commit('setIsLoading', true)

      const clientID = this.$route.params.id

      await axios
          .get(`api/v1/clients/${clientID}/`)
          .then(response => {
            this.client = response.data
          })
          .catch(error => {
            console.log(error)
          })

      await axios
          .get(`api/v1/notes/?client_id=${clientID}`)
          .then(response => {
            this.notes = response.data
          })
          .catch(error => {
            console.log(error)
          })

      this.$store.commit('setIsLoading', false)
    }
  }
}
</script>

<style scoped>

</style>