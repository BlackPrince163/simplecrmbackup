<template>
  <div className="container">
    <div className="columns is-multiline">
      <div className="column is-12">
        <h1 className="title">Add lead</h1>
      </div>

      <div className="column is-12">
        <form @submit.prevent="submitForm">
          <div class="field">
            <label>Company</label>
            <div class="control">
              <input type="text" class="input" v-model="company">
            </div>
          </div>

          <div class="field">
            <label>Contact person</label>
            <div class="control">
              <input type="text" class="input" v-model="contact_person">
            </div>
          </div>

          <div class="field">
            <label>Email</label>
            <div class="control">
              <input type="email" class="input" v-model="email">
            </div>
          </div>

          <div class="field">
            <label>Phone</label>
            <div class="control">
              <input type="text" class="input" v-model="phone">
            </div>
          </div>

          <div class="field">
            <label>Website</label>
            <div class="control">
              <input type="text" class="input" v-model="website">
            </div>
          </div>

          <div class="field">
            <label>Confidence</label>
            <div class="control">
              <input type="number" class="input" v-model="confidence">
            </div>
          </div>

          <div class="field">
            <label>Estimated value</label>
            <div class="control">
              <input type="number" class="input" v-model="estimated_value">
            </div>
          </div>

          <div class="field">
            <label>Status</label>
            <div class="control">
              <div class="select">
                <select v-model="status">
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="inprogress">In progress</option>
                  <option value="lost">Lost</option>
                  <option value="won">Won</option>
                </select>
              </div>
            </div>
          </div>

          <div class="field">
            <label>Priority</label>
            <div class="control">
              <div class="select">
                <select v-model="priority">
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
          </div>

          <div class="field">
            <div class="control">
              <button class="button is-success">Submit</button>
            </div>
          </div>

        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {toast} from "bulma-toast";

export default {
  name: "AddLead",
  data() {
    return {
      company: "",
      contact_person: "",
      email: "",
      phone: "",
      website: "",
      status: "new",
      priority: "low",
      estimated_value: 0,
      confidence: 0

    }
  },
  methods: {
    async submitForm() {
      this.$store.commit('setIsLoading', true)

      console.log('submit form')
      const lead = {
        company: this.company,
        contact_person: this.contact_person,
        email: this.email,
        phone: this.phone,
        website: this.website,
        status: this.status,
        priority: this.priority,
        estimated_value: this.estimated_value,
        confidence: this.confidence,
      }
      await axios
          .post('api/v1/leads/', lead)
          .then(response => {
            toast({
              message: 'The lead was added',
              type: 'is-success',
              dismissible: true,
              pauseOnHover: true,
              duration: 2000,
              position: 'bottom-right',
            })
            this.$router.push('/dashboard/leads')
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