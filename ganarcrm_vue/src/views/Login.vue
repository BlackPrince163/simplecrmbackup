<template>
  <div className="container">
    <div className="columns">
      <div className="column is-4 is-offset-4">
        <h1 className="title">Log in</h1>

        <form action="">
          <div className="field">
            <label>Email</label>
            <div className="control">
              <input type="email" name="email" className="input">
            </div>
          </div>
          <div className="field">
            <label>Password</label>
            <div className="control">
              <input type="password" name="password" className="input">
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button className="button is-success">Submit</button>
            </div>
          </div>

        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignUp"
}
</script>

<style scoped>

</style>