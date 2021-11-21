const pageStore = {
  namespaced: true,
  state: {
    path: '',
    beforePath:'',
    layoutSe: '',
    routeView: null,
  },
  mutations: {
    setMeta (state, meta){
      state.path = meta.path;
      state.beforePath = meta.beforePath;
      state.layoutSe = meta.layoutSe;
    },
    setRouteView (state, routeView) {
      state.routeView = routeView;
    }
  }
}

export default pageStore