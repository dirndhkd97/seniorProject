const toastStore = {
  namespaced: true,
  state: {
    component: null,
    options: {
      message: '통신상태가 원활하지 않습니다. 새로고침이 필요합니다.',
      type: 'error',
      position: 'top',
      duration: 3000
    },

  },
  mutations: {
    set (state,component){
      state.component = component;
    },
    err (state,message) {
      if (message) state.component.error(message);
      else state.component.error(state.options.message);
    },
    suc (state,message) {
      if (message) state.component.success(message);
      else state.component.success(state.options.message);
    },
    warn (state,message) {
      if (message) state.component.warning(message);
      else state.component.warning(state.options.message);
    },
    info (state,message) {
      if (message) state.component.info(message);
      else state.component.info(state.options.message);
    },
  }
}

export default toastStore;
