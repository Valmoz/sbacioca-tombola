<template>
  <!--<q-layout>
    <div slot="header" class="toolbar">
      <q-toolbar-title :padding="0">
        Quasar Framework v{{$q.version}}
      </q-toolbar-title>
    </div>

    <!- -
      Replace following "div" with
      "<router-view class="layout-view">" component
      if using subRoutes
    - ->
    <div class="layout-view">
      <div class="logo-container non-selectable no-pointer-events">
        <div class="logo" :style="position">
          <img src="~assets/quasar-logo.png">
          <p class="caption text-center">
            <span v-if="orienting || rotating">Tilt your device.</span>
            <template v-else>
              <span class="desktop-only">Move your mouse.</span>
              <span class="touch-only">Touch screen and move.</span>
            </template>
          </p>
        </div>
      </div>
    </div>
  </q-layout>-->
<div>
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
      <h1 class="mdc-typography--display1">Temporary Drawer</h1>
      <p class="mdc-typography--body1">Click the menu icon above to open.</p>
    </main>

    <!--<script src="../assets/material-components-web.js" charset="utf-8"></script>
    <script>
      var drawerEl = document.querySelector('.mdc-temporary-drawer');
      var MDCTemporaryDrawer = mdc.drawer.MDCTemporaryDrawer;
      var drawer = new MDCTemporaryDrawer(drawerEl);
      document.querySelector('.demo-menu').addEventListener('click', function() {
        drawer.open = true;
      });
      drawerEl.addEventListener('MDCTemporaryDrawer:open', function() {
        console.log('Received MDCTemporaryDrawer:open');
      });
      drawerEl.addEventListener('MDCTemporaryDrawer:close', function() {
        console.log('Received MDCTemporaryDrawer:close');
      });
    </script>-->
  </div>

</template>

<script>
// const moveForce = 30
// const rotateForce = 40
// const RAD_TO_DEG = 180 / Math.PI
//
// import { Utils, Platform } from 'quasar'
//
// function getRotationFromAccel (accelX, accelY, accelZ) {
//   /* Reference: http://stackoverflow.com/questions/3755059/3d-accelerometer-calculate-the-orientation#answer-30195572 */
//   const sign = accelZ > 0 ? 1 : -1
//   const miu = 0.001
//
//   return {
//     roll: Math.atan2(accelY, sign * Math.sqrt(Math.pow(accelZ, 2) + miu * Math.pow(accelX, 2))) * RAD_TO_DEG,
//     pitch: -Math.atan2(accelX, Math.sqrt(Math.pow(accelY, 2) + Math.pow(accelZ, 2))) * RAD_TO_DEG
//   }
// }

import {MDCTemporaryDrawer} from '@material/drawer'

export default {
  data () {
    return {
      // orienting: window.DeviceOrientationEvent && !Platform.is.desktop,
      // rotating: window.DeviceMotionEvent && !Platform.is.desktop,
      // moveX: 0,
      // moveY: 0,
      // rotateY: 0,
      // rotateX: 0
    }
  },
  computed: {
    // position () {
    //   const transform = `rotateX(${this.rotateX}deg) rotateY(${this.rotateY}deg)`
    //   return {
    //     top: this.moveY + 'px',
    //     left: this.moveX + 'px',
    //     '-webkit-transform': transform,
    //     '-ms-transform': transform,
    //     transform
    //   }
    // }
  },
  methods: {
    // move (evt) {
    //   const {width, height} = Utils.dom.viewport()
    //   const {top, left} = Utils.event.position(evt)
    //   const halfH = height / 2
    //   const halfW = width / 2
    //
    //   this.moveX = (left - halfW) / halfW * -moveForce
    //   this.moveY = (top - halfH) / halfH * -moveForce
    //   this.rotateY = (left / width * rotateForce * 2) - rotateForce
    //   this.rotateX = -((top / height * rotateForce * 2) - rotateForce)
    // },
    // rotate (evt) {
    //   if (evt.rotationRate &&
    //       evt.rotationRate.beta !== null &&
    //       evt.rotationRate.gamma !== null) {
    //     this.rotateX = evt.rotationRate.beta * 0.7
    //     this.rotateY = evt.rotationRate.gamma * -0.7
    //   }
    //   else {
    //     /* evt.acceleration may be null in some cases, so we'll fall back
    //        to evt.accelerationIncludingGravity */
    //     const accelX = evt.acceleration.x || evt.accelerationIncludingGravity.x
    //     const accelY = evt.acceleration.y || evt.accelerationIncludingGravity.y
    //     const accelZ = evt.acceleration.z || evt.accelerationIncludingGravity.z - 9.81
    //
    //     const rotation = getRotationFromAccel(accelX, accelY, accelZ)
    //     this.rotateX = rotation.roll * 0.7
    //     this.rotateY = rotation.pitch * -0.7
    //   }
    // },
    // orient (evt) {
    //   if (evt.beta === null || evt.gamma === null) {
    //     window.removeEventListener('deviceorientation', this.orient, false)
    //     this.orienting = false
    //
    //     window.addEventListener('devicemotion', this.rotate, false)
    //   }
    //   else {
    //     this.rotateX = evt.beta * 0.7
    //     this.rotateY = evt.gamma * -0.7
    //   }
    // }
  },
  mounted () {
    // this.$nextTick(() => {
    //   if (this.orienting) {
    //     window.addEventListener('deviceorientation', this.orient, false)
    //   }
    //   else if (this.rotating) {
    //     window.addEventListener('devicemove', this.rotate, false)
    //   }
    //   else {
    //     document.addEventListener('mousemove', this.move)
    //   }
    // })

    // var drawerEl = document.querySelector('.mdc-temporary-drawer')
    // var MDCTemporaryDrawer = mdc.drawer.MDCTemporaryDrawer
    // var drawer = new MDCTemporaryDrawer(drawerEl)
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
    // if (this.orienting) {
    //   window.removeEventListener('deviceorientation', this.orient, false)
    // }
    // else if (this.rotating) {
    //   window.removeEventListener('devicemove', this.rotate, false)
    // }
    // else {
    //   document.removeEventListener('mousemove', this.move)
    // }
  }
}
</script>

<style>
.demo-body {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.demo-main {
  padding-left: 16px;
  overflow: auto;
}
</style>
