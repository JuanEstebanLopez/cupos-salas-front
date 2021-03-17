<template>
  <v-container class="py-10">
      <v-row v-for="sala in salas" :key="sala.id">
          <SalaMin :sala="sala" />
      </v-row>
  </v-container>
</template>

<script>
import SalaMin from '../components/Salas/SalaMin'
export default {
  name: 'VistaSalas',
  components: { SalaMin },
  computed: {
    salas () {
      return this.$store.getters.salas
    }
  },
  methods: {

  },
  created () {
    this.$store.dispatch('loadSalas')
  }
}
</script>

<style>

</style>
