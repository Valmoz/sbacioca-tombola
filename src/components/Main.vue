<template>
  <div class="main-component">
    <!--<h1 class="mdc-typography- -display1">Temporary Drawer</h1>
    <p class="mdc-typography- -body1">{{text}}</p>-->
    <ul class="mdc-list main-list" v-if="!initialized">
      <li class="mdc-list-item">
        <button class="mdc-button mdc-button--accent mdc-button--raised main-form-button"
          @click="newMatch">
          Nuova partita
        </button>
      </li>
      <li class="mdc-list-item">
        <button class="mdc-button mdc-button--raised main-form-button">
          Partita precedente
        </button>
      </li>
    </ul>
    <numbers-table v-else/>
  </div>

</template>

<script>
// import Loki from 'lokijs'

import numbersTable from './table/NumbersTable.vue'

export default {
  name: 'main',
  data () {
    return {
      // text: 'Click the menu icon above to open.'
      initialized: false
    }
  },
  computed: {},
  methods: {
    newMatch: function () {
      this.initialized = true
    }
  },
  mounted () {
    // var db = new Loki('loki.json')
    // var children = db.addCollection('children')
    // children.insert({name: 'Neja', age: 21})
    // this.$store.commit('textLoaded', children.find({'name': 'Neja'}))
    // this.text = this.$store.state.text[0].name
  },
  beforeDestroy () {
  },
  components: {
    numbersTable
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main-list {
  padding-top: 20%;
}
.main-form-button {
  margin: auto;
  width: 20%;
}

</style>
