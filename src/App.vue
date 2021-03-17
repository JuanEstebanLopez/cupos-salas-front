<template>
  <v-app>
    <NavBar/>
    <v-main class="background body--text">
       <router-view/>
    </v-main>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld'
import NavBar from './components/NavBar'

export default {
  name: 'App',

  components: {
    NavBar
  },

  data: () => ({
    //
  }),

  created () {
    this.$store.dispatch('isSetup')
  }
}
</script>

<style lang="scss">
  a {
    color: inherit !important;
    text-decoration: none !important;
  }
</style>
