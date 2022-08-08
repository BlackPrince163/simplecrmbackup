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
                <div v-if="lead.assigned_to">{{ lead.assigned_to.username }}</div>
              </td>
              <td>{{ lead.status }}</td>
              <td><router-link :to="{ name: 'Lead', params: {id: lead.id}}">Details</router-link></td>

            </tr>
          </tbody>
        </table>
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
      leads: []
    }
  },
  mounted() {
    this.getLeads()
  },
  methods: {
    async getLeads() {
      this.$store.commit('setIsLoading', true)

      await axios
          .get('/api/v1/leads/')
          .then(response => {
            this.leads = response.data
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