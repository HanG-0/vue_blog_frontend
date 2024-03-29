import {createApp} from 'vue'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// import './axios.js'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

import './permission.js'
// import 'github-markdown.css'

import Element from 'element-plus'
import axios from 'axios'
import "element-ui/lib/theme-chalk/index.css"
//import "./axios"
// Vue.prototype.$axios = axios


const app = createApp(App)
app.config.globalProperties.$axios = axios;
app.use(store).use(router).use(Element).use(mavonEditor).provide("$axios", axios).mount('#app')
