<template>
  <div className="container">
    <div className="columns is-multiline">
      <div className="column is-12">
        <h1 className="title">My account</h1>
        <h2 class="subtitle">{{ $store.state.user.username }}</h2>
        <div class="column is-12">
          <div class="buttons">
            <router-link :to="{ name: 'EditMember', params: { id: $store.state.user.id }}" class="button is-light">Edit</router-link>
          </div>
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