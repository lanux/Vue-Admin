import Vue from "vue";
import Vuex from "vuex";
import * as types from "./mutation-types";
import defaultMenu from "./default-menu";
// import app from './modules/app'
// import menu from './modules/menu'
import * as api from "../api";

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: true,  // process.env.NODE_ENV !== 'production', 直接修改state 抛出异常

  getters: {
    loading: state => state.loading,
    menuList: state => state.menuList,
    sidebar: state => state.sidebar,
    userInfo:state => state.userInfo,
    device:state => state.device,
  },
  // modules: {
  //   app,
  //   menu
  // },
  state: {
    loading: false,
    menuList: {},
    sidebar: {
      collapsed: false,
      show:true,
    },
    device: {
      isMobile: false
    },
    userInfo:{name:'佚名'}
  },
  mutations: {
    //只能同步的函数
    [types.TOGGLE_DEVICE] (state, isMobile) {
      state.device.isMobile = isMobile
    },
    [types.TOGGLE_LOADING] (state) {
      state.loading = !state.loading
    },
    [types.LOAD_MENU] (state, menu) {
      state.menuList = menu;
    },
    [types.SET_USER_INFO] (state, info) {
      state.userInfo = info;
    },
    [types.TOGGLE_SIDEBAR] (state, collapsed) {
      if (collapsed == null) collapsed = !state.sidebar.collapsed;
      state.sidebar.collapsed = collapsed;
    },
    [types.TOGGLE_SIDEBAR_SHOW] (state,show) {
      if (show == null) state.sidebar.show = !state.sidebar.show;
      else{
        state.sidebar.show = show;
      }
    },
  }, actions: {
    //异步的函数
    toggleLoading: ({commit}) => commit(types.TOGGLE_LOADING),
    loadMenuList: ({commit}) => {
      Vue.axios.get(api.TEST_DATA).then(res => {
        commit(types.LOAD_MENU, res.data.menuList);
      }).catch(exp => commit(types.LOAD_MENU, defaultMenu));
    }
  },
})

export default store
