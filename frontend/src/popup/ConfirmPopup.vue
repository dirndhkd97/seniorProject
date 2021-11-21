<template>
  <modal-popup-layout ref="modalPopupLayout"
                      :set-container-style="setContainerStyle"
                      :popup-id="popupId"
                      v-if="initAt">
    <div id="layer-wrap"><!-- 너비지정 -->
      <div class="layer-content"
           style="max-height: 600px; overflow: auto">
        <div v-html="confirmMsg"></div>
        <div class="mgt20 __center">
          <button class="middle"
                  v-for="(info,index) in btnList"
                  :key="'confirmBtn' + index"
                  :class="info.class"
                  @click="btn_click(info)">
            <span>{{ info.title }}</span>
          </button>
        </div>
      </div>
    </div>
  </modal-popup-layout>
</template>

<script>
/*
  popupParams 속성
   - msgHtml: cofirm 내용 (* 필수)
   - width: cofirm 가로 크기
   - okTitle: 확인 버튼 명칭,
   - okFunc: 확인 버튼 클릭 시 호출 함수 (* 필수),
   - okParams: 확인 버튼 클릭 시 호출 함수 넘길 파라미터값,
   - cancelTitle:  취소 버튼 명칭,
   - cancelFunc: 취소 버튼 클릭 시 호출 함수,
   - cancelParams: 확인 버튼 클릭 시 호출 함수 넘길 파라미터값,
* */
export default {
  name: 'ConfirmPopup',
  props: {
    popupId: String,
    popupParent: Object,
    popupParams: Object,
  },
  data () {
    return {
      initAt: false,
      setContainerStyle:{
        width: '400px'
      },
      confirmMsg: '',
      btnList: [
        {
          type:'ok',
          title:'확인',
          class: 'bt-blue',
          callback:{
            func: null,
            params: null,
          }
        },
        {
          type:'cencel',
          title:'취소',
          class: 'bt-white mgl5',
          callback:{
            func: null,
            params: null,
          }
        },
      ]
    }
  },
  methods: {
    init () {
      const params = this.popupParams;

      if(!params){
        this.$store.commit('toast/err','ConfirmPopup은 params 가 필수입니다. (msgHtml: confrim 내용, okFunc: 확인버튼 클릭 함수)')
        this.close();
        return false;
      } else {
        let msg = '';
        let validAt = false;

        if(!params.msgHtml){
          msg = 'msgHtml 누락 : confirm 내용은 필수 파라미터 입니다.';
          validAt = true;
        }

        if(!params.okFunc&&!validAt){
          msg = 'okFunc 누락 : 확인 버튼 클릭 시 호출 함수 파라미터 입니다.';
          validAt = true;
        }

        if(validAt){
          this.$store.commit('toast/err',msg)
          this.close();
          return false;
        }
      }

      this.confirmMsg   = params.msgHtml;
      if(this.width) this.setContainerStyle.width = this.width;

      let okBtnInfo     = this.btnList[0];
      let cancelBtnInfo = this.btnList[1];

      if(params.okTitle ) okBtnInfo.title = params.okTitle;
      if(params.okFunc  ) okBtnInfo.callback.func   = params.okFunc;
      if(params.okParams) okBtnInfo.callback.params = params.okParams;

      if(params.cancelTitle ) cancelBtnInfo.title = params.cancelTitle;
      if(params.cancelFunc  ) cancelBtnInfo.callback.func   = params.cancelFunc;
      if(params.cancelParams) cancelBtnInfo.callback.params = params.cancelParams;

      this.initAt = true;
    },
    close () {
      this.$store.commit('popup/close',this.popupId);
    },
    btn_click (info) {
      const type   = info.type;
      const func   = info.callback.func;
      const params = info.callback.params;

      this.close();

      if (func) { func(params, type); }

    }
  },
  mounted () {
    this.init();
  }
}
</script>

<style scoped>

</style>
