<template>
    <ul class="mdc-grid-list__tiles">
      <li class="mdc-grid-tile">
        <div class="mdc-grid-tile__primary">
          <div class="mdc-grid-tile__primary-content tile-number">
            {{numbersArray[0]}}
          </div>
        </div>
      </li>
      <li class="mdc-grid-tile">
        <div class="mdc-grid-tile__primary">
          <div class="mdc-grid-tile__primary-content tile-number">
            {{numbersArray[1]}}
          </div>
        </div>
      </li>
      <li class="mdc-grid-tile">
        <div class="mdc-grid-tile__primary">
          <div class="mdc-grid-tile__primary-content tile-number">
            {{numbersArray[2]}}
          </div>
        </div>
      </li>
      <li class="mdc-grid-tile">
        <div class="mdc-grid-tile__primary">
          <div class="mdc-grid-tile__primary-content tile-number">
            {{numbersArray[3]}}
          </div>
        </div>
      </li>
      <li class="mdc-grid-tile">
        <div class="mdc-grid-tile__primary">
          <div class="mdc-grid-tile__primary-content tile-number">
            {{numbersArray[4]}}
          </div>
        </div>
      </li>
      <li class="mdc-grid-tile">
        <div class="mdc-grid-tile__primary">
          <div class="mdc-grid-tile__primary-content tile-number">
            {{numbersArray[5]}}
          </div>
        </div>
      </li>
      <li class="mdc-grid-tile">
        <div class="mdc-grid-tile__primary">
          <div class="mdc-grid-tile__primary-content tile-number">
            {{numbersArray[6]}}
          </div>
        </div>
      </li>
      <li class="mdc-grid-tile">
        <div class="mdc-grid-tile__primary">
          <div class="mdc-grid-tile__primary-content tile-number">
            {{numbersArray[7]}}
          </div>
        </div>
      </li>
      <li class="mdc-grid-tile">
        <div class="mdc-grid-tile__primary">
          <div class="mdc-grid-tile__primary-content tile-number">
            {{numbersArray[8]}}
          </div>
        </div>
      </li>
      <li class="mdc-grid-tile">
        <div class="mdc-grid-tile__primary">
          <div class="mdc-grid-tile__primary-content tile-number selected-tile-number">
            {{numbersArray[9]}}
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'numbersRow',
  props: [
    'numbersArray'
  ],
  data () {
    return {}
  },
  computed: {
  },
  methods: {},
  mounted () {},
  beforeDestroy () {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mdc-grid-tile {
  --mdc-grid-list-tile-width: 4%;
  border: 1px solid black;
  margin: 0px 2px;
  padding: 0px;
}
.selected-tile-number {
  /* TODO: SET THESE PROPERTIES FOR SELECTED NUMBERS */
  background-color: var(--mdc-theme-primary);
  color: var(--mdc-theme-text-primary-on-primary);
}
.tile-number {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 200%;
}
</style>
