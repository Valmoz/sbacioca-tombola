<template>
<div class="load-component">
  <div class="file-input-container mdc-layout-grid">
    <div class="file-input mdc-layout-grid__inner">
      <div class="mdc-layout-grid__cell"
        v-bind:class="[ isLoaded ? 'mdc-layout-grid__cell--span-4' : 'mdc-layout-grid__cell--span-12' ]">
        <label class="mdc-button mdc-button--raised file-input-button" aria-label="File Input">
          <div class="material-icons label-icon">
            file_upload
          </div>
          <div>
            Carica le cartelle
          </div>
          <input id="file-input-file" class="none" type="file" @change="upload"/>
        </label>
      </div>
      <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-4" v-if="isLoaded">
        <label class="mdc-button mdc-button--raised file-input-button" aria-label="File Ouput"
          @click="download">
          <div class="material-icons label-icon">
            file_download
          </div>
          <div>
            Salva le cartelle su CSV
          </div>
        </label>
      </div>
      <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-4" v-if="isLoaded">
        <label class="mdc-button mdc-button--raised file-delete-button" aria-label="File Delete"
          @click="deleteColl">
          <div class="material-icons label-icon">
            delete
          </div>
          <div>
            Cancella le cartelle
          </div>
        </label>
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
// import {MDCRipple} from '@material/ripple'

import $ from 'jquery'

import moment from 'moment'

import Papa from 'papaparse'

import FileSaver from 'file-saver'

import loadedTicketsTable from './loadedTickets/LoadedTicketsTable.vue'

export default {
  name: 'load',
  data () {
    return {
      tickets: [],
      fileStatus: 'Carica un file...'
    }
  },
  computed: {
    isLoaded: function () {
      return this.tickets.length > 0
    }
  },
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
            self.tickets = results.data
            self.saveTickets(results.data)
          }
        })
      }
    },
    download: function () {
      var timestamp = moment().format('YYYYMMDD')
      var csv = Papa.unparse(this.tickets)
      var blob = new Blob([csv], {type: 'text/csv;charset=utf-8'})
      var fileName = 'tombola_tickets_' + timestamp + '.csv'
      FileSaver.saveAs(blob, fileName)
    },
    deleteColl: function () {
      var db = this.$store.state.db
      var collection = this.$store.state.tickets
      this.tickets = []
      collection.clear()
      db.save()
      $('#file-input-file').val('')
    },
    saveTickets: function (tickets) {
      var db = this.$store.state.db
      var collection = this.$store.state.tickets
      collection.clear()
      db.save()
      var count = tickets.length
      for (var i = 0; i < count; i++) {
        var ticket = tickets[i]
        var dbTicket = {}

        dbTicket['name'] = ticket[0]
        dbTicket['array'] = ticket.slice(1)

        collection.insert(dbTicket)
      }
      db.save()
    }
  },
  mounted () {
    var self = this

    // var fab = $('.file-input-fab').get(0)
    // MDCRipple.attachTo(fab)

    var interval = setInterval(function () {
      var collection = self.$store.state.tickets
      if (collection) {
        var loadedTickets = []

        var count = collection.count()
        var content = collection.data
        for (var i = 0; i < count; i++) {
          var ticket = content[i]
          var dbTicket = [ticket['name']].concat(ticket['array'])
          loadedTickets.push(dbTicket)
        }

        self.tickets = loadedTickets
        clearInterval(interval)
      }
    }, 1000)

    // this.loadCollection('tickets', function (tickets) {
    //   console.log('aab')
    //   console.log(tickets)
    //   self.ticketsCollection = tickets
    //
    //   var loadedTickets = []
    //
    //   var count = self.ticketsCollection.count()
    //   for (var i = 0; i < count; i++) {
    //     var ticket = self.ticketsCollection.get(i)
    //     var dbTicket = []
    //     dbTicket.push(ticket['name'])
    //     dbTicket.concat(ticket['array'])
    //     loadedTickets.push(dbTicket)
    //   }
    //
    //   self.tickets = loadedTickets
    // })
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
span {
  display: inline-block;
}
.mdc-button {
  width: 270px;
}
div.label-icon {
  line-height: 38px;
  float: left;
}
.mdc-button {
  height: 38px;
  margin-left: auto;
  margin-right: auto;
  display: table;
}
.load-component {
  width: 100%;
  display: table;
}
</style>
