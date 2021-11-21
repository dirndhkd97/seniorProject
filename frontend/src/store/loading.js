const loadingStore = {
  namespaced: true,
  state: {
    object: null,
    msg: '',
  },
  mutations: {
    setObject (state, object){
      state.object = object;
    },
    changeMsg (state,msg) {
      state.msg = msg;
      state.object.setLoadingMsg(state.msg);
    },
    on (state,msg){
      let setMsg = '';
      if(msg != null) setMsg = msg;
      state.object.onLoading(setMsg);
    },
    off (state){
      state.object.offLoading();
    },
  }
}

export default loadingStore
