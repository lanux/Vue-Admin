import 'babel-polyfill'
import axios from "axios";
import auth from "./auth";
import {getBaseUrl} from "./common/utils"

const instance = axios.create();

instance.interceptors.response.use(
  response => {
    if (response.data && response.data.code) {
      if (response.data.code === '2001') {
        auth.logout()
      }
    }
    return response;
  },
  error => {
    if (error.response) {
      //全局ajax错误信息提示
      //Element.MessageBox({type:"error",message:error.response.data,title:"温馨提示"});
    }
    return Promise.reject(error);
  });

function plugin(Vue)
{
  if (plugin.installed) {
    return;
  }
  // instance.defaults.baseURL = 'https://www.baidu.com';
  instance.defaults.baseURL = getBaseUrl(window.location.href);
  instance.defaults.headers.common['authUid'] = auth.getUid();
  instance.defaults.headers.common['authSid'] = auth.getSid();

  Vue.prototype.$http = instance
  Vue.axios = instance
  Vue.http = instance;
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}

export default plugin;
