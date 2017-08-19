<template>
  <div class="main-component">
    <!--<h1 class="mdc-typography- -display1">Temporary Drawer</h1>
    <p class="mdc-typography- -body1">{{text}}</p>-->
    <div class="main-form" v-if="!initialized" style="display:flex;justify-content:center;align-items:center;">
      <div class="main-form-inner">
        <ul class="mdc-list main-list">
          <li class="mdc-list-item">
            <button class="mdc-button mdc-button--accent mdc-button--raised main-form-button"
              @click="newMatch">
              Nuova partita
            </button>
          </li>
          <li class="mdc-list-item">
            <button class="mdc-button mdc-button--raised main-form-button"
              @click="legacyMatch">
              Partita precedente
            </button>
          </li>
        </ul>
      </div>
    </div>
    <div class="mdc-layout-grid main-grid" v-else>
      <div class="mdc-layout-grid__inner main-grid-inner">
        <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-9" style="display:flex;justify-content:center;align-items:center;">
          <div class="numbers-table-container">
            <numbers-table :extractedNumbers='extractedNumbers'/>
          </div>
        </div>
        <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-3" style="display:flex;justify-content:center;align-items:center;">
          <div>
            <ul class="mdc-list game-list">
              <li class="mdc-list-item">
                <button class="mdc-button mdc-button--accent mdc-button--raised game-form-button"
                  @click="extractNumber">
                  Pesca Numero
                </button>
              </li>
              <li class="mdc-list-item">
                <button class="mdc-button mdc-button--raised game-form-button"
                  @click="shuffleNumbers">
                  Mischia!
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
// import Loki from 'lokijs'

import 'csshake'

import $ from 'jquery'

import numbersTable from './table/NumbersTable.vue'

export default {
  name: 'main',
  data () {
    return {
      // text: 'Click the menu icon above to open.'
      initialized: false,
      extractedNumbers: [],
      remainingNumbers: []
    }
  },
  computed: {},
  methods: {
    newMatch: function () {
      this.extractedNumbers = []
      this.initialized = true
      var array = this.initArray()
      this.remainingNumbers = this.shuffle(array)
    },
    legacyMatch: function () {
      // TODO retrieve numbers from lokijs
      this.extractedNumbers = [22, 88]
      this.initialized = true
    },
    initArray: function () {
      var array = []
      for (var i = 1; i <= 90; i++) {
        array.push(i)
      }
      return array
    },
    shuffle: function (array) {
      // https://bost.ocks.org/mike/shuffle/
      var m = array.length, t, i
      // While there remain elements to shuffle…
      while (m) {
        // Pick a remaining element…
        i = Math.floor(Math.random() * m--)
        // And swap it with the current element.
        t = array[m]
        array[m] = array[i]
        array[i] = t
      }
      return array
    },
    extractNumber: function () {
      var index = Math.floor(Math.random() * this.remainingNumbers.length)
      var extracted = this.remainingNumbers.splice(index, 1)
      this.extractedNumbers.push(extracted[0])
    },
    shuffleNumbers: function () {
      this.remainingNumbers = this.shuffle(this.remainingNumbers)
      var table = $('.numbers-table-container')
      table.addClass('shake-slow shake-constant')
      setTimeout(function () {
        table.removeClass('shake-slow shake-constant')
      }, 1500)
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
  /*padding-top: 20%;*/
}
.main-form-button {
  margin: auto;
  width: 20%;
}
.game-form-button {
  margin: auto;
  width: 100%;
}
.main-form {
  height: 100%;
}
.main-form-inner {
  width: 100%;
}
.main-component {
  height: 100%;
}
.main-grid {
  height: 100%;
}
.main-grid-inner {
  height: 100%;
}
.numbers-table-container {
  width: 60%;
}

</style>
