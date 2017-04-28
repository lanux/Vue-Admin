/**
 * Created by lanux on 2017/3/13.
 */
export default [
  {"id":1,"parentId":null,"sort":0,"name":"仪表盘","href":"/index","icon":"fa fa-dashboard","children":[]},
  {"id":31,"parentId":null,"sort":1,"name":"上传图片","href":"/img/upload","icon":"fa fa-upload","children":
      [
          {"id":92,"parentId":31,"sort":0,"name":"临时上传","href":"/img/upload/tmp","icon":"fa fa-bank","children":[]},
          {"id":93,"parentId":31,"sort":0,"name":"批量上传","href":"/img/upload/batch","icon":"fa fa-area-chart","children":[]}
      ]
  },
  {"id":97,"parentId":null,"sort":2,"name":"图片处理","href":"/img/process","icon":"fa fa-file-picture-o","children":
      [
        {"id":100,"parentId":97,"sort":1,"name":"模板配置","href":"/img/process/templateList","icon":"fa fa-beer","children":[]},
        {"id":99,"parentId":97,"sort":2,"name":"批量处理","href":"/img/process/advance","icon":"fa fa-battery-2","children":[]},
        {"id":101,"parentId":97,"sort":3,"name":"目录处理","href":"/img/process/advanceDir","icon":"fa fa-birthday-cake","children":[]}
      ]
  },
  {"id":102,"parentId":null,"sort":3,"name":"图片输出","href":"/img/export","icon":"fa fa-download","children":
      [
        {"id":103,"parentId":102,"sort":0,"name":"图片预览","href":"/img/export/preview","icon":"fa fa-image","children":[]}
      ]
  },
  {"id":6,"parentId":null,"sort":6,"name":"系统管理","href":"/sys","icon":"el-icon-setting","children":
      [
        {"id":108,"parentId":6,"sort":0,"name":" 资源管理","href":"/sys/resource","icon":"fa fa-database","children":[]},
        {"id":7,"parentId":6,"sort":1,"name":"菜单管理","href":"/sys/menuList","icon":"fa fa-navicon","children":[]},
        {"id":8,"parentId":6,"sort":2,"name":"角色管理","href":"/sys/roleList","icon":"fa fa-universal-access","children":[]},
        {"id":9,"parentId":6,"sort":3,"name":"用户管理","href":"/sys/userList","icon":"fa fa-user-plus","children":[]}
      ]
  }]
// export default [
//   {"name": "关于我们", "href": "/activePublic", "icon": "fa fa-tag"},
//   {"name": "上传文件", "href": "/uploadFile", "icon": "fa fa-heart"},
//   {
//     "name": "系统管理", "href": "3", "icon": "el-icon-setting", "children": [
//     {"name": "用户管理", "href": "31", "icon": "fa fa-user-circle-o"},
//     {"name": "菜单管理", "href": "/menuList", "icon": "el-icon-star-on"},
//     {
//       "name": "角色管理", "href": "33", "icon": "fa fa-envelope-o", "children": [
//       {"name": "子菜单1", "href": "331", "icon": "fa fa-user-circle-o"},
//       {
//         "name": "332", "href": "332", "icon": "el-icon-star-on", "children": [
//         {"name": "3321", "href": "3321", "icon": "fa fa-user-circle-o"},
//         {"name": "3322", "href": "3322", "icon": "el-icon-star-on"},
//         {"name": "3323", "href": "3323", "icon": "fa fa-envelope-o"},
//         {"name": "3324", "href": "3324", "icon": "fa fa-user-circle-o"},
//         {"name": "3325", "href": "3325", "icon": "el-icon-star-on"},
//         {"name": "3326", "href": "3326", "icon": "fa fa-envelope-o"}
//       ]
//       },
//       {"name": "子菜单3", "href": "333", "icon": "fa fa-envelope-o"}
//     ]
//     }
//   ]
//   },
//   {"name": "图片仪表盘", "href": "4", "icon": "el-icon-more"}
// ]
