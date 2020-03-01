<template>
  <div class="csv-map">
    <DeckMap v-if="data"/>
    <!-- <div class="list blur"/> -->
    <transition name="fade">
      <div v-if="detail != null" :key="`id-${highlight}`" class="detail blur">
        <div class="header">
          <a :href="detail.url"><h2>{{ detail.title || 'Untitled' }}<template v-if="detail.url">{{'\xa0'}}↗</template></h2></a>
          <span class="h2" @click="highlight = null">✕</span>
        </div>
        <h3 v-if="detail.subtitle" :class="[detail.color]">{{ detail.subtitle }}</h3>
        <div v-if="detail.img" class="img">
          <img v-for="(img, i) in detail.img" :key="`img-${i}`" :src="img"/>
        </div>
        <table v-if="detail.details != null && detail.details.length > 0">
          <tr v-for="(d, i) in detail.details" :key="`d-${i}`">
            <td>{{d[0]}}</td>
            <td>{{d[1] || '–'}}</td>
          </tr>
        </table>
      </div>
    </transition>
  </div>
</template>

<script>
// @ is an alias to /src
import DeckMap from '@/components/DeckMap.vue'
import { mapState } from 'vuex'
import bindState from '@/assets/js/bindState'

export default {
  name: 'Home',
  components: {
    DeckMap
  },
  computed: {
    ...mapState(['data']),
    ...bindState(['highlight']),
    detail () {
      const { highlight, data } = this
      if (highlight == null) return null
      return data.find(d => d.id === highlight)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/style/global";
// $color-white: #fff;
// $spacing: 2rem;
.csv-map {
  .list {
    position: absolute;
    width: 100vw;
    height: 64px;
    bottom: 0;
    left: 0;
  }
  .detail {
    position: absolute;
    // width: 100vw;
    max-height: calc(100vh - #{$spacing});
    padding: $spacing / 2;
    top: $spacing / 2;
    width: 320px;
    max-width: calc(100vw - #{$spacing});
    right: $spacing / 2;
    overflow-x: hidden;
    overflow-y: auto;

    .header {
      display: flex;
      justify-content: space-between;
      // flex-wrap: wrap;
      a {
        text-decoration: none;
      }
      .h2 {
        padding-left: $spacing;
        transition: color .4s;
        cursor: default;
        &:hover {
          color: #7200FF
        }
      }
    }

    .img {
      margin: $spacing / 4 0 0;
      img {
        display: block;
        max-width: 100%;
        margin: 0 0 $spacing / 4;
      }
    }

    table {
      width: 100%;
      border-collapse: collapse;
      tr {
        td {
          padding: $spacing / 16 0;
          border-bottom: 1px solid #55525E;
          &:last-of-type {
            text-align: right;
          }
        }
        &:last-of-type {
          td {
            border-bottom: none;
          }
        }
      }
    }
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .4s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
}
.blur {
  background: transparentize($color-white, 0.08);
  @supports ((-webkit-backdrop-filter: saturate(180%) blur(20px)) or(backdrop-filter: saturate(180%) blur(20px))) {
    background: transparentize($color-white, 0.4);
    -webkit-backdrop-filter: saturate(180%) blur(10px);
    backdrop-filter:saturate(180%) blur(10px)
  }
}
</style>
