import axios from 'axios';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueAxios from "vue-axios";
import Toaster from '@meforma/vue-toaster';
import VueLoding from 'vue3-loading-overlay';
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';
import PagingNavi from './components/PagingNavi';
import ModalPopupLayout from "@/layout/popup/ModalPopupLayout";


const app = createApp(App);

app.component('PagingNavi', PagingNavi).component('ModalPopupLayout',ModalPopupLayout);

app.use(store).use(router).use(Toaster, {position: "top"})
    .use(VueLoding).use(VueAxios,axios).mount('#app');
