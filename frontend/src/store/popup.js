const popupStore = {
  namespaced: true,
  state: {
    PopupManager: null,
    list: [],
  },
  mutations: {
    setPopupManager (state, info) {
      state.PopupManager = info.component;
    },
    open (state, info) {
      let manager = state.PopupManager;

      manager.open (info.name, info.parent, info.params);
    },
    addPopupList (state, popupId) {
      state.list.push({id:popupId});
    },
    close (state,popupId) {
      let manager = state.PopupManager;

      manager.close(popupId)

      const index = state.list.findIndex((info) => info.id == popupId);
      if(index > -1) state.list.splice(index,1);
    }
  }
}

export default popupStore
