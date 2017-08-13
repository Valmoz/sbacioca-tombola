<template>
  <div>
    <h1 class="mdc-typography--display1">Temporary Drawer</h1>
    <p class="mdc-typography--body1">{{text}}</p>
  </div>

</template>

<script>
import Loki from 'lokijs'

export default {
  data () {
    return {
      text: 'Click the menu icon above to open.'
    }
  },
  computed: {},
  methods: {},
  mounted () {
    var db = new Loki('loki.json')
    var children = db.addCollection('children')
    children.insert({name: 'Neja', age: 21})
    this.text = children.find({'name': 'Neja'})
  },
  beforeDestroy () {
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
