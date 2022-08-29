<template>
  <div class="flex mb-4">
    <div class="w-full min-w-full md:w-4/2 bg-grey p-4 text-center text-grey-lighter">{{ 'turns.turn.period' }}</div>
  </div>
</template>
<script>
import moment from 'moment/moment'

export default {
  name: 'Week',
  data () {
  },
  created () {
  },
  methods: {
    weekDate (value) {
      return 'del ' + moment(value).format('D/M/YYYY') + ' al ' + moment(value).add(7, 'days').format('D/M/YYYY')
    }
  }
}
</script>
