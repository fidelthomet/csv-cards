import Vue from 'vue'
import Vuex from 'vuex'

import { csvParse } from 'd3-dsv'

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
        const fields = ['risk', 'terrain', 'object', 'mood']
        const data = csvParse(csv)
        return Object.fromEntries(fields.map(f => {
          return [
            f,
            data.map(d => d[f]).filter(d => d !== '')
          ]
        }))
      })
      commit('set', { key: 'data', value: data })
    }
  }
})
