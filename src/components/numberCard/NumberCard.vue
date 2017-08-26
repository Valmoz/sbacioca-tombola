<template>
  <div class="mdc-card demo-card demo-card--small mdc-elevation--z24">
    <section class="mdc-card__media" style="display:flex;justify-content:center;align-items:center;">
      <h1 class="mdc-card__title mdc-card__title--large extracted-number">{{extractedNumber}}</h1>
    </section>
    <section class="mdc-card__actions" style="display:flex;justify-content:center;align-items:center;">
      <h2 class="mdc-card__subtitle extracted-number-text">{{getText(extractedNumber)}}</h2>
    </section>
  </div>
</template>

<script>

export default {
  name: 'numberCard',
  props: [
    'extractedNumber',
    'isSmorfiaEnabled'
  ],
  data () {
    return {
    }
  },
  computed: {},
  methods: {
    getText: function (number) {
      if (this.isSmorfiaEnabled) {
        return numbersSmorfia[number]
      }
      else {
        return numbersText[number]
      }
    }
  },
  mounted () {

  },
  beforeDestroy () {}
}

var numbersSmorfia = {
  0: '',
  1: 'L\'Italia',
  2: 'La bambina',
  3: 'La gatta',
  4: 'Il maiale',
  5: 'La mano',
  6: 'Quella che guarda verso terra',
  7: 'Il vaso di creta',
  8: 'La Madonna',
  9: 'La figliolanza',
  10: 'I fagioli',
  11: 'I topolini',
  12: 'Il soldato',
  13: 'Sant\'Antonio',
  14: 'L\'ubriaco',
  15: 'Il ragazzo',
  16: 'Il culo',
  17: 'La disgrazia',
  18: 'Il sangue',
  19: 'La risata',
  20: 'La festa',
  21: 'La donna nuda',
  22: 'Il pazzo',
  23: 'Lo scemo',
  24: 'La vigilia',
  25: 'Natale',
  26: 'La piccola Anna',
  27: 'Il pitale',
  28: 'I seni',
  29: 'Il padre dei bambini',
  30: 'Le palle del tenente',
  31: 'Il padrone di casa',
  32: 'Il capitone',
  33: 'Gli anni di Cristo',
  34: 'La testa',
  35: 'L\'uccellino',
  36: 'Le nacchere',
  37: 'Il monaco',
  38: 'Le botte',
  39: 'Il cappio al collo',
  40: 'La noia',
  41: 'Il coltello',
  42: 'Il caffè',
  43: 'La donna al balcone',
  44: 'La prigione',
  45: 'Il vino buono',
  46: 'Il denaro',
  47: 'Il morto',
  48: 'Il morto che parla',
  49: 'La carne',
  50: 'Il pane',
  51: 'Il giardino',
  52: 'La mamma',
  53: 'Il vecchio',
  54: 'Il cappello',
  55: 'La musica',
  56: 'La caduta',
  57: 'Il gobbo',
  58: 'Il regalo',
  59: 'I peli',
  60: 'Il lamento',
  61: 'Il cacciatore',
  62: 'Il morto ammazzato',
  63: 'La sposa',
  64: 'La marsina',
  65: 'Il pianto',
  66: 'Le due zitelle',
  67: 'Il totano nella chitarra',
  68: 'La zuppa cotta',
  69: 'Sottosopra',
  70: 'Il palazzo',
  71: 'L\'uomo di merda',
  72: 'Lo stupore',
  73: 'L\'ospedale',
  74: 'La grotta',
  75: 'Pulcinella',
  76: 'La fontana',
  77: 'Le gambe delle donne',
  78: 'La bella figliuola',
  79: 'Il Ladro',
  80: 'La bocca',
  81: 'I fiori',
  82: 'La tavola imbandita',
  83: 'Il maltempo',
  84: 'La chiesa',
  85: 'L\'anima del Purgatorio',
  86: 'La bottega',
  87: 'I pidocchi',
  88: 'I caciocavalli',
  89: 'La vecchia',
  90: 'La paura'
}

var numbersText = {
  0: '',
  1: 'Uno',
  2: 'Due',
  3: 'Tre',
  4: 'Quattro',
  5: 'Cinque',
  6: 'Sei',
  7: 'Sette',
  8: 'Otto',
  9: 'Nove',
  10: 'Dieci',
  11: 'Undici',
  12: 'Dodici',
  13: 'Tredici',
  14: 'Quattordici',
  15: 'Quindici',
  16: 'Sedici',
  17: 'Diciassette',
  18: 'Diciotto',
  19: 'Diciannove',
  20: 'Venti',
  21: 'Ventuno',
  22: 'Ventidue',
  23: 'Ventitre',
  24: 'Ventiquattro',
  25: 'Venticinque',
  26: 'Ventisei',
  27: 'Ventisette',
  28: 'Ventotto',
  29: 'Ventinove',
  30: 'Trenta',
  31: 'Trentuno',
  32: 'Trentadue',
  33: 'Trentatre',
  34: 'Trentaquattro',
  35: 'Trentacinque',
  36: 'Trentasei',
  37: 'Trentasette',
  38: 'Trentotto',
  39: 'Trentanove',
  40: 'Quaranta',
  41: 'Quarantuno',
  42: 'Quarantadue',
  43: 'Quarantatre',
  44: 'Quarantaquattro',
  45: 'Quarantacinque',
  46: 'Quarantasei',
  47: 'Quarantasette',
  48: 'Quarantotto',
  49: 'Quarantanove',
  50: 'Cinquanta',
  51: 'Cinquantuno',
  52: 'Cinquantadue',
  53: 'Cinquantatre',
  54: 'Cinquantaquattro',
  55: 'Cinquantacinque',
  56: 'Cinquantasei',
  57: 'Cinquantasette',
  58: 'Cinquantotto',
  59: 'Cinquantanove',
  60: 'Sessanta',
  61: 'Sessantuno',
  62: 'Sessantadue',
  63: 'Sessantatre',
  64: 'Sessantaquattro',
  65: 'Sessantacinque',
  66: 'Sessantasei',
  67: 'Sessantasette',
  68: 'Sessantotto',
  69: 'Sessantanove',
  70: 'Settanta',
  71: 'Settantuno',
  72: 'Settantadue',
  73: 'Settantatre',
  74: 'Settantaquattro',
  75: 'Settantacinque',
  76: 'Settantasei',
  77: 'Settantasette',
  78: 'Settantotto',
  79: 'Settantanove',
  80: 'Ottanta',
  81: 'Ottantuno',
  82: 'Ottantadue',
  83: 'Ottantatre',
  84: 'Ottantaquattro',
  85: 'Ottantacinque',
  86: 'Ottantasei',
  87: 'Ottantasette',
  88: 'Ottantotto',
  89: 'Ottantanove',
  90: 'Novanta'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.mdc-card__media {
  background-color: var(--mdc-theme-secondary);
  height: 80%;
}
.mdc-card__actions {
  background-color: var(--mdc-theme-background);
  height: 20%;
}
.demo-card {
  z-index: 5;
  position: absolute;
  top: 3%;
  left: 2%;
  width: 96%;
  height: 94%;
}
.extracted-number {
  font-size: 80vmin;
}
.extracted-number-text {
  font-size: 8vmin;
}
</style>
