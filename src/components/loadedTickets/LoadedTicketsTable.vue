<template>
<!-- TODO RICOSTRUIRE CON MATERIAL DESIGN DATA TABLE QUANDO SARA' DISPONIBILE!!! -->
<!-- https://github.com/material-components/material-components-web/issues/57 -->
<div class="loaded-tickets">
  <table class="loaded-tickets-table" v-if="areLoaded">
    <tr>
      <th class="hidden-cell"></th>
      <th class="cinquina-header" colspan="5">Cinquina 1</th>
      <th class="cinquina-header" colspan="5">Cinquina 2</th>
      <th class="cinquina-header" colspan="5">Cinquina 3</th>
    </tr>
    <!--<tr>
      <th v-for="(label, index) in header">{{label}}</th>
    </tr>
    <template v-for="(ticket, index) in loadedTickets" :key="ticket.name">
      <tr v-if="isValidTicket(ticket)">
        <td v-for="(field, index) in ticket">{{field}}</td>
      </tr>
    </template>-->
  </table>
</div>
</template>

<script>

export default {
  name: 'loadedTicketsTable',
  props: ['loadedTickets'],
  data () {
    return {
      header: [
        'Nome',
        'Num01',
        'Num02',
        'Num03',
        'Num04',
        'Num05',
        'Num06',
        'Num07',
        'Num08',
        'Num09',
        'Num10',
        'Num11',
        'Num12',
        'Num13',
        'Num14',
        'Num15'
      ]
    }
  },
  computed: {
    areLoaded: function () {
      var lt = this.loadedTickets
      if (lt === null || typeof lt === 'undefined') {
        return false
      }
      if (lt.length === 0) {
        return false
      }
      // We check if there is at least one valid ticket
      for (var i = 0; i < lt.length; i++) {
        var ticket = lt[i]
        if (this.isValidTicket(ticket)) {
          return true
        }
      }
      return false
    }
  },
  methods: {
    isValidTicket: function (ticket) {
      // A ticket must have a generic string name and a sequence of 15 numbers
      if (ticket.length !== 16) {
        return false
      }
      for (var i = 1; i < 16; i++) {
        var number = ticket[i]
        if (isNaN(number)) {
          return false
        }
      }
      return true
    }
  },
  mounted () {},
  beforeDestroy () {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.loaded-tickets-table {
  width: 100%;
}

table {
  border-collapse: collapse;
}

th, td {
  border: 1px solid black;
  padding: 5px;
}

th {
  background-color: var(--mdc-theme-secondary);
  text-align: left;
}

th.cinquina-header {
  background-color: var(--mdc-theme-primary-light);
  text-align: center;
}

tr:nth-child(odd) {
  background-color: #f2f2f2;
}

.hidden-cell {
  border: 0px;
  background-color: var(--mdc-theme-background);
}
</style>
