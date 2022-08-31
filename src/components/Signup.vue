<template>
  <div class="max-w-sm m-auto my-8">
    <div class="border p-10 border-grey-light shadow rounded">
      <h3 class="text-2xl mb-6 text-grey-darkest">Sign Up</h3>
      <form @submit.prevent="signup">
        <div class="text-red" v-if="error">{{ error }}</div>

        <div class="mb-6">
          <label for="email" class="label">E-mail Address</label>
          <input type="email" v-model="email" class="input" id="email" placeholder="andy@web-crunch.com">
        </div>

        <div class="mb-6">
          <label for="full_name" class="label">Full name</label>
          <input v-model="full_name" class="input" id="full_name" placeholder="Juan C.">
        </div>

        <div class="mb-6">
          <select v-model="color" class="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker
        py-3 px-4 pr-8  rounded leading-tight focus:outline-none focus:bg-white focus:border-grey" aria-label="colors">
            <option disabled value="">Select color</option>
            <option
              v-for="(color, index) in colors" :key="index" v-bind:value="color.color">
              {{ color.label }}
            </option>
          </select>
        </div>

        <div class="mb-6">
          <label for="password" class="label">Password</label>
          <input type="password" v-model="password" class="input" id="password" placeholder="Password">
        </div>

        <div class="mb-6">
          <label for="password_confirmation" class="label">Password Confirmation</label>
          <input type="password" v-model="password_confirmation" class="input" id="password_confirmation" placeholder="Password Confirmation">
        </div>
        <button type="submit" class="font-sans font-bold px-4 rounded cursor-pointer no-underline bg-green hover:bg-green-dark block w-full py-4 text-white items-center justify-center">Sign Up</button>

        <div class="my-4"><router-link to="/" class="link-grey">Sign In</router-link></div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Signup',
  data () {
    return {
      email: '',
      color: '',
      password: '',
      full_name: '',
      password_confirmation: '',
      colors: [
        { label: 'Red', color: '#F87D70' },
        { label: 'Green', color: '#BDF3DA' },
        { label: 'Light blue', color: '#BDEBF3' },
        { label: 'Pink', color: '#F2BDF3' }
      ],
      error: ''
    }
  },
  created () {
    this.checkSignedIn()
  },
  updated () {
    this.checkSignedIn()
  },
  methods: {
    signup () {
      this.$http.plain.post('/signup', { email: this.email, color: this.color, full_name: this.full_name, password: this.password, password_confirmation: this.password_confirmation })
        .then(response => this.signupSuccessful(response))
        .catch(error => this.signupFailed(error))
    },
    signupSuccessful (response) {
      if (!response.data.csrf) {
        this.signupFailed(response)
        return
      }
      this.$http.plain.get('/currentuser')
        .then(meResponse => {
          this.$store.commit('setCurrentUser', { currentUser: meResponse.data, csrf: response.data.csrf })
          this.error = ''
          this.$router.replace('/contracts')
        })
        .catch(error => this.signupFailed(error))
    },
    signupFailed (error) {
      this.error = (error.response && error.response.data && error.response.data.error) || 'Something went wrong'
      this.$store.commit('unsetCurrentUser')
    },
    checkSignedIn () {
      if (this.$store.state.signedIn) {
        this.$router.replace('/contracts')
      }
    }
  }
}
</script>
