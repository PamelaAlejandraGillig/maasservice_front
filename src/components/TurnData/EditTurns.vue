<template>
  <div>
    <div class="flex m-2">
      <div class="w-3/4 md:w-3/4 lg:w-1/6 text-start">
        <button @click="save()" class="bg-green hover:bg-green-light text-white font-bold py-2 px-4 rounded w-full">
          Save turns
        </button>
      </div>
    </div>
    <div class="lex items-stretch bg-grey-lighter h-24">
      <div class="flex flex-wrap -mx-2 p-2">
        <div v-for="turn in turnsList" :key="turn.day" class="w-full sm:w-full md:w-1/3 lg:w-1/6 px-2 mb-4">
          <div  class="flex mb-2">
            <div class="w-full bg-grey p-2 text-center text-grey-lighter">{{ getDay(turns.period, turn.day) }}</div>
          </div>
          <div v-for="record in turn.record" :key="record.time" class="flex mb-1">
            <div class="w-1/2 bg-grey-light p-4 text-center text-grey-darker">
              {{ showTime(record.time)}}
            </div>
            <div v-if="record.user != ''" v-bind:style="classStyle(record)" class="w-1/2 bg-grey p-4 text-center text-grey-lighter">
              {{ record.user }}
            </div>
            <div v-else  class="w-1/2 bg-grey p-4 text-center text-grey-lighter">
              <input v-model="checked"  :value="{time: record.time, day: turn.day}" name="active" type="checkbox">
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
      checked: [],
      active: [],
      turns: [],
      error: '',
      periodTime: '',
      turn_id: ''
    }
  },
  created () {
    if (!this.$store.state.signedIn) {
      this.$router.replace('/')
    } else {
      this.$http.secured.get('/api/v1/turns/shifts_available?id=' + this.$route.query.id)
        .then(response => {
          this.turns = response.data.shift()
          this.turnsList = response.data
          this.periodTime = this.turns.period
          this.turn_id = this.turns.id
        })
        .catch(error => this.setError(error, 'Something went wrong'))
    }
  },
  methods: {
    classStyle (item) {
      if (item.employee === '') return {'background-color': '#606f7b'}
      return {'background-color': item.color}
    },
    getDay (week, day) {
      let currentDate = day - 1
      return moment(week).add(currentDate, 'days').format('dddd D MMMM')
    },
    showTime (item) {
      let hour = item + 1
      return item + ':00' + ' - ' + hour + ':00'
    },
    getCheched () {
      let userId = this.$store.getters.currentUserId
      let values = this.checked
      let period = this.periodTime
      let id = this.turn_id

      let arr = values.map(function (element) {
        let currentDate = element.day - 1
        let hourComplete = element.time + 1
        let dateFrom = moment(period).hour(element.time).add(currentDate, 'days').format('YYYY-MM-D hh:mm')
        let dateEnd = moment(period).hour(hourComplete).add(currentDate, 'days').format('YYYY-MM-D hh:mm')

        return { user_id: userId, turn_id: id, date_from: dateFrom, date_end: dateEnd, total: 1 }
      })
      return arr
    },
    save () {
      let data = this.getCheched()
      this.$http.secured.post('/api/v1/registrations/create_massive', data)
        .then(response => this.saveSuccessful(response))
        .catch(error => this.setError(error, 'Something went wrong'))
    },
    saveSuccessful (response) {
      this.$router.push({name: 'Turns', query: { id: this.turn_id }})
    }
  }
}
</script>
