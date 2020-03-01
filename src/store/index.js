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
    async initMap ({ commit, dispatch, state }, url) {
      const data = await fetch(url).then(r => r.text()).then((data) => {
        const fields = ['title', 'subtitle', 'lat', 'lng', 'color', 'img', 'url']
        return csvParse(data).map((d, id) => {
          if (d.img) d.img = d.img.split(',').map(i => i.trim())
          if (d.lat) d.lat = +d.lat
          if (d.lng) d.lng = +d.lng
          return {
            id,
            ...Object.fromEntries(Object.keys(d).filter(k => fields.indexOf(k) !== -1).map(k => [k, d[k]])),
            details: Object.keys(d).filter(k => fields.indexOf(k) === -1).map(k => [k, d[k]])
          }
        }).filter(d => d.lat != null || d.lng != null)
      })
      commit('set', { key: 'data', value: data })
    }
  }
})
