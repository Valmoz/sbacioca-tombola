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
              @click="legacyMatch" v-bind:disabled="isLegacyDisabled">
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
              <li class="mdc-list-item">
                <button class="mdc-button game-form-button"
                  @click="switchPhase">
                  Passa alle Tombole
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <number-card v-show="showNumberCard" :extractedNumber="lastExtracted" :isSmorfiaEnabled="isSmorfiaEnabled"/>
  </div>

</template>

<script>
import Loki from 'lokijs'

import 'csshake'

import $ from 'jquery'

import 'fs'

import moment from 'moment'

import numbersTable from './table/NumbersTable.vue'

import numberCard from './numberCard/NumberCard.vue'

import { NumberChecker } from './numberChecker/NumberChecker.js'

export default {
  name: 'main',
  data () {
    return {
      // text: 'Click the menu icon above to open.'
      // OPTIONS
      isSmorfiaEnabled: false,
      checkTableWinnings: true,
      // END OPTIONS
      matches: {},
      matchStart: '',
      matchState: 'none',
      matchPhase: 0,
      currentMatch: {},
      initialized: false,
      extractedNumbers: [],
      remainingNumbers: [],
      showNumberCard: false,
      lastExtracted: 0
    }
  },
  computed: {
    isLegacyDisabled: function () {
      if (this.matchStart === '' || this.matchState !== 'open') {
        return true
      }
      return false
    }
  },
  methods: {
    newMatch: function () {
      // this.matches = this.db.getCollection('matches')
      var db = this.$store.state.db
      this.extractedNumbers = []
      this.initialized = true
      var array = this.initArray()
      this.remainingNumbers = this.shuffle(array)
      var match = {}
      match['extractedNumbers'] = []
      var timestamp = moment().format('YYYYMMDD-HHmmss')
      var date = moment().format('DD/MM/YYYY - HH:mm:ss')
      match['timestamp'] = timestamp
      match['date'] = date
      match['state'] = 'open'
      match['phase'] = 1
      this.currentMatch = this.matches.insert(match)
      this.matchStart = timestamp
      this.matchState = 'open'
      this.matchPhase = 1
      db.save()
    },
    legacyMatch: function () {
      var lastMatch = this.matches.findOne({timestamp: this.matchStart})
      this.currentMatch = lastMatch
      this.extractedNumbers = lastMatch.extractedNumbers
      this.initialized = true
      var array = this.initLegacyArray(this.extractedNumbers)
      this.remainingNumbers = this.shuffle(array)
    },
    initArray: function () {
      var array = []
      for (var i = 1; i <= 90; i++) {
        array.push(i)
      }
      return array
    },
    initLegacyArray: function (extractedNumbers) {
      var array = []
      for (var i = 1; i <= 90; i++) {
        if (!extractedNumbers.includes(i)) {
          array.push(i)
        }
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
      var db = this.$store.state.db
      var self = this
      if (self.remainingNumbers.length > 0) {
        var index = Math.floor(Math.random() * self.remainingNumbers.length)
        var extracted = self.remainingNumbers.splice(index, 1)
        self.extractedNumbers.push(extracted[0])
        self.lastExtracted = extracted[0]

        if (self.matchPhase === 1) {
          var check = NumberChecker.checkTableCinquina(self.extractedNumbers, self.lastExtracted)
          if (check.result) {
            console.log('CINQUINA!!! Numbers: ' + check.numbers)
          }
          else {
            console.log('Left to cinquina: ' + check.missing)
          }
        }
        else {
          check = NumberChecker.checkTableTombola(self.extractedNumbers, self.lastExtracted)
          if (check.result) {
            console.log('TOMBOLA!!! Numbers: ' + check.numbers)
          }
          else {
            console.log('Left to tombola: ' + check.missing)
          }
        }

        self.currentMatch.extractedNumbers = self.extractedNumbers
        if (self.remainingNumbers.length === 0) {
          self.currentMatch.state = 'closed'
        }
        self.matches.update(self.currentMatch)
        db.save()
        self.showNumberCard = true
        setTimeout(function () {
          self.showNumberCard = false
        }, 3000)
      }
    },
    shuffleNumbers: function () {
      this.remainingNumbers = this.shuffle(this.remainingNumbers)
      var table = $('.numbers-table-container')
      table.addClass('shake-slow shake-constant')
      setTimeout(function () {
        table.removeClass('shake-slow shake-constant')
      }, 1500)
    },
    switchPhase: function () {
      // SHOW DIALOG HERE https://material.io/components/web/catalog/dialogs/
      // USE THE SAME BUTTON TO MANAGE MATCH CLOSURE
      var db = this.$store.state.db
      this.matchPhase = 2
      self.currentMatch.matchPhase = 2
      self.matches.update(self.currentMatch)
      db.save()
    },
    databaseInitialize: function () {
      var self = this
      this.loadCollection('matches', function (matches) {
        self.matches = matches
        var count = self.matches.count()
        if (count > 0) {
          var lastMatch = self.matches.get(count)
          self.matchStart = lastMatch.timestamp
          self.matchState = lastMatch.state
          self.matchPhase = lastMatch.matchPhase
        }
      })
    },
    loadCollection: function (colName, callback) {
      var db = this.$store.state.db
      db.loadDatabase({}, function () {
        var _collection = db.getCollection(colName)

        if (!_collection) {
          console.log('Collection %s does not exist. Creating ...', colName)
          _collection = db.addCollection(colName)
        }

        callback(_collection)
      })
    }
  },
  mounted () {
    var self = this
    // var idbAdapter = new LokiIndexedAdapter()
    var db = new Loki('sbacioca.json', {
    })
    this.$store.commit('dbInitialized', db)
    var proto = Object.getPrototypeOf(db)
    var LokiIndexedAdapter = proto.getIndexedAdapter()
    var idbAdapter = new LokiIndexedAdapter('sbacioca')
    db.persistenceAdapter = idbAdapter

    self.databaseInitialize()

    // var children = db.addCollection('children')
    // children.insert({name: 'Neja', age: 21})
    // this.$store.commit('textLoaded', children.find({'name': 'Neja'}))
    // this.text = this.$store.state.text[0].name
  },
  beforeDestroy () {
  },
  components: {
    numbersTable,
    numberCard
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
