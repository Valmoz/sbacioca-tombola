<template>
<div class="load-component">
  <div class="file-input-container mdc-layout-grid">
    <div class="file-input mdc-layout-grid__inner">
      <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-1">
        <label class="mdc-fab material-icons file-input-fab" aria-label="File Input">
          <span class="mdc-fab__icon">
            file_upload
          </span>
          <input id="file-input-file" class="none" type="file" @change="upload"/>
        </label>
      </div>
      <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-10">
        <h1 class="mdc-typography--headline file-input-status">{{fileStatus}}</h1>
      </div>
      <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-1">
        <button class="mdc-fab mdc-fab--plain material-icons file-output-fab" aria-label="File Output"
          @click="download">
          <span class="mdc-fab__icon">
            file_download
          </span>
        </button>
      </div>
    </div>
  </div>
  <div class="loaded-tickets-container mdc-layout-grid">
    <div class="loaded-tickets-grid mdc-layout-grid__inner">
      <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-1"></div>
      <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-10">
        <loaded-tickets-table :loadedTickets="tickets"/>
      </div>
      <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-1"></div>
    </div>
  </div>
</div>
</template>

<script>
import {MDCRipple} from '@material/ripple'

import $ from 'jquery'

import moment from 'moment'

import Papa from 'papaparse'

import FileSaver from 'file-saver'

import loadedTicketsTable from './loadedTickets/LoadedTicketsTable.vue'

export default {
  name: 'load',
  data () {
    return {
      tickets: {},
      ticketsCollection: {},
      fileStatus: 'Carica un file...'
    }
  },
  computed: {},
  methods: {
    upload: function () {
      // var self = this
      // var files = event.target.files // FileList object
      // var reader = new FileReader()
      //
      // files is a FileList of File objects. List some properties.
      // var output = []
      // for (var i = 0; i < files.length; i++) {
      //   var f = files[i]
      //
      //   // Only process csv files.
      //   // JSON: application/json
      //   if (f.type !== 'text/csv') {
      //     continue
      //   }
      //
      //   // Closure to capture the file information.
      //   reader.onload = (function (theFile) {
      //     return function (e) {
      //       // Render thumbnail.
      //       self.content = Papa.parse(e.target.result)
      //     }
      //   })(f)
      //
      //   reader.readAsText(f)
      // }

      var self = this
      var fileInput = $('#file-input-file').get(0)
      var files = fileInput.files // FileList object

      // files is a FileList of File objects. List some properties.
      // var output = []
      for (var i = 0; i < files.length; i++) {
        var f = files[i]

        // Only process csv files.
        // JSON: application/json
        if (f.type !== 'text/csv') {
          continue
        }

        Papa.parse(f, {
          complete: function (results) {
            console.log(results)
            self.tickets = results.data
            self.saveTickets(results.data)
          }
        })
      }
    },
    download: function () {
      console.log(this.loadedFile)
      var timestamp = moment().format('YYYYMMDD')
      var csv = Papa.unparse(this.loadedFile)
      var blob = new Blob([csv], {type: 'text/csv;charset=utf-8'})
      var fileName = 'tombola_tickets_' + timestamp + '.csv'
      FileSaver.saveAs(blob, fileName)
    },
    loadCollection: function (colName, callback) {
      var db = this.$store.state.db
      console.log(db)
      console.log(colName)
      db.loadDatabase({}, function () {
        var _collection = db.getCollection(colName)

        if (!_collection) {
          console.log('Collection %s does not exist. Creating ...', colName)
          _collection = db.addCollection(colName)
        }

        callback(_collection)
      })
    },
    saveTickets: function (tickets) {
      var count = tickets.length

      for (var i = 0; i < count; i++) {
        var ticket = tickets[i]

        var dbTicket = {}

        dbTicket['name'] = ticket[0]
        dbTicket['array'] = ticket.slice(1)

        this.ticketsCollection.insert(dbTicket)
      }

      this.$store.state.db.save()
    }
  },
  mounted () {
    console.log('aaa')
    var self = this

    var fab = $('.file-input-fab').get(0)
    MDCRipple.attachTo(fab)

    this.loadCollection('tickets', function (tickets) {
      console.log('aab')
      console.log(tickets)
      self.ticketsCollection = tickets

      var loadedTickets = []

      var count = self.ticketsCollection.count()
      for (var i = 0; i < count; i++) {
        var ticket = self.ticketsCollection.get(i)
        var dbTicket = []
        dbTicket.push(ticket['name'])
        dbTicket.concat(ticket['array'])
        loadedTickets.push(dbTicket)
      }

      self.tickets = loadedTickets
    })
  },
  beforeDestroy () {},
  components: {
    loadedTicketsTable
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.none {
  display: none;
}
label span  {
  line-height: 56px;
}
.file-input-status {
  margin: 0;
}
</style>
