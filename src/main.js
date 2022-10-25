import { createApp } from 'vue'
import App from './App.vue'
import './styles/global.scss'
import { clickOutside } from "./directives.js";

const app = createApp(App)
app.directive("clickOut", clickOutside)
app.mount('#app')