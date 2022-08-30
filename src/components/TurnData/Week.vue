<template>
  <div class="flex mb-4">
    <div class="w-full min-w-full md:w-4/2 bg-grey p-4 text-center text-grey-lighter">{{ weekDate(title.period) }}</div>
  </div>
</template>
<script>
import moment from 'moment/moment'

export default {
  name: 'Week',
  data () {
  },
  props: ['title'],
  created () {
  },
  methods: {
    weekDate (value) {
      return 'del ' + moment(value).format('D/M/YYYY') + ' al ' + moment(value).add(7, 'days').format('D/M/YYYY')
    }
  }
}
</script>
