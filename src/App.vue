<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app">
    <div class="mdc-toolbar mdc-toolbar--fixed">
        <div class="mdc-toolbar__row">
          <section class="mdc-toolbar__section mdc-toolbar__section--align-start">
            <button class="app-menu material-icons mdc-toolbar__icon--menu">menu</button>
            <span class="mdc-toolbar__title catalog-title">Sbacioca! Tombola</span>
          </section>
        </div>
      </div>

      <aside class="mdc-temporary-drawer">
        <nav class="mdc-temporary-drawer__drawer">
          <header class="mdc-temporary-drawer__header">
            <div class="mdc-temporary-drawer__header-content mdc-theme--primary-bg mdc-theme--text-primary-on-primary">
              Sbacioca! Tombola
            </div>
          </header>
          <nav class="mdc-temporary-drawer__content mdc-list-group">
            <div class="mdc-list">
              <a class="mdc-list-item" href="#"  @click="mainNav($event)"
                v-bind:class="{ 'mdc-temporary-drawer--selected': isMain }">
                <i class="material-icons mdc-list-item__start-detail" aria-hidden="true">bubble_chart</i>Gioca
              </a>
              <a class="mdc-list-item" href="#" @click="historyNav($event)"
                v-bind:class="{ 'mdc-temporary-drawer--selected': isHistory }">
                <i class="material-icons mdc-list-item__start-detail" aria-hidden="true">history</i>Storico
              </a>
            </div>

            <hr class="mdc-list-divider">

            <div class="mdc-list">
              <a class="mdc-list-item" href="#" @click="settingsNav($event)"
                v-bind:class="{ 'mdc-temporary-drawer--selected': isSettings }">
                <i class="material-icons mdc-list-item__start-detail" aria-hidden="true">settings</i>Impostazioni
              </a>
              <a class="mdc-list-item" href="#" @click="loadNav($event)"
                v-bind:class="{ 'mdc-temporary-drawer--selected': isLoad }">
                <i class="material-icons mdc-list-item__start-detail" aria-hidden="true">input</i>Carica Cartelle
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
    }
  },
  mounted () {
    var self = this
    var drawerEl = document.querySelector('.mdc-temporary-drawer')
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
  },
  beforeDestroy () {
  }
}
</script>

<style>
body {
  height: calc(100% - 64px);
}
#q-app {
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
