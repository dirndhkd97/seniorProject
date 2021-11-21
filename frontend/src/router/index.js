import { createRouter, createWebHistory } from 'vue-router'

const LoginRoutes = [
  {
    path: '/',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Web/Login.vue')
  },
  {
    path: '/App',
    name: 'AppLogin',
    component: () => import(/* webpackChunkName: "about" */ '../views/App/AppLogin.vue')
  },
]

const TrfLightName = 'TrfLightManage';
const TrfLightRoutes = [
  {
    path: '/' + TrfLightName,
    component:
        () => import('../views/Web/TrfLightManage/TrfLightManage.vue'),
  }
]

const AdminName = 'AdminSetting';
const AdminRoutes = [
  {
    path: '/' + AdminName,
    component:
        () => import('../views/Web/AdminSetting/AdminSetting.vue'),
    children: [
      {
        path: '',
        name: AdminName,
        component:
            () => import('../views/Web/AdminSetting/AdminSettingList.vue'),
      },
      {
        path: 'Write/:mode',
        name: AdminName + 'Regist',
        component:
            () => import( '../views/Web/AdminSetting/AdminSettingWrite.vue'),
      },
      {
        path: 'Write/:mode/:mberInnb',
        name: AdminName + 'Modify',
        component:
            () => import( '../views/Web/AdminSetting/AdminSettingWrite.vue'),
      },
    ]
  }
]

const CommunityName = 'Community';
const CommunityRoutes = [
  {
    path: '/' + CommunityName,
    component:
        () => import('../views/Web/Community/Community.vue'),
    children: [
      {
        path: '',
        name: CommunityName,
        component:
            () => import('../views/Web/Community/CommunityList.vue'),
      },
      {
        path: 'Detail/:communitySn',
        name: CommunityName + 'Detail',
        component:
            () => import('../views/Web/Community/CommunityDetail.vue'),
      },
      {
        path: 'Write/:mode',
        name: CommunityName + 'Regist',
        component:
            () => import( '../views/Web/Community/CommunityWrite.vue'),
      },
      {
        path: 'Write/:mode/:communitySn',
        name: CommunityName + 'Modify',
        component:
            () => import( '../views/Web/Community/CommunityWrite.vue'),
      },
    ]
  }
]

const AppTrfLightName = 'AppTrfLightManage';
const AppTrfLightRoutes = [
  {
    path: '/' + AppTrfLightName,
    component:
        () => import('../views/App/AppTrfLightManage/TrfLightManage.vue'),
  }
]

const AppAdminName = 'AppAdminSetting';
const AppAdminRoutes = [
  {
    path: '/' + AppAdminName,
    component:
        () => import('../views/App/AppAdminSetting/AdminSetting.vue'),
    children: [
      {
        path: '',
        name: AppAdminName,
        component:
            () => import('../views/App/AppAdminSetting/AdminSettingList.vue'),
      },
      {
        path: 'Write/:mode',
        name: AppAdminName + 'Regist',
        component:
            () => import( '../views/App/AppAdminSetting/AdminSettingWrite.vue'),
      },
      {
        path: 'Write/:mode/:mberInnb',
        name: AppAdminName + 'Modify',
        component:
            () => import( '../views/App/AppAdminSetting/AdminSettingWrite.vue'),
      },
    ]
  }
]

const AppCommunityName = 'AppCommunity';
const AppCommunityRoutes = [
  {
    path: '/' + AppCommunityName,
    component:
        () => import('../views/App/AppCommunity/Community.vue'),
    children: [
      {
        path: '',
        name: AppCommunityName,
        component:
            () => import('../views/App/AppCommunity/CommunityList.vue'),
      },
      {
        path: 'Detail/:communitySn',
        name: AppCommunityName + 'Detail',
        component:
            () => import('../views/App/AppCommunity/CommunityDetail.vue'),
      },
      {
        path: 'Write/:mode',
        name: AppCommunityName + 'Regist',
        component:
            () => import( '../views/App/AppCommunity/CommunityWrite.vue'),
      },
      {
        path: 'Write/:mode/:communitySn',
        name: AppCommunityName + 'Modify',
        component:
            () => import( '../views/App/AppCommunity/CommunityWrite.vue'),
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: LoginRoutes
      .concat(TrfLightRoutes)
      .concat(AdminRoutes)
      .concat(CommunityRoutes)
      .concat(AppTrfLightRoutes)
      .concat(AppAdminRoutes)
      .concat(AppCommunityRoutes)
})


export default router
