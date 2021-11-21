<template>
  <div>
    <template v-for="(info,index) in popupList"
              v-bind:key="'popup' + index">
      <component v-bind:is="info.name"
                 :popupId="info.id"
                 :popupParent="info.parent"
                 :popupParams="info.params">
      </component>
    </template>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { v1 as uuidv1 } from 'uuid';

const ConfirmPopup = defineAsyncComponent(() => import('../popup/ConfirmPopup'));

export default {
  name: 'PopupManager',
  components: {
    ConfirmPopup,
  },
  data() {
    return {
      popupList: []
    }
  },
  methods: {
    init() {
      this.$store.commit(
          'popup/setPopupManager', {component:this});
    },
    getPopupId () {
      const v1options = {
        node: [0x01, 0x23, 0x45, 0x67, 0x89, 0xab],
        clockseq: 0x1234,
        msecs: new Date().getTime(),
        nsecs: 5678,
      };
      return uuidv1(v1options);
    },
    open (name, parent, params) {
      const popupId = this.getPopupId();

      this.popupList.push({
        name: name,
        id: popupId,
        parent : parent,
        params: params
      })

      this.$store.commit('popup/addPopupList',popupId);
    },
    close (popupId) {
      const index = this.popupList.findIndex((info) => info.id == popupId);
      if(index > -1) this.popupList.splice(index,1);
    }
  },
  mounted() {
    this.init();
  }
}
</script>

<style scoped>
</style>
