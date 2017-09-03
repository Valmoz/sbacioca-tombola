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
        <label class="mdc-fab material-icons file-output-fab" aria-label="File Output">
          <span class="mdc-fab__icon">
            file_download
          </span>
          <!-- <input id="file-input-file" class="none" type="file" @change="upload"/> -->
        </label>
      </div>
    </div>
  </div>
  <div class="loaded-tickets-container mdc-layout-grid">
    <div class="loaded-tickets-grid mdc-layout-grid__inner">
      <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-1"></div>
      <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-10">
        <loaded-tickets-table :loadedTickets="loadedFile"/>
      </div>
      <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-1"></div>
    </div>
  </div>
</div>
</template>

<script>
import {MDCRipple} from '@material/ripple'

import $ from 'jquery'

import Papa from 'papaparse'

import loadedTicketsTable from './loadedTickets/LoadedTicketsTable.vue'

export default {
  name: 'load',
  data () {
    return {
      loadedFile: null,
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
            self.loadedFile = results.data
          }
        })
      }
    }
  },
  mounted () {
    var fab = $('.file-input-fab').get(0)
    MDCRipple.attachTo(fab)
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
