import Vue from 'vue'
import VueRouter from 'vue-router'
import Cards from '@/views/CsvCards.vue'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'cards',
      component: Cards
    }
  ],
  parseQuery (q) {
    return q
  },
  stringifyQuery (q) {
    return `?${q}`
  }
})
