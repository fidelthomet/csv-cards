import Vue from 'vue'
import Vuex from 'vuex'

import { csvParseRows } from 'd3-dsv'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data: null,
    highlight: null
  },
  getters: {
  },
  mutations: {
    set (state, { key, value }) {
      state[key] = value
    }
  },
  actions: {
    update ({ commit }, d) {
      commit('set', d)
    },
    async initData ({ commit, dispatch, state }, url) {
      const data = await fetch(url).then(r => r.text()).then((csv) => {
        const rows = csvParseRows(csv)
        return rows.map(row => {
          const config = {
            color: null,
            num: 1,
            ...Object.fromEntries([...row[0].matchAll(/@([^(]+)\(([^)]+)\)/g)].map(m => [m[1], m[2]]))
          }
          return Array(+config.num).fill({
            cat: row[0].replace(/@([^(]+)\(([^)]+)\)/g, '').trim(),
            ...config,
            items: row.filter((d, i) => i !== 0)
          })
        }).flat()
      })
      commit('set', { key: 'data', value: data })
    }
  }
})
