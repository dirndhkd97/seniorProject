const smartTrfLight = [
  {code: '100', upperCode: '000', level: 1, pageAt: false, nm: '보행자 자동인식 신호기'},
  {code: '110', upperCode: '100', level: 2, pageAt: true , nm: '신호등관리', path: '/TrfLightManage'},
  {code: '120', upperCode: '100', level: 2, pageAt: true , nm: '관리자 설정', path: '/AdminSetting'},
  {code: '130', upperCode: '100', level: 2, pageAt: true , nm: '커뮤니티', path: '/Community'},
]

const menuStore = {
  namespaced: true,
  state: {
    selMenuCode: '',
    menuList : smartTrfLight
  },
  getters: {
    getLocations (state) {
      let locations = []

      const menuInfo =
          state.menuList.find(
              (info) => info.code == state.selMenuCode);
      if(menuInfo){
        if(menuInfo.level == 2){
          const upperMenuInfo =
              state.menuList.find(
                  (info) =>
                      info.code == menuInfo.upperCode);
          locations.push(upperMenuInfo);
        }
        locations.push(menuInfo);
      }
      return locations;
    },
    getSelMenuInfo (state) {
      return state.menuList.find(
          (info) =>
              info.code == state.selMenuCode)
    },
  },
  mutations: {
    initMenu (state) {
      state.menuList.some(
          (menuInfo) => {
            if(menuInfo.pageAt){
              state.selMenuCode = menuInfo.code;
              return true;
            }
            else return false;
          })
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

export default menuStore
