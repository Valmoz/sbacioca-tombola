<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app">
    <div class="mdc-toolbar mdc-toolbar--fixed">
        <div class="mdc-toolbar__row">
          <section class="mdc-toolbar__section mdc-toolbar__section--align-start">
            <button class="demo-menu material-icons mdc-toolbar__icon--menu">menu</button>
            <span class="mdc-toolbar__title catalog-title">Temporary Drawer</span>
          </section>
        </div>
      </div>

      <aside class="mdc-temporary-drawer">
        <nav class="mdc-temporary-drawer__drawer">
          <header class="mdc-temporary-drawer__header">
            <div class="mdc-temporary-drawer__header-content mdc-theme--primary-bg mdc-theme--text-primary-on-primary">
              Sbacioca Tombola
            </div>
          </header>
          <nav class="mdc-temporary-drawer__content mdc-list-group">
            <div id="icon-with-text-demo" class="mdc-list">
              <a class="mdc-list-item mdc-temporary-drawer--selected" href="#">
                <i class="material-icons mdc-list-item__start-detail" aria-hidden="true">bubble_chart</i>Gioca
              </a>
              <a class="mdc-list-item" href="#">
                <i class="material-icons mdc-list-item__start-detail" aria-hidden="true">history</i>Storico
              </a>
            </div>

            <hr class="mdc-list-divider">

            <div class="mdc-list">
              <a class="mdc-list-item" href="#">
                <i class="material-icons mdc-list-item__start-detail" aria-hidden="true">settings</i>Impostazioni
              </a>
              <a class="mdc-list-item" href="#">
                <i class="material-icons mdc-list-item__start-detail" aria-hidden="true">input</i>Carica Cartelle
              </a>
            </div>
          </nav>
        </nav>
      </aside>
      <main class="demo-main mdc-toolbar-fixed-adjust">
        <router-view></router-view>
      </main>





  </div>
</template>

<script>

import {MDCTemporaryDrawer} from '@material/drawer'

export default {
  data () {
    return {}
  },
  computed: {},
  methods: {},
  mounted () {
    var drawerEl = document.querySelector('.mdc-temporary-drawer')
    const drawer = new MDCTemporaryDrawer(drawerEl)
    document.querySelector('.demo-menu').addEventListener('click', function () {
      drawer.open = true
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
.demo-body {
  padding: 0;
  margin: 0;
  box-sizing: margin-box;
}
.demo-main {
  padding-left: 16px;
  overflow: auto;
  height: 100%
}
</style>
