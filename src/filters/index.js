/**
 * 去除首尾空格
 * @param  {[string]} string [字符串]
 * @return {[string]}        [返回处理后数据]
 */
const trim = (string) => {
  return string.toString().replace();
}

const subString = (value, length = 10) => {
  if (value && value != null && value.length > length) {
    return value.substring(0, length)
  }
  return value;
}


export default {
  trim, subString
}
