<template>
  <div style="display: flex; flex-direction: row; justify-content: space-between; background: #2a3954;
              padding: 0px 10px">
    <div style="{ font-size:13px; color:#fff;
                  padding: 10px 0; border: white}"
         v-for="(info, index) in menuList"
         :key="'menu'+index">
      <span @click="menuChange_click(info)">{{info.nm}}</span>
    </div>
  </div>
  <section style="{ width:100vw; height:100vh;}">
    <section id="app-content" style="overflow-y: auto;">
      <router-view></router-view>
    </section>
  </section>
</template>
b
<script>
export default {
  name: 'Container',
  computed: {
    selMenuCode () {
      return this.$store.state.appMenu.selMenuCode
    },
    selMenuInfo () {
      return this.$store.getters['appMenu/getSelMenuInfo']
    },
    menuList () {
      return this.$store.state.appMenu.menuList
    },
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
    menuChange_click (info) {
      this.$store.commit('AppMenu/selMenu', info.code);
      this.$router.push({path: info.path}).catch(()=>{});
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
