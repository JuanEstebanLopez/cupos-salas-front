import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    options: {
      customProperties: true
    },
    themes: {
      light: {
        primary: '#8448D9',
        secondary: '#2579AD',
        accent: '#6ECCE0',
        body: '#17092A',
        background: '#F9F7FD',

        error: '#AA1E01',
        info: '#77D8E0',
        success: '#6EEE96',
        warning: '#C8AF2D',
        transparent: 'transparent'

      }
    }
  }
})
