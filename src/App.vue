<template>
  <v-app>
    <NavBar/>
    <v-main>

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
  })
}
</script>
