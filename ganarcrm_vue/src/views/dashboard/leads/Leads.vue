<template>
  <div className="container">
    <div className="columns is-multiline">
      <div className="column is-12">
        <h1 className="title">Leads</h1>
        
        <router-link to="/dashboard/leads/add">Add lead</router-link>

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
        <table class="table is-fullwidth">
          <thead>
            <tr>
              <th>Company</th>
              <th>Contact person</th>
              <th>Assigned to</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="lead in leads"
            v-bind:key="leads.id">
              <td>{{ lead.company }}</td>
              <td>{{ lead.contact_person }}</td>
              <td>
                <div v-if="lead.assigned_to">{{ lead.assigned_to.first_name }} {{ lead.assigned_to.last_name }}</div>
              </td>
              <td>{{ lead.status }}</td>
              <td><router-link :to="{ name: 'Lead', params: {id: lead.id}}">Details</router-link></td>

            </tr>
          </tbody>
        </table>
        <div class="buttons">
          <button class="button is-light" v-if="showPreviousButton" @click="goToPreviousPage()">Previous</button>
          <button class="button is-light" v-if="showNextButton" @click="goToNextPage()">Next</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Leads",
  data() {
    return {
      leads: [],
      showNextButton: false,
      showPreviousButton: false,
      currentPage: 1,
      query: '',
    }
  },
  mounted() {
    this.getLeads()
  },
  methods: {
    async goToNextPage() {
      this.currentPage += 1
      await this.getLeads()
    },
    async goToPreviousPage() {
      this.currentPage -= 1
      await this.getLeads()
    },
    async getLeads() {
      this.$store.commit('setIsLoading', true)

      this.showNextButton = false
      this.showPreviousButton = false

      await axios
          .get(`/api/v1/leads/?page=${this.currentPage}&search=${this.query}`)
          .then(response => {
            console.log(response.data)
            this.leads = response.data.results

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
      this.getLeads()
    }
  }
}
</script>

<style scoped>

</style>