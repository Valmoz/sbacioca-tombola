<template>
  <div class="main-component">
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
    <number-card v-show="showNumberCard" @close="closeCard"
      :extractedNumber="lastExtracted" :isSmorfiaEnabled="isSmorfiaEnabled"/>
    <div class="mdc-snackbar"
      aria-live="assertive"
      aria-atomic="true"
      aria-hidden="true">
      <div class="mdc-snackbar__text"></div>
      <div class="mdc-snackbar__action-wrapper">
        <button type="button" class="mdc-button mdc-snackbar__action-button"></button>
      </div>
    </div>
  </div>

</template>

<script>
import 'csshake'

import $ from 'jquery'

import 'fs'

import moment from 'moment'

import numbersTable from './table/NumbersTable.vue'

import numberCard from './numberCard/NumberCard.vue'

import { NumberChecker } from './numberChecker/NumberChecker.js'

import { MDCSnackbar } from '@material/snackbar'

export default {
  name: 'main',
  data () {
    return {
      // text: 'Click the menu icon above to open.'
      // OPTIONS
      isSmorfiaEnabled: false,
      checkTableWinnings: true,
      checkTicketsWinnings: true,
      // END OPTIONS
      matchStart: '',
      matchState: 'none',
      matchPhase: 0,
      currentMatch: {},
      initialized: false,
      extractedNumbers: [],
      remainingNumbers: [],
      showNumberCard: false,
      lastExtracted: 0,
      ticketState: [],
      snackbar: {},
      cardTimeout: {}
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
      var matches = this.$store.state.matches
      this.currentMatch = matches.insert(match)
      this.matchStart = timestamp
      this.matchState = 'open'
      this.matchPhase = 1
      this.initTickets()
      db.save()
    },
    legacyMatch: function () {
      var matches = this.$store.state.matches
      var lastMatch = matches.findOne({timestamp: this.matchStart})
      this.currentMatch = lastMatch
      this.extractedNumbers = lastMatch.extractedNumbers
      this.matchStart = lastMatch.timestamp
      this.matchState = lastMatch.state
      this.matchPhase = lastMatch.phase
      this.initTickets()
      this.prepareTickets(this.extractedNumbers)
      this.initialized = true
      var array = this.initLegacyArray(this.extractedNumbers)
      this.remainingNumbers = this.shuffle(array)
    },
    initTickets: function () {
      var tickets = this.$store.state.tickets
      var maxId = tickets.maxId
      var ticketState = []
      for (var i = 0; i < maxId; i++) {
        var ticket = tickets.get(i)
        if (ticket) {
          var array = ticket['array']
          if (this.isValidTicket(array)) {
            var ticketBody = {}
            ticketBody['name'] = ticket['name']
            ticketBody['array'] = array.map(Number)
            ticketBody['firstCount'] = 5
            ticketBody['secondCount'] = 5
            ticketBody['thirdCount'] = 5
            ticketBody['totalCount'] = 15
            ticketState.push(ticketBody)
          }
        }
      }
      this.ticketState = ticketState
    },
    prepareTickets: function (extracted) {
      this.ticketState = NumberChecker.prepareTickets(this.ticketState, extracted)
    },
    isValidTicket: function (ticket) {
      // A ticket must have a generic string name and a sequence of 15 numbers
      if (ticket.length !== 15) {
        return false
      }
      for (var i = 0; i < 15; i++) {
        var number = ticket[i]
        if (isNaN(number)) {
          return false
        }
      }
      return true
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
      var m = array.length
      var t
      var i
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
      var matches = this.$store.state.matches
      var self = this
      if (self.remainingNumbers.length > 0) {
        var index = Math.floor(Math.random() * self.remainingNumbers.length)
        var extracted = self.remainingNumbers.splice(index, 1)
        self.extractedNumbers.push(extracted[0])
        self.lastExtracted = extracted[0]

        self.currentMatch.extractedNumbers = self.extractedNumbers
        if (self.remainingNumbers.length === 0) {
          self.currentMatch.state = 'closed'
        }
        matches.update(self.currentMatch)
        db.save()
        self.showNumberCard = true
        self.cardTimeout = setTimeout(function () {
          self.closeAndCheck()
        }, 3000)
      }
    },
    closeCard: function () {
      clearTimeout(this.cardTimeout)
      this.closeAndCheck()
    },
    closeAndCheck: function () {
      this.showNumberCard = false
      this.checkTickets()
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
      // TODO SHOW DIALOG HERE https://material.io/components/web/catalog/dialogs/
      // USE THE SAME BUTTON TO MANAGE MATCH CLOSURE
      var db = this.$store.state.db
      var matches = this.$store.state.matches
      this.matchPhase = 2
      self.currentMatch.matchPhase = 2
      matches.update(self.currentMatch)
      db.save()
    },
    checkTickets: function () {
      var self = this

      // TODO MODIFY
      NumberChecker.updateTickets(self.ticketState, self.lastExtracted)

      if (self.matchPhase === 1) {
        var check = NumberChecker.checkTableCinquina(self.extractedNumbers, self.lastExtracted)
        if (check.result) {
          console.log('CINQUINA!!! Numbers: ' + check.numbers)
          var dataObj = {
            message: 'CINQUINA!!!',
            actionText: 'Vedi',
            actionHandler: function () {
              console.log('my cool function')
            }
          }
          self.snackbar.show(dataObj)
        } else {
          console.log('Left to cinquina: ' + check.missing)
        }
      } else {
        check = NumberChecker.checkTableTombola(self.extractedNumbers, self.lastExtracted)
        if (check.result) {
          console.log('TOMBOLA!!! Numbers: ' + check.numbers)
        } else {
          console.log('Left to tombola: ' + check.missing)
        }
      }
    }
  },
  mounted () {
    var self = this
    self.snackbar = new MDCSnackbar(document.querySelector('.mdc-snackbar'))
    var interval = setInterval(function () {
      var matches = self.$store.state.matches
      if (matches) {
        var count = matches.count()
        if (count > 0) {
          var lastMatch = matches.get(count)
          self.matchStart = lastMatch.timestamp
          self.matchState = lastMatch.state
          self.matchPhase = lastMatch.matchPhase
        }
        clearInterval(interval)
      }
    }, 1000)
  },
  beforeDestroy () {},
  components: {
    numbersTable,
    numberCard
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "@material/button/mdc-button";
@import "@material/list/mdc-list";
@import "@material/snackbar/mdc-snackbar";
@import "@material/layout-grid/mdc-layout-grid";
</style>

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
