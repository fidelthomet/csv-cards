<template>
  <div class="csv-random">
    <div class="cards">
      <div class="card" v-for="(c, i) in cards" :class="[c.category]" :key="`c-${i}`">
        <div class="category">{{ c.category }}</div>
        <div class="value">{{ c.value }}</div>
      </div>
    </div>
    <div class="options">
      <div class="button" @click="draw">draw cards</div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'

export default {
  name: 'csv-random',
  components: {
  },
  data () {
    return {
      cards: []
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
  methods: {
    draw () {
      const { data } = this
      const fields = ['risk', 'risk', 'terrain', 'object', 'mood']
      this.cards = fields.map(category => {
        return {
          category,
          value: data[category][Math.floor(Math.random() * data[category].length)]
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/style/global";
.csv-random {
  display: flex;
  flex-direction: column;
  align-items: center;

  .cards {
    display: flex;
    align-items: center;
    margin-bottom: $spacing;
    flex-wrap: wrap;

    .card {
      border: 2px solid;
      height: 264px;
      width: 192px;
      margin: $spacing / 4;

      &.risk {
        border-color: $color-red;
        color: $color-red;
        .category {
          background: $color-red;
        }
      }
      &.terrain {
        border-color: $color-violet;
        color: $color-violet;
        .category {
          background: $color-violet;
        }
      }
      &.object {
        border-color: $color-green;
        color: $color-green;
        .category {
          background: $color-green;
        }
      }
      &.mood {
        border-color: $color-yellow;
        color: $color-yellow;
        .category {
          background: $color-yellow;
        }
      }

      .category {
        color: $color-white;
        padding: $spacing / 4 $spacing / 2;
      }

      .value {
        padding: $spacing / 4 $spacing / 2;
        hyphens: auto;
      }

    }
  }
}
</style>
