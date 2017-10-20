import pathToRegexp from "path-to-regexp";

export const getSessionKey = (key, defaultValue) => {
  const item = window.sessionStorage.getItem(key);
  if (item == undefined && defaultValue != undefined) {
    return defaultValue
  }
  return item;
}

export const getBaseUrl = (url) => {
  var reg = /^((\w+):\/\/([^\/:]*)(?::(\d+))?)(.*)/;
  reg.exec(url);
  return RegExp.$1;
}

export const keyMirror = (obj) => {
  let key
  let mirrored = {}
  if (obj && typeof obj === 'object') {
    for (key in obj) {
      if ({}.hasOwnProperty.call(obj, key)) {
        mirrored[ key ] = key
      }
    }
  }
  return mirrored
}

/**
 * 数组格式转树状结构
 * @param   {array}     array
 * @param   {String}    id
 * @param   {String}    pid
 * @param   {String}    children
 * @return  {Array}
 */
export const arrayToTree = (array, id = 'id', pid = 'pid', children = 'children') => {
  let data = array.map(item => ({ ...item }))
  let result = []
  let hash = {}
  data.forEach((item, index) => {
    hash[ data[ index ][ id ] ] = data[ index ]
  })

  data.forEach((item) => {
    let hashVP = hash[ item[ pid ] ]
    if (hashVP) {
      !hashVP[ children ] && (hashVP[ children ] = [])
      hashVP[ children ].push(item)
    } else {
      result.push(item)
    }
  })
  return result
}

export function getCurrentMenu (location, arrayMenu) {
  if (!!arrayMenu) {
    let current = []
    for (let i = 0; i < arrayMenu.length; i++) {
      const e = arrayMenu[ i ];
      const child = getCurrentMenu(location, e.children);
      if (!!child && child.length > 0) {
        child.push({ ...e, children: null });
        return child;
      }
      if (e.href && pathToRegexp(e.href).exec(location)) {
        current.push({ ...e, children: null });
        return current;
      }
    }
    return current;
  }
  return null;
}

