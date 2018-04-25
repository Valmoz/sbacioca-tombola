<template>
  <!-- Don't drop "app" class -->
  <div id="app">
    <div class="mdc-toolbar mdc-toolbar--fixed">
      <div class="mdc-toolbar__row">
        <section class="mdc-toolbar__section mdc-toolbar__section--align-start">
          <button class="app-menu material-icons mdc-toolbar__menu-icon">menu</button>
          <span class="mdc-toolbar__title catalog-title">Sbacioca! Tombola</span>
        </section>
      </div>
    </div>

    <aside class="mdc-drawer mdc-drawer--temporary mdc-typography">
      <nav class="mdc-drawer__drawer">
        <header class="mdc-drawer__header">
          <div class="mdc-drawer__header-content mdc-theme--primary-bg mdc-theme--on-primary">
            Sbacioca! Tombola
          </div>
        </header>
        <nav class="mdc-drawer__content mdc-list-group">
          <div class="mdc-list">
            <a class="mdc-list-item" href="#"  @click="mainNav($event)"
              v-bind:class="{ 'mdc-list-item--selected': isMain }">
              <i class="material-icons mdc-list-item__graphic" aria-hidden="true">bubble_chart</i>Gioca
            </a>
            <a class="mdc-list-item" href="#" @click="historyNav($event)"
              v-bind:class="{ 'mdc-list-item--selected': isHistory }">
              <i class="material-icons mdc-list-item__graphic" aria-hidden="true">history</i>Storico
            </a>
          </div>

          <hr class="mdc-list-divider">

          <div class="mdc-list">
            <a class="mdc-list-item" href="#" @click="settingsNav($event)"
              v-bind:class="{ 'mdc-list-item--selected': isSettings }">
              <i class="material-icons mdc-list-item__graphic" aria-hidden="true">settings</i>Impostazioni
            </a>
            <a class="mdc-list-item" href="#" @click="loadNav($event)"
              v-bind:class="{ 'mdc-list-item--selected': isLoad }">
              <i class="material-icons mdc-list-item__graphic" aria-hidden="true">input</i>Carica Cartelle
            </a>
          </div>
        </nav>
      </nav>
    </aside>
    <main class="app-main mdc-toolbar-fixed-adjust">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import Loki from 'lokijs'

import {MDCTemporaryDrawer} from '@material/drawer'

export default {
  data () {
    return {
      drawer: {}
    }
  },
  computed: {
    isMain: function () {
      return this.$store.state.route.name === 'main'
    },
    isHistory: function () {
      return this.$store.state.route.name === 'history'
    },
    isSettings: function () {
      return this.$store.state.route.name === 'settings'
    },
    isLoad: function () {
      return this.$store.state.route.name === 'load'
    }
  },
  methods: {
    mainNav: function (event) {
      event.preventDefault()
      this.$router.push({ name: 'main' })
      this.drawer.open = false
    },
    historyNav: function (event) {
      event.preventDefault()
      console.log('Not Yet Implemented!!!')
      // this.$router.push({ name: 'history'})
    },
    settingsNav: function (event) {
      event.preventDefault()
      console.log('Not Yet Implemented!!!')
      // this.$router.push({ name: 'settings'})
    },
    loadNav: function (event) {
      event.preventDefault()
      this.$router.push({ name: 'load' })
      this.drawer.open = false
    },
    databaseInitialize: function () {
      var self = this
      var db = this.$store.state.db
      db.loadDatabase({}, function () {
        self.loadCollection('tickets', db, function (tickets) {
          self.$store.commit('ticketsLoaded', tickets)
        })
        self.loadCollection('matches', db, function (matches) {
          self.$store.commit('matchesLoaded', matches)
          // var count = self.matches.count()
          // if (count > 0) {
          //   var lastMatch = self.matches.get(count)
          //   self.matchStart = lastMatch.timestamp
          //   self.matchState = lastMatch.state
          //   self.matchPhase = lastMatch.matchPhase
          // }
        })
      })
    },
    loadCollection: function (colName, db, callback) {
      var _collection = db.getCollection(colName)

      if (!_collection) {
        console.log('Collection %s does not exist. Creating ...', colName)
        _collection = db.addCollection(colName)
      }

      callback(_collection)
    }
  },
  mounted () {
    var self = this
    var drawerEl = document.querySelector('.mdc-drawer')
    self.drawer = new MDCTemporaryDrawer(drawerEl)
    document.querySelector('.app-menu').addEventListener('click', function () {
      self.drawer.open = true
    })
    drawerEl.addEventListener('MDCTemporaryDrawer:open', function () {
      console.log('Received MDCTemporaryDrawer:open')
    })
    drawerEl.addEventListener('MDCTemporaryDrawer:close', function () {
      console.log('Received MDCTemporaryDrawer:close')
    })

    var db = new Loki('sbacioca.json', {
    })

    this.$store.commit('dbInitialized', db)
    var proto = Object.getPrototypeOf(db)
    var LokiIndexedAdapter = proto.getIndexedAdapter()
    var idbAdapter = new LokiIndexedAdapter('sbacioca')
    db.persistenceAdapter = idbAdapter

    this.databaseInitialize()
  },
  beforeDestroy () {
  }
}
</script>

<style>
body {
  height: calc(100% - 64px);
}
#app {
  height: 100%;
}
.app-body {
  padding: 0;
  margin: 0;
  box-sizing: margin-box;
}
.app-main {
  padding-left: 16px;
  overflow: auto;
  height: 100%
}
</style>

<style lang="scss" scoped>
@import "@material/toolbar/mdc-toolbar";
@import "@material/drawer/mdc-drawer";
@import "@material/list/mdc-list";
@import "@material/theme/mdc-theme";
@import "@material/typography/mdc-typography";
</style>
