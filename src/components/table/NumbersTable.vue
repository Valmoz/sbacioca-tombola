<template>
  <div class="numbers-table mdc-grid-list mdc-grid-list--tile-aspect-1x1 mdc-grid-list--tile-gutter-8">
    <numbers-row :numbersArray="row1" :extractedNumbers='extractedNumbers'/>
    <numbers-row :numbersArray="row2" :extractedNumbers='extractedNumbers'/>
    <numbers-row :numbersArray="row3" :extractedNumbers='extractedNumbers'/>
    <numbers-row :numbersArray="row4" :extractedNumbers='extractedNumbers'/>
    <numbers-row :numbersArray="row5" :extractedNumbers='extractedNumbers'/>
    <numbers-row :numbersArray="row6" :extractedNumbers='extractedNumbers'/>
    <numbers-row :numbersArray="row7" :extractedNumbers='extractedNumbers'/>
    <numbers-row :numbersArray="row8" :extractedNumbers='extractedNumbers'/>
    <numbers-row :numbersArray="row9" :extractedNumbers='extractedNumbers'/>
  </div>
</template>

<script>
import numbersRow from './NumbersRow.vue'

export default {
  name: 'numbersTable',
  props: [
    'extractedNumbers'
  ],
  data () {
    return {
      row1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      row2: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
      row3: [21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
      row4: [31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
      row5: [41, 42, 43, 44, 45, 46, 47, 48, 49, 50],
      row6: [51, 52, 53, 54, 55, 56, 57, 58, 59, 60],
      row7: [61, 62, 63, 64, 65, 66, 67, 68, 69, 70],
      row8: [71, 72, 73, 74, 75, 76, 77, 78, 79, 80],
      row9: [81, 82, 83, 84, 85, 86, 87, 88, 89, 90]
    }
  },
  computed: {},
  methods: {},
  mounted () {

  },
  beforeDestroy () {},
  components: {
    numbersRow
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
