const smartTrfLight = [
  {code: '100', level: 1, pageAt: true , nm: '신호등관리', path: '/AppTrfLightManage'},
  {code: '200', level: 1, pageAt: true , nm: '관리자 설정', path: '/AppAdminSetting'},
  {code: '300', level: 1, pageAt: true , nm: '커뮤니티', path: '/AppCommunity'},
]

const appMenuStore = {
  namespaced: true,
  state: {
    selMenuCode: '',
    menuList : smartTrfLight
  },
  getters: {
    getSelMenuInfo (state) {
      return state.menuList.find(
          (info) =>
              info.code == state.selMenuCode)
    },
  },
  mutations: {
    initMenu (state) {
      state.selMenuCode = '100';
    },
    setMenuList (state, menuList) {
      state.menuList = menuList;
    },
    selMenu (state, code) {
      state.selMenuCode = code;
    }
  },
  actions: {
    async initMenu ({commit}){
      commit('initMenu');
    }
  }
}

export default appMenuStore
