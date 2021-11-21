<template>
  <header id="top-header">
    <section class="gnb">
      <h1><button><img src="../../assets/img/trfLight.png" alt="light" style="width: 35px;"/></button></h1>
      <div class="util">
        <span>{{ mberInfo.mberNm }} ( {{ mberInfo.id }} ) </span>
        <button class="bt-white" @click="logout_click()"><span>로그아웃</span></button>
      </div>
    </section>
  </header>
</template>

<script>
export default {
  name: 'BasicTopHeader',
  computed: {
    mberInfo () {
      return this.$store.state.login.mberInfo;
    },
  },
  data () {
    return {}
  },
  methods: {
    init() {
    },
    async logout_click (){
      try {
        this.$store.state.page.layoutSe = '';
        this.$store.dispatch('login/logout');
        this.$router.push({path: '/'}).catch(()=>{});
        this.$store.commit('toast/suc','로그아웃 되었습니다.');
      } catch (e) {
        console.log(e);
        this.$store.commit('toast/err');
      }

    },
  },
  mounted() {
    this.init();
  }
}
</script>

<style scoped>
</style>
