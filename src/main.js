// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import qs from 'qs'
let {state} = store

Vue.config.productionTip = false

axios.defaults.baseURL = state.config['deploy_path'][process.env.NODE_ENV]['base']
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded'

axios.interceptors.request.use((req) => {
  // console.log(state.user.userToken)
  if (state.user.userToken) {
    // console.log('req.data', req.data)
    if (!req.data) {
      req.data = []
    }
    req.data['UserToken'] = state.user.userToken
  }
  req.data = qs.stringify(req.data)
  return req
}, (err) => {
  console.log(err)
  return Promise.reject(err)
})

axios.interceptors.response.use((response) => {
  // console.log('response', response)
  let res = response.data
  // console.log(res.code, res.msg)
  if (res && res.code === 401) {
    // Vue.prototype.toast(Vue, res.msg)
    // store.dispatch('user/LOGOUT')
  }
  if (res && (res.code === 500 || res.code === 403 || res.code === 404)) {
    // Vue.prototype.toast(Vue, res.msg)
  }
  return response
}, (err) => {
  console.log(err)
  return Promise.reject(err)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
  // components: { App },
  // template: '<App/>'
})
