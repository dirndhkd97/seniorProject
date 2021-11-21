<template>
  <div>
    <article class="box-type01">
      <div class="tit-type1-box">
        <h1 class="tit-type1">현재신호</h1>
        <div>
        </div>
      </div>
      <table class="tb-row">
        <tbody>
        <tr>
          <td class="__center">
            <img v-if="mode == 'red'"
                 src="../../../assets/img/red.png">
            <img v-if="mode == 'green'"
                 src="../../../assets/img/green.png">
          </td>
        </tr>
        </tbody>
      </table>
      <div class="btn-wrap mgt20 center">
        <button class="big bt-purple"
                @click="imgChange_click()">변경</button>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  name: 'TrfLightManage',
  data() {
    return {
      initAt: false,
      mode  : '',
      time : 0,
      timer: null,
    }
  },
  methods: {
    init () {
      this.mode = 'red';
      this.initAt = true;
    },
    imgChange_click () {
      this.$store.commit('loading/on');

      try {
        if(this.mode == 'red') this.mode = 'green';
        else this.mode = 'red';
      } catch (e) {
        console.log(e);
        this.$store.commit('toast/err');
      } finally {
        this.$store.commit('loading/off');
      }
    },
  },
  mounted() {
    this.init();
  }
}
</script>
