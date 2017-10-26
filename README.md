>友情链接：[**【react-admin】**](https://github.com/lanux/react-admin)持续更新 [演示地址](https://lanux.github.io/react-admin/)

[演示地址](https://lanux.github.io/Vue-Admin/ "Vue-Admin")
>账号密码任意

## Build Setup
``` bash
npm install
# serve with hot reload at localhost:9000
npm run dev
npm run build

npm run mock
```

1. **启动mock服务**
npm run mock
2. **启动dev server**
npm run dev


- #### 打包发布,修改根路径名
1. 修改 **[./Vue-Admin/config/index.js](https://github.com/lanux/Vue-Admin/blob/master/config/index.js)**   参数:build.assetsPublicPath
```javascript
//eg.  assetsPublicPath: '/Vue-Admin/'
assetsPublicPath: 'Your path name';
```
2. 修改 **[./Vue-Admin/src/api.js](https://github.com/lanux/Vue-Admin/blob/master/src/api.js)**
```javascript
// export const CONTEXT = './Vue-Admin';
export const CONTEXT = 'Your path name';
```


```
cnpm i json-server -D
cnpm i json-server -S
npm outdated：检查包是否已经过时，此命令会列出所有已经过时的包，可以及时进行包的更新
npm update moduleName：更新node模块
npm uninstall moudleName：卸载node模块

```

## 页面截图

<p><img src="https://raw.githubusercontent.com/lanux/Vue-Admin/master/static/data/login.png?t=1" /></p>
<p><img src="https://raw.githubusercontent.com/lanux/Vue-Admin/master/static/data/cmenu.png?t=1" /></p>
<p><img src="https://raw.githubusercontent.com/lanux/Vue-Admin/master/static/data/dash.png?t=1" /></p>
<p><img src="https://raw.githubusercontent.com/lanux/Vue-Admin/master/static/data/dash2.png?t=1" /></p>
<p><img src="https://raw.githubusercontent.com/lanux/Vue-Admin/master/static/data/menu.png?t=1" /></p>
<p><img src="https://raw.githubusercontent.com/lanux/Vue-Admin/master/static/data/menu2.png?t=1" /></p>
<p><img src="https://raw.githubusercontent.com/lanux/Vue-Admin/master/static/data/menu5.png?t=1" /></p>
<p><img src="https://raw.githubusercontent.com/lanux/Vue-Admin/master/static/data/resource.png?t=1" /></p>
<p><img src="https://raw.githubusercontent.com/lanux/Vue-Admin/master/static/data/role.png?t=1" /></p>
<p><img src="https://raw.githubusercontent.com/lanux/Vue-Admin/master/static/data/role4.png?t=1" /></p>
<p><img src="https://raw.githubusercontent.com/lanux/Vue-Admin/master/static/data/user.png?t=1" /></p>
<p><img src="https://raw.githubusercontent.com/lanux/Vue-Admin/master/static/data/user2.png?t=1" /></p>
<p><img src="https://raw.githubusercontent.com/lanux/Vue-Admin/master/static/data/mobile.png?t=1" /></p>
