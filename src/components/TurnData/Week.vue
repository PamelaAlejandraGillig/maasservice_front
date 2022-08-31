<template>
  <div class="week">
    <div class="flex m-2">
      <div class="w-1/4 md:w-4/2 p-2 bg-grey text-grey-lighter">{{ title.name }}</div>
    </div>
    <div class="flex m-2">
      <div class="w-1/4 md:w-4/2 bg-grey p-2 text-start text-grey-lighter">{{ getWeek(title) }}</div>
    </div>
    <div class="flex m-2">
      <div class="w-1/4 md:w-4/2 bg-grey p-2 text-start text-grey-lighter">{{ weekDate(title.period) }}</div>
    </div>
    <div class="flex m-2">
      <div class="w-1/4 md:w-1/4 lg:w-1/4 text-start">
        <button @click="editTurn()" class="bg-green hover:bg-green-light text-white font-bold py-2 px-4 rounded w-full">
          Edit availability
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment/moment'

export default {
  name: 'Week',
  data () {
    return {
      turnId: ''
    }
  },
  props: ['title'],
  created () {
  },
  methods: {
    weekDate (value) {
      return 'Of ' + moment(value).format('D/M/YYYY') + ' to the ' + moment(value).add(7, 'days').format('D/M/YYYY')
    },
    getWeek (value) {
      this.turnId = value.id
      return 'Week ' + value.week + ' of ' + moment(value).format('YYYY')
    },
    editTurn () {
      this.$router.push({name: 'EditTurns', query: { id: this.turnId }})
    }
  }
}
</script>
