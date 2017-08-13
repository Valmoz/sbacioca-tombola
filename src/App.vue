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
              Header here
            </div>
          </header>
          <nav class="mdc-temporary-drawer__content mdc-list-group">
            <div id="icon-with-text-demo" class="mdc-list">
              <a class="mdc-list-item mdc-temporary-drawer--selected" href="#">
                <i class="material-icons mdc-list-item__start-detail" aria-hidden="true">inbox</i>Inbox
              </a>
              <a class="mdc-list-item" href="#">
                <i class="material-icons mdc-list-item__start-detail" aria-hidden="true">star</i>Star
              </a>
              <a class="mdc-list-item" href="#">
                <i class="material-icons mdc-list-item__start-detail" aria-hidden="true">send</i>Sent Mail
              </a>
              <a class="mdc-list-item" href="#">
                <i class="material-icons mdc-list-item__start-detail" aria-hidden="true">drafts</i>Drafts
              </a>
            </div>

            <hr class="mdc-list-divider">

            <div class="mdc-list">
              <a class="mdc-list-item" href="#">
                <i class="material-icons mdc-list-item__start-detail" aria-hidden="true">email</i>All Mail
              </a>
              <a class="mdc-list-item" href="#">
                <i class="material-icons mdc-list-item__start-detail" aria-hidden="true">delete</i>Trash
              </a>
              <a class="mdc-list-item" href="#">
                <i class="material-icons mdc-list-item__start-detail" aria-hidden="true">report</i>Spam
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

<style></style>
