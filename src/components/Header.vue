<template>
  <header class="bg-grey-lighter py-4">
    <div class="container m-auto flex flex-wrap items-center justify-end">
      <div class="sign-out float-right">
        <label @click="signOut">Sign out</label>
      </div>
    </div>
  </header>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Header',
  created () {
  },
  methods: {
    signOut () {
      axios
        .delete('http://localhost:3000/signin')
        .then(response => {
          delete localStorage.csrf
          delete localStorage.signedIn
          this.$router.replace('/')
        })
        .catch(error => this.setError(error, 'Cannot sign out'))
    }
  }
}
</script>
