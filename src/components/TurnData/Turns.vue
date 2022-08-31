<template>
  <div>
    <Week :title="turns"></Week>
    <div class="lex items-stretch bg-grey-lighter h-24">
      <div class="flex flex-wrap -mx-2 p-2">
        <div v-for="turn in turnsList" :key="turn.day" class="w-full sm:w-full md:w-1/3 lg:w-1/6 px-2 mb-4">
          <div  class="flex mb-2">
            <div class="w-full bg-grey p-2 text-center text-grey-lighter">{{ getDay(turns.period, turn.day) }}</div>
          </div>
          <div  v-for="record in turn.record" :key="record.time" class="flex mb-1">
            <div class="w-1/2 bg-grey-light p-4 text-center text-grey-darker">
              {{ showTime(record.time)}}
            </div>
            <div v-bind:style="classStyle(record)" class="w-1/2 bg-grey p-4 text-center text-grey-lighter">
              {{ record.user }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import Week from './Week.vue'
export default {
  name: 'Turns',
  components: {
    Week
  },
  data () {
    return {
      turnsList: [],
      turns: [],
      turnId: '',
      error: ''
    }
  },
  created () {
    if (!this.$store.state.signedIn) {
      this.$router.replace('/')
    } else {
      this.turnId = this.$route.query.id
      this.$http.secured.get('http://localhost:3000/api/v1/turns/shifts_available?id=' + this.turnId)
        .then(response => {
          this.turns = response.data.shift()
          this.turnsList = response.data
        })
        .catch(error => this.setError(error, 'Something went wrong'))
    }
  },
  methods: {
    classStyle (item) {
      if (item.user === '') return {'background-color': '#606f7b'}
      return {'background-color': item.color}
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
