<template>
  <div class="map" ref="map">
  </div>
</template>

<script>
import { IconLayer } from '@deck.gl/layers'
import { MapboxLayer } from '@deck.gl/mapbox'
import { mapState } from 'vuex'
import mapboxgl from 'mapbox-gl'
import bindState from '@/assets/js/bindState'

export default {
  name: 'deck-map',
  data () {
    return {
      map: null,
      layer: null,
      colors: {
        green: [0x2A, 0xE0, 0x92],
        blue: [0x2A, 0x98, 0xE0],
        violet: [0x72, 0x00, 0xFF],
        red: [0xFA, 0x15, 0x56],
        orange: [0xFF, 0x73, 0x00],
        yellow: [0xFF, 0xDD, 0x00]
      }
    }
  },
  computed: {
    ...mapState(['data']),
    ...bindState(['highlight'])
  },
  mounted () {
    const { data, colors } = this

    this.layer = new MapboxLayer({
      id: 'icon-layer',
      type: IconLayer,
      data,
      pickable: true,
      iconAtlas: 'icon.png',
      iconMapping: { marker: { x: 0, y: 0, width: 32 * 4, height: 37 * 4, mask: true, anchorY: 37 * 4 } },
      getIcon: d => 'marker',
      autoHighlight: true,
      sizeScale: 48,
      alphaCutoff: 0.1,
      highlightColor: [0, 0, 0, 96],
      getPosition: d => [d.lng, d.lat],
      getSize: d => 1,
      getColor: d => colors[d.color] || [0, 0, 0],
      onClick: ({ object }) => {
        this.highlight = object.id
      }
    })

    let bounds = null
    if (data != null && data.length > 0) {
      bounds = [
        [Math.min(...data.map(d => d.lng)), Math.min(...data.map(d => d.lat))],
        [Math.max(...data.map(d => d.lng)), Math.max(...data.map(d => d.lat))]
      ]
    }

    mapboxgl.accessToken = 'pk.eyJ1IjoiZmlkZWx0aG9tZXQiLCJhIjoiY2lobmcyYjZ3MHA2ZXZxa2x5eHloeWNveCJ9.U9zfqtkpS1JU6iNVwstFZQ'
    this.map = new mapboxgl.Map({
      container: this.$refs.map,
      style: 'mapbox://styles/fidelthomet/ck6yuh9ae3oy21is7zroxfvkb',
      bounds,
      fitBoundsOptions: { padding: 64 }
    })

    this.map.on('load', () => {
      this.map.addLayer(this.layer)
    })
  },
  watch: {
    data: {
      handler (data) {
        if (data == null || this.layer == null) return null
        this.layer.setProps({ data: this.data })
        if (data.length > 0) {
          const bounds = [
            [Math.min(...data.map(d => d.lng)), Math.min(...data.map(d => d.lat))],
            [Math.max(...data.map(d => d.lng)), Math.max(...data.map(d => d.lat))]
          ]
          this.map.fitBounds(bounds, { padding: 64 })
        }
      },
      immediate: true
    }
  }
}
</script>

<style scoped lang="scss">
.map {
  position: absolute;
  cursor: default !important;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index: -1;
}
</style>
<style lang="scss">
.map {
  .mapboxgl-canvas{
    cursor: default !important;
  }
}
</style>
