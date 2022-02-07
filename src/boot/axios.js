import Vue from 'vue'
import axios from 'axios'

Vue.prototype.$axios = axios
// const api = axios.create({ baseURL: 'http://localhost:3000' })
// Vue.prototype.$api = api
// Vue.prototype.$apiV = '/api/v1'


export { axios }
//export { axios, api }
