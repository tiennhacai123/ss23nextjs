// import './assets/main.css'

import { createApp } from 'vue';
import App from './App.vue';

// Import Vuetify styles and create Vuetify instance
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// Create Vuetify instance
const vuetify = createVuetify({
  components,
  directives,
});

// Create and mount Vue app with Vuetify
createApp(App).use(vuetify).mount('#app');
