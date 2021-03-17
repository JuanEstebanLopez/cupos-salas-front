<template>
  <v-app-bar v-if="ocultar"
      app flat
      color="background"
      class="py-2"
    >
      <v-spacer></v-spacer>
      <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item>
                <v-list-item-title @click="ocultar=false">Mostrar Menú</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
  </v-app-bar>

  <v-app-bar v-else-if="!user.nombre"
      app
      color="primary"
      dark
      class="py-2"
    >
      <router-link :to="{name: 'Home'}" color="white">
        <h2>Salas Icesi</h2>
      </router-link>
      <v-spacer></v-spacer>

    <v-text-field
            label="Cédula"
            placeholder="Número de cédula"
            dense
            clearable
            :messages="[hint]"
            v-model="cedula"
            @change="checkUser"
    ></v-text-field>

      <v-btn
        icon
        rounded
        :disabled="!tempUser.nombre"
        @click="login"
      >
        <v-icon>mdi-login</v-icon>
      </v-btn>

      <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                dark
                icon
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item>
                <v-list-item-title @click="ocultar=true">Ocultar Menú</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
    </v-app-bar>

    <v-app-bar v-else-if="user.nombre"
      app
      color="primary"
      dark
    >
      <router-link :to="{name: 'Home'}" color="white">
        <h2>Salas Icesi</h2>
      </router-link>
      <v-spacer></v-spacer>

      <span v-text="user.nombre"></span>

      <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                dark
                icon
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item>
                <v-list-item-title>Configuración</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title @click="ocultar=true">Ocultar Menú</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title @click="logout=true">Salir</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
    </v-app-bar>
</template>

<script>

import CuposSalaConnection from '../helpers/BackConnection'
const conection = new CuposSalaConnection()

export default {
  name: 'NavBar',
  data: () => ({
    cedula: '',
    ocultar: true,
    hint: '',
    tempUser: {}
  }),
  computed: {
    user () {
      return this.$store.getters.user
    }
  },
  methods: {
    checkUser () {
      if (!this.cedula) {
        this.hint = ''
        this.tempUser = {}
      } else {
        conection.personaCedula(this.cedula).then(r => {
          if (r.data.error) {
            this.hint = r.data.error
            this.tempUser = {}
          } else {
            this.tempUser = r.data
            this.hint = 'Entrar como ' + this.tempUser.nombre
          }
          console.log(r.data)
        })
      }
    },
    login () {

    },
    logout () {

    }

  }

}
</script>

<style lang="scss" scoped>
.v-list-item{
  cursor: pointer;
}

</style>
