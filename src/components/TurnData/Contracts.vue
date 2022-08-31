<template>
  <div class="max-w-sm m-auto my-8">
    <div class="border p-10 border-grey-light shadow rounded">
      <div class="mb-6">
        <select v-model="selectedCompany" @change="selectContracts()" class="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker
        py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-grey" aria-label="companies">
          <option disabled value="">Select a company</option>
          <option
            v-for="(company, index) in companies" :key="index" v-bind:value="company.id">
            {{ company.name }}
          </option>
        </select>
      </div>
      <div class="mb-6">
        <select v-model="selectedContract" @change="selectTurns()" class="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker
        py-3 px-4 pr-8  rounded leading-tight focus:outline-none focus:bg-white focus:border-grey" aria-label="companies">
          <option disabled value="">Select a contract</option>
          <option
            v-for="(contract, index) in contracts" :key="index" v-bind:value="contract.id">
            {{ contract.name }}
          </option>
        </select>
      </div>
      <div class="mb-6">
        <select v-model="selectedTurn"  class="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker
        py-3 px-4 pr-8  rounded leading-tight focus:outline-none focus:bg-white focus:border-grey" aria-label="companies">
          <option disabled value="">Select the week shift</option>
          <option
            v-for="(turn, index) in turns" :key="index" :value="turn.id">
            {{ turn.week }}
          </option>
        </select>
      </div>
      <button @click="goToTurns()" class="font-sans font-bold px-4 rounded cursor-pointer no-underline bg-green
      hover:bg-green-dark block w-full py-4 text-white items-center justify-center">Buscar</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Turns',
  data () {
    return {
      selectedCompany: '',
      selectedContract: '',
      selectedTurn: '',
      companies: [],
      contracts: [],
      turns: [],
      error: ''
    }
  },
  created () {
    if (!this.$store.state.signedIn) {
      this.$router.replace('/')
    } else {
      this.$http.secured.get('http://localhost:3000/api/v1/companies')
        .then(response => {
          this.companies = response.data
        })
        .catch(error => { this.setError(error, 'Something went wrong') })
    }
  },
  methods: {
    selectContracts () {
      axios
        .get('http://localhost:3000/api/v1/contracts?company_id=' + this.selectedCompany)
        .then(response => {
          this.contracts = response.data
        })
        .catch(error => this.setError(error, 'Something went wrong'))
    },
    selectTurns () {
      axios
        .get('http://localhost:3000/api/v1/turns/get_turns?id=' + this.selectedContract)
        .then(response => {
          this.turns = response.data
        })
        .catch(error => this.setError(error, 'Something went wrong'))
    },
    goToTurns () {
      this.$router.push({name: 'Turns', query: { id: this.selectedTurn }})
    }
  }
}
</script>
