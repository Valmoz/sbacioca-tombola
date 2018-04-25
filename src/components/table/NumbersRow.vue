<template>
<ul class="mdc-grid-list__tiles numbers-row">
  <li class="mdc-grid-tile">
    <div class="mdc-grid-tile__primary">
      <div class="mdc-grid-tile__primary-content tile-number mdc-typography"
        v-bind:class="{'mdc-theme--primary-bg mdc-theme--on-primary extracted-tile-number' : isExtracted(numbersArray[0])}">
        {{numbersArray[0]}}
      </div>
    </div>
  </li>
  <li class="mdc-grid-tile">
    <div class="mdc-grid-tile__primary">
      <div class="mdc-grid-tile__primary-content tile-number mdc-typography"
        v-bind:class="{'mdc-theme--primary-bg mdc-theme--on-primary extracted-tile-number' : isExtracted(numbersArray[1])}">
        {{numbersArray[1]}}
      </div>
    </div>
  </li>
  <li class="mdc-grid-tile">
    <div class="mdc-grid-tile__primary">
      <div class="mdc-grid-tile__primary-content tile-number mdc-typography"
        v-bind:class="{'mdc-theme--primary-bg mdc-theme--on-primary extracted-tile-number' : isExtracted(numbersArray[2])}">
        {{numbersArray[2]}}
      </div>
    </div>
  </li>
  <li class="mdc-grid-tile">
    <div class="mdc-grid-tile__primary">
      <div class="mdc-grid-tile__primary-content tile-number mdc-typography"
        v-bind:class="{'mdc-theme--primary-bg mdc-theme--on-primary extracted-tile-number' : isExtracted(numbersArray[3])}">
        {{numbersArray[3]}}
      </div>
    </div>
  </li>
  <li class="mdc-grid-tile">
    <div class="mdc-grid-tile__primary">
      <div class="mdc-grid-tile__primary-content tile-number mdc-typography"
        v-bind:class="{'mdc-theme--primary-bg mdc-theme--on-primary extracted-tile-number' : isExtracted(numbersArray[4])}">
        {{numbersArray[4]}}
      </div>
    </div>
  </li>
  <li class="mdc-grid-tile">
    <div class="mdc-grid-tile__primary">
      <div class="mdc-grid-tile__primary-content tile-number mdc-typography"
        v-bind:class="{'mdc-theme--primary-bg mdc-theme--on-primary extracted-tile-number' : isExtracted(numbersArray[5])}">
        {{numbersArray[5]}}
      </div>
    </div>
  </li>
  <li class="mdc-grid-tile">
    <div class="mdc-grid-tile__primary">
      <div class="mdc-grid-tile__primary-content tile-number mdc-typography"
        v-bind:class="{'mdc-theme--primary-bg mdc-theme--on-primary extracted-tile-number' : isExtracted(numbersArray[6])}">
        {{numbersArray[6]}}
      </div>
    </div>
  </li>
  <li class="mdc-grid-tile">
    <div class="mdc-grid-tile__primary">
      <div class="mdc-grid-tile__primary-content tile-number mdc-typography"
        v-bind:class="{'mdc-theme--primary-bg mdc-theme--on-primary extracted-tile-number' : isExtracted(numbersArray[7])}">
        {{numbersArray[7]}}
      </div>
    </div>
  </li>
  <li class="mdc-grid-tile">
    <div class="mdc-grid-tile__primary">
      <div class="mdc-grid-tile__primary-content tile-number mdc-typography"
        v-bind:class="{'mdc-theme--primary-bg mdc-theme--on-primary extracted-tile-number' : isExtracted(numbersArray[8])}">
        {{numbersArray[8]}}
      </div>
    </div>
  </li>
  <li class="mdc-grid-tile">
    <div class="mdc-grid-tile__primary">
      <div class="mdc-grid-tile__primary-content tile-number mdc-typography"
        v-bind:class="{'mdc-theme--primary-bg mdc-theme--on-primary extracted-tile-number' : isExtracted(numbersArray[9])}">
        {{numbersArray[9]}}
      </div>
    </div>
  </li>
</ul>
</template>

<script>
export default {
  name: 'numbersRow',
  props: [
    'numbersArray',
    'extractedNumbers'
  ],
  data () {
    return {}
  },
  computed: {
  },
  methods: {
    isExtracted: function (number) {
      return this.extractedNumbers.includes(number)
    }
  },
  mounted () {},
  beforeDestroy () {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "@material/grid-list/mdc-grid-list";
@import "@material/theme/mdc-theme";
@import "@material/typography/mdc-typography";
</style>

<style scoped>
.mdc-grid-tile {
  --mdc-grid-list-tile-width: 9%;
  border: 1px solid black;
  margin: 0px 2px;
  padding: 0px;
}
.tile-number {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 200%;
}
.numbers-row {
  margin-left: auto;
  margin-right: auto;
}
</style>
