<template>
  <div className="container">
    <div className="columns is-multiline">
      <div className="column is-12">
        <h1 className="title">My account</h1>

        <div class="column is-12">
          <button @click="logout()" class="button is-danger">Log out</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "MyAccount",
  methods: {
    async logout() {
      await axios
          .post('/api/v1/token/logout')
          .then(response => {
            console.log('Logged out')
          })
          .catch(error => {
            console.log(JSON.stringify(error))
          })
      axios.defaults.headers.common['Authorization'] = ''
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      localStorage.removeItem('userid')
      localStorage.removeItem('team_name')
      localStorage.removeItem('team_id')
      this.$store.commit('removeToken')

      this.$router.push('/')
    }
  }
}
</script>

<style scoped>

</style>