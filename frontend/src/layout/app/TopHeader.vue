<template>
  <header style="{ position: fixed; top: 0px; left: 0px; width: 100vw; height: 40px; background: #2a3954; z-index: 99; -webkit-box-sizing: border-box; box-sizing: border-box; }">
    <section style="{ position: relative; display:flex; flex-direction: row; align-items: center; padding:0 20px; height: 40px; box-sizing: border-box;}">
      <h1><button><img src="../../assets/img/trfLight.png" alt="light" style="width: 35px;"/></button></h1>
      <div style="{ display:flex; flex-direction: row; align-items: center; margin-left:auto; font-size:13px; color:#fff; }">
        <span>{{ mberInfo.mberNm }} ( {{ mberInfo.id }} ) </span>
        <button class="bt-white"
                style="{ margin-left:10px; padding:3px 10px 2px; border-radius:100px; font-size:11px; }"
                @click="logout_click()"><span>로그아웃</span></button>
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
        this.$router.push({path: '/App'}).catch(()=>{});
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
