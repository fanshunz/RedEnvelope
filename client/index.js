import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

import App from './app.vue'
import createRouter from './config/router'
import createStore from './store/store.js'
import Dialog from './components/dialog/index.js'
import {
  Button,
  Input,
  Select,
  Option,
  DatePicker,
  Form,
  FormItem,
  Table,
  TableColumn,
  Pagination,
  Icon
} from 'element-ui'

import './assets/styles/global.styl'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/styles/body.styl'

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(Dialog)

Vue.use(Button)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(DatePicker)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Icon)

const router = createRouter()
const store = createStore()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#root')
