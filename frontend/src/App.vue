<template>
  <div style="width: 100%;height: 100%;"
       v-if="initAt">
    <loading></loading>
    <template v-if="mode == 'web'">
      <basic-layout v-if="layoutSe == 'basic'"></basic-layout>
      <login v-if="layoutSe != 'basic'"></login>
      <div style="position: fixed;z-index: 990; top: 0px; left: 0px;">
        <popup-manager></popup-manager>
      </div>
    </template>
    <template v-if="mode == 'app'">
      <app-layout v-if="layoutSe == 'app'"></app-layout>
      <app-Login v-if="layoutSe != 'app'"></app-Login>
    </template>
  </div>
</template>

<script>
// Init plugin
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';
import Loading from './components/Loading';
import PopupManager from "./popup/PopupManager";
import BasicLayout from '@/layout/basic/Layout';
import Login from "./views/Web/Login";
import AppLayout from '@/layout/app/AppLayout';
import AppLogin from "./views/App/AppLogin";

export default {
  name: 'app',
  components: {
    Loading,
    PopupManager,
    BasicLayout,
    Login,
    AppLayout,
    AppLogin,
  },
  computed: {
    layoutSe() {
      return this.$store.state.page.layoutSe;
    },
  },
  watch: {
    '$route' () {
      this.$nextTick( () => {
        window.scrollTo(0, 0);
      })
    },
    '$store.state.popup.list' (list) {
      let overflowY = '';
      if (list.length > 0) overflowY = 'hidden';
      document.body.style.overflowY = overflowY;
    },
  },
  data () {
    return {
      initAt: false,
      mode  : ''
    }
  },
  methods: {
    async init () {
      this.$store.commit('toast/set',this.$toast);

      if(await this.appChk()) {
        this.appLogin();
      }else {
        this.login();
      }


    },
    login (){
      this.mode = 'web';
      if (this.$route.name != 'Login') {
        this.$router.push({path: '/'}).catch(()=>{});
      }

      this.initAt = true;
    },
    appLogin (){
      this.mode = 'app';
      if (this.$route.name != 'AppLogin') {
        this.$router.push({path: '/App'}).catch(()=>{});
      }

      this.initAt = true;
    },
    async appChk () {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
  },
  mounted () {
    this.init();
  }
}
</script>

<style>
@import 'assets/css/senior.css';
</style>
