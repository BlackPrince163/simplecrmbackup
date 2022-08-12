<template>
  <div className="container">
    <div className="columns is-multiline">
      <div className="column is-12">
        <h1 className="title">Leads</h1>
        
        <router-link to="/dashboard/leads/add">Add link</router-link>
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
    }
  },
  mounted() {
    this.getLeads()
  },
  methods: {
    async goToNextPage() {
      this.currentPage += 1
      this.getLeads()
    },
    async goToPreviousPage() {
      this.currentPage -= 1
      this.getLeads()
    },
    async getLeads() {
      this.$store.commit('setIsLoading', true)

      this.showNextButton = false
      this.showPreviousButton = false

      await axios
          .get(`/api/v1/leads/?page=${this.currentPage}`)
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
    }
  }
}
</script>

<style scoped>

</style>