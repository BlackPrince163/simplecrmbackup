<template>
  <nav class="navbar is-dark">
    <div class="navbar-brand">
      <router-link to="/" class="navbar-item">
        <strong>Ganar CRM</strong>
      </router-link>
    </div>
    <div class="navbar-menu">
      <div class="navbar-end">
        <router-link to="/dashboard/leads" class="navbar-item">Leads</router-link>
        <router-link to="/dashboard/clients" class="navbar-item">Clients</router-link>
        <router-link to="/dashboard/team" class="navbar-item">Teams</router-link>
        <div class="navbar-item">
          <div class="buttons">
            <template v-if="!$store.state.isAuthenticated">
              <router-link to="/sign-up" class="button is-success"><strong>Sign up</strong></router-link>
              <router-link to="/log-in" class="button is-light"><strong>Log in</strong></router-link>
            </template>

            <template v-else>
              <router-link to="/dashboard/my-account" class="button is-info">My account</router-link>
            </template>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar"
}
</script>

<style scoped>

</style>