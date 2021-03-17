<template>
<v-col md="12">
<v-card >
 <div class="d-flex align-center">
   <div class="mx-5">
     <svg viewBox="0 0 120 120" width="120" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="50" stroke="#F0F0F0" stroke-width="6" fill="transparent"/>
      <path :d="arc" :stroke="color" stroke-width="6" stroke-linecap="round" fill="transparent"/>
      <text x="50%" y="50%" fill="#0b0415" dominant-baseline="middle" text-anchor="middle" font-size="1.4em">{{ocupacionPorcentajeTexto}}</text>
    </svg>
   </div>
   <div class="flex-grow-1">
<v-card-title>
  <span>Sala {{sala.nombre}}</span>
  <v-spacer></v-spacer>
  <v-chip
    v-if="sala.propietarioSala"
      class="ma-2"
      color="secondary"
      color-text="white"
      v-text="sala.propietarioSala.nombre"
    />
  </v-card-title>
  <v-card-subtitle>
    <span>Capacidad {{sala.capacidad}}, {{sala.ocupacion}} personas en la Sala</span>
  </v-card-subtitle>
  <v-card-actions>
    <span v-if="user.nombre">Entrar como {{user.nombre}}</span>
    <v-text-field
    v-else
            label="Cédula"
            placeholder="Número de cédula"
            dense
            clearable
            :messages="[hint]"
            v-model="cedula"
            @change="checkUser"
    ></v-text-field>
     <v-btn v-if="!tempUser.ingresos_activos" class="mx-5" color="primary" rounded dark :disabled="!puedeIngresarInfo.puede_ingresar" @click="ingresarASala">Entrar</v-btn>
     <v-btn v-else class="mx-5" color="primary" rounded dark  @click="salirDeASala">Salir</v-btn>
     <v-spacer></v-spacer>
     <v-btn class="mx-5" color="secondary" text :to="{name: 'Sala', params:{salaID: sala.id}}">Ver Sala <v-icon>mdi-arrow-right</v-icon></v-btn>
  </v-card-actions>
  </div>
  </div>
</v-card>
</v-col>
</template>

<script>
import CuposSalaConnection from '../../helpers/BackConnection'
const conection = new CuposSalaConnection()

export default {
  name: 'SalaMin',
  props: { sala: Object },
  data: () => ({
    cedula: '',
    hint: '',
    tempUser: {},
    puedeIngresarInfo: {}
  }),
  computed: {
    ocupacionPorcentaje () {
      // var ret = 0.365322321 // comentar
      // if (ret) return ret // comentar
      if (!this.sala.capacidad || this.sala.capacidad === 0) {
        return 0
      }
      return (this.sala.ocupacion / this.sala.capacidad) || 0
    },
    ocupacionPorcentajeTexto () {
      return (this.ocupacionPorcentaje * 100).toFixed(1) + '%'
    },
    arc () {
      var cx = 60; var cy = 60; var radius = 50; var max = 360
      var angle = max * this.ocupacionPorcentaje
      var d = ' M ' + (cx + radius) + ' ' + cy

      var a = 0
      while (a < angle) {
        var radians = a * (Math.PI / 180) // convert degree to radians
        var x = cx + Math.cos(radians) * radius
        var y = cy + Math.sin(radians) * radius
        d += ' L ' + x + ' ' + y
        a++
      }
      return d
    },
    color () {
      if (this.ocupacionPorcentaje >= 0.9) { return '#AA1E01' } else if (this.ocupacionPorcentaje >= 0.7) { return '#C8AF2D' } else if (this.ocupacionPorcentaje >= 0.4) { return '#77D8E0' }
      return '#6EEE96'
    },
    user () {
      return this.$store.getters.user
    }
  },
  methods: {
    checkUser () {
      if (!this.cedula) {
        this.hint = ''
        this.tempUser = {}
        this.puedeIngresarInfo = {}
      } else {
        conection.puedeIngresarASala(this.sala.id, this.cedula).then(r => {
          if (r.data.error) {
            this.hint = r.data.error
            this.tempUser = {}
            this.puedeIngresarInfo = {}
          } else {
            this.tempUser = r.data.persona
            this.hint = (r.data.puede_ingresar ? 'Puede ingresar, ' : 'No puede ingresar, ') + r.data.mensaje
            this.puedeIngresarInfo = r.data
          }
          console.log(r.data)
        })
      }
    },
    ingresarASala () {
      if (this.tempUser.id) {
        conection.ingresoASala({ persona_id: this.tempUser.id, sala_id: this.sala.id })
          .then(r => console.log(r.data)).then(() => this.$store.dispatch('loadSala', this.sala.id))
      }
    },
    salirDeASala () {
      if (this.tempUser.id && this.tempUser.ingresos_activos.length > 0) {
        this.tempUser.ingresos_activos.forEach(i => {
          conection.ActualizarIngresoASala(i.id, { horaSalida: true })
            .then(r => console.log(r.data)).then(() => this.$store.dispatch('loadSala', this.sala.id))
        })
      }
    }
  },
  created () {
    var user = this.$store.getters.user
    if (user && user.cedula) {
      this.cedula = user.cedula
      this.tempUser = user
      this.checkUser()
    }
  }
}
</script>

<style>

</style>
