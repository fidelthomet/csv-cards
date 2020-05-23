import Vue from 'vue'
import VueRouter from 'vue-router'
import Random from '@/views/CsvRandom.vue'

Vue.use(VueRouter)

// fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vTdVVg7dwR2P3wAt5VlEpsjQZO94b3z5BQW6kmq6Coi5yyOjoVmafSCyzjd15nBaf3JytN5Rxn_x37b/pub?gid=0&single=true&output=csv').then(d => d.text()).then(d => console.log(d))

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'docs',
      component: Random
    }
  ],
  parseQuery (q) {
    return q
  },
  stringifyQuery (q) {
    return `?${q}`
  }
})
