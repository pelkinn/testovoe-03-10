import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg';

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'default',
    themes: {
      default: {
        dark: false,
        colors: {
          primary: '#5492c8',
          secondary: '#ff6b1a'
        }
      }
    }
  },

  icons: {
    defaultSet: 'mdi',
    aliases: {
      ...aliases
    },
    sets: { mdi }
  },

  defaults: {
    VBtn: {
      color: 'primary',
      flat: true,
      variant: 'flat',
      size: 'large'
    },
    VTextField: {
      variant: 'outlined',
      density: 'comfortable',
      flat: true
    },
    VNumberInput: {
      variant: 'outlined',
      density: 'comfortable',
      flat: true,
      min: 0,
      hideDetails: 'auto'
    },
    VAlert: {
      color: 'red'
    }
  }
});

export default vuetify;
