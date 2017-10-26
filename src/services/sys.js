import axios from "../common/axios";
import * as api from "../api";
import defaultValue from "./default";

export function login (params) {
  return new Promise((resolve, reject) => {
    axios.post(api.LOGIN, { params }).then(response => {
      resolve(response.data);
    }, err => {
      resolve(defaultValue.login);
    })
      .catch((error) => {
        resolve(defaultValue.login)
      })
  })
}
export function msgList (params) {
  return new Promise((resolve, reject) => {
    axios.post(api.MSG_TOP_TEN, { params }).then(response => {
      resolve(response.data);
    }, err => {
      resolve(defaultValue.msgList);
    })
      .catch((error) => {
        resolve(defaultValue.msgList)
      })
  })
}


export function menuList (params) {
  return new Promise((resolve, reject) => {
    axios.get(api.SYS_MENU_LIST, { params }).then(response => {
      resolve(response.data);
    }, err => {
      resolve(defaultValue.menuList);
    })
      .catch((error) => {
        resolve(defaultValue.menuList)
      })
  })
}

export function resourceList (params) {
  return new Promise((resolve, reject) => {
    axios.get(api.SYS_RESOURCE_LIST, { params }).then(response => {
      resolve(response.data);
    }, err => {
      resolve(defaultValue.resource);
    })
      .catch((error) => {
        resolve(defaultValue.resource)
      })
  })
}

export function roleList (params) {
  return new Promise((resolve, reject) => {
    axios.get(api.SYS_MENU_LIST, { params }).then(response => {
      resolve(response.data);
    }, err => {
      resolve(defaultValue.roleList);
    })
      .catch((error) => {
        resolve(defaultValue.roleList)
      })
  })
}

export function userList (params) {
  const userList = {total:defaultValue.userList.total,records:defaultValue.userList.records.reverse()}
  return new Promise((resolve, reject) => {
    axios.get(api.SYS_USER_PAGE, { params }).then(response => {
      resolve(response.data);
    }, err => {
      resolve(userList);
    })
      .catch((error) => {
        resolve(userList)
      })
  })
}
