<template>
  <div class="loading-wrap"
       v-if="loadingAt">
    <vue-loading :active="true"
                 :is-full-page="true"
                 :color="'#1A355B'"
                 :backgroundColor="'#D7D7D7'"
                 :opacity="0.6"
                 :loader="'dots'"
                 :lockScroll="true"
                 :width="90"/>
    <div class="loading-msg-wrap">
      <div class="loading-msg-content"
           v-html="loadingMsg">
      </div>
    </div>
  </div>
</template>

<script>
// Import stylesheet
import vueLoading from 'vue3-loading-overlay';
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';

export default {
  name: 'loading',
  components: {
    vueLoading
  },
  data() {
    return {
      loadingAt: false,
      defaultLoadingMsg: '잠시만 기다려주세요.',
      loadingMsg: '',
    }
  },
  methods: {
    init() {
      this.$store.commit('loading/setObject',this);
      this.loadingMsg = this.defaultLoadingMsg;
    },
    setLoadingMsg(loadingMsg) {
      this.loadingMsg = loadingMsg;
    },
    onLoading(loadingMsg) {
      if (loadingMsg) this.loadingMsg = loadingMsg;
      this.loadingAt = true;
    },
    offLoading() {
      this.loadingAt = false;
      this.loadingMsg = this.defaultLoadingMsg;
    },
  },
  mounted() {
    this.init();
  }
}
</script>

<style scoped>
.loading-wrap {
  text-align: center;
  height: 100%;
  width: 100%;
  z-index: 10003;
  position: fixed;
  left: 0;
  top: 0;
}

.loading-wrap .loading-msg-wrap {
  display: flex;
  justify-content: center;
  position: absolute;
  align-items: center;
  text-align: center;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
}

.loading-wrap .loading-msg-wrap .loading-msg-content {
  position: relative;
  display: block;
  padding-top: 100px;
  font-size: 20px;
  font-weight: bold;
}
</style>
