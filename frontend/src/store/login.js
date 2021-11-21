const loginStore = {
  namespaced: true,
  state: {
    at: false,
    mberInfo: {
      mberInnb: '',
      id: '',
      mberNm: '',
    },
  },
  mutations: {
    setLoginMberInfo (state,mberInfo){
      let loginMberInfo = state.mberInfo;

      loginMberInfo.mberInnb = mberInfo.MBER_INNB;
      loginMberInfo.id       = mberInfo.ID;
      loginMberInfo.mberNm   = mberInfo.MBER_NM;
    },
    setLoginAt (state,loginAt){
      state.at = loginAt;
    },
    clearLoginInfo (state){
      state.at = false;
      state.mberInfo = {
        mberInnb: '',
        id: '',
        mberNm: '',
      };
    },
  },
  actions: {
    async login ({commit}, loginInfo){
      const mberInfo = loginInfo.mberInfo;
      commit('setLoginMberInfo', mberInfo);
      commit('setLoginAt'      , true);
    },
    async logout ({commit}){
      commit('clearLoginInfo');
    },
  }
}

export default loginStore;
