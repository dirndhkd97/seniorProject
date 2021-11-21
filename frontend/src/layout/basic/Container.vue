<template>
  <section id="container">
    <section id="content" style="overflow-y: auto; width: calc( 100% - 290px )">
      <header class="location-path">
        <h1 class="entry-title">
          <template v-for="(info, index) in locations">
            <span :key="'locations' + index"
                  v-if="index == 0">{{ info.nm }}
            </span>
            <span :key="'locations' + index"
                  v-if="index > 0">
              <strong class="fc01">{{ info.nm }}</strong>
            </span>
          </template>
        </h1>
      </header>
      <router-view></router-view>
    </section>
  </section>
</template>

<script>
export default {
  name: 'Container',
  computed: {
    locations () {
      return this.$store.getters['menu/getLocations']
    }
  },
  watch: {
    '$route' () {
      this.setRouteView();
    }
  },
  data() {
    return {}
  },
  methods: {
    init () {
      this.setRouteView();
    },
    setRouteView () {
      this.$nextTick(
          () => {
            this.$store.commit('page/setRouteView', this.$refs.routeView);
          })

    }
  },
  mounted() {
    this.init();
  }
}
</script>

<style scoped>
</style>
