<template>
  <tbody class="flex flex-wrap">
  <div v-for="turn in turns" :key="turn.day" class="max-w-md m-auto py-10">
    <div class="flex mb-2">
      <div class="w-full bg-grey h-12 p-4 text-center text-grey-lighter">{{ getDay(turn.period, turn.day) }}</div>
    </div>
    <div v-for="record in turn.record" :key="record.time" class="flex mb-1">
      <div class="w-full min-w-full md:w-3/4 bg-grey-light p-4 text-center text-grey-darker">
        {{ showTime(record.time)}}
      </div>
      <div class="w-full min-w-full md:w-3/4 bg-grey p-4 text-center text-grey-lighter">
        {{ record.employee }}
      </div>
    </div>
  </div>
  </tbody>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import Week from './TurnData/Week.vue'
export default {
  name: 'Turns',
  components: {
    Week
  },
  data () {
    return {
      turns: [],
      error: ''
    }
  },
  created () {
    this.get_turns()
  },
  methods: {
    get_turns () {
      axios
        .get('http://localhost:3000/api/v1/turns/shifts_available?week=34&id=2')
        .then(response => {
          this.turns = response.data
        })
        .catch(error => this.setError(error, 'Something went wrong'))
    },
    getDay (week, day) {
      let currentDate = day - 1
      return moment(week).add(currentDate, 'days').format('dddd D MMMM')
    },
    showTime (item) {
      let hour = item + 1
      return item + ':00' + ' - ' + hour + ':00'
    }
  }
}
</script>
