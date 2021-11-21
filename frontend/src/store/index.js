import { createStore } from 'vuex'
import loginStore from "./login"
import popupStore from "./popup"
import toastStore from './toast'
import loadingStore from './loading'
import pageStore from "./page";
import menuStore from "./menu";
import appMenuStore from "./appMenu";


export default createStore({
  modules: {
    login   : loginStore,
    toast   : toastStore,
    popup   : popupStore,
    loading : loadingStore,
    page    : pageStore,
    menu    : menuStore,
    appMenu : appMenuStore
  }
})
