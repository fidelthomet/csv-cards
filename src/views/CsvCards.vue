<template>
  <div class="csv-cards">
    <div class="options" v-if="data != null">
      <svg @click="draw" :class="{loop, loop2: !loop}" width="48" height="48" viewBox="0 0 64 64">
        <circle cx="32" cy="32" r="32"/>
        <path d="M41.8165367,21.5082989 C44.5972585,24.2356598 46.1969697,27.9849696 46.1969697,31.9898531 C46.1969697,39.5734644 40.4918915,45.8089714 33.1984954,46.4932463 L37.2870479,49.5606644 L36.086363,51.1601505 L29.7415534,46.3972973 L33.282181,39.2976258 L35.071963,40.1901955 L32.9179044,44.5102723 C39.2326952,43.9654255 44.1969697,38.57132 44.1969697,31.9898531 C44.1969697,28.6500109 42.913102,25.5216766 40.669331,23.1917153 L40.4160894,22.936146 L41.8165367,21.5082989 Z M27.913637,12.8398495 L34.2584466,17.6027027 L30.717819,24.7023742 L28.928037,23.8098045 L31.0816001,19.4897705 C24.7670451,20.0348567 19.8030303,25.4288522 19.8030303,32.0101469 C19.8030303,35.3499891 21.086898,38.4783234 23.330669,40.8082847 L23.5839106,41.063854 L22.1834633,42.4917011 C19.4027415,39.7643402 17.8030303,36.0150304 17.8030303,32.0101469 C17.8030303,24.4268827 23.5075865,18.1915992 30.8005034,17.5068477 L26.7129521,14.4393356 L27.913637,12.8398495 Z" />
      </svg>
    </div>
    <div class="cards">
      <div class="card" v-for="(c, i) in cards" :key="`c-${i}`">
        <div class="cat" :style="{background: c.color}">{{ c.cat }}</div>
        <div class="item" :style="{color: c.color}">{{ c.item }}</div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'

export default {
  name: 'csv-cards',
  components: {
  },
  data () {
    return {
      cards: [],
      loop: false
    }
  },
  computed: {
    ...mapState(['data']),
    detail () {
      const { highlight, data } = this
      if (highlight == null) return null
      return data.find(d => d.id === highlight)
    }
  },
  watch: {
    data (data) {
      if (data != null) this.draw()
    }
  },
  methods: {
    draw () {
      const { data } = this
      this.loop = !this.loop
      // this.$nextTick(() => {
      //   this.loop = false
      // })
      this.cards = data.map(d => {
        return {
          ...d,
          item: d.items[Math.floor(Math.random() * d.items.length)]
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/style/global";
.csv-cards {
  display: flex;
  flex-direction: column;
  align-items: center;

  .options {
    transition: transform .4s;
    svg {
      display: block;

      circle {
        fill: $color-black;
      }
      path {
        fill: $color-pale-gray;
        transition: fill .4s;
      }

      &.loop {
        animation: loop1 0.4s;
      }
      &.loop2 {
        animation: loop2 0.4s;
      }

      @keyframes loop1 {
        from {
          transform: rotate(0deg);
        } to {
          transform: rotate(180deg);
        }
      }
      @keyframes loop2 {
        from {
          transform: rotate(0deg);
        } to {
          transform: rotate(180deg);
        }
      }
    }
    &:hover {
      transform: scale(1.1);
      svg path {
        fill: $color-accent;
      }
    }
  }

  .cards {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: $spacing;
    flex-wrap: wrap;

    .card {
      // border: 2px solid $color-black;
      border-radius: 2px;
      background: $color-pale-gray;
      height: 264px;
      width: 192px;
      margin: 0 $spacing / 4 $spacing / 2;

      .cat {
        border-radius: 2px 2px 0 0;
        background: $color-black;
        color: $color-pale-gray;
        padding: $spacing / 4 $spacing / 2;
      }

      .item {
        padding: $spacing / 4 $spacing / 2;
        hyphens: auto;
        // font-size: 2rem;
        hyphens: auto;
      }

    }
  }
}
</style>
