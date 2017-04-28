<template>
  <header class="main-header animated">

    <!-- Logo -->
    <a href="#" class="logo">
      <!-- mini logo for sidebar mini 50x50 pixels -->
      <span class="logo-mini"><b>A</b>LT</span>
      <!-- logo for regular state and mobile devices -->
      <span class="logo-lg">&nbsp;&nbsp; <b>Vue-Admin</b></span>
    </a>

    <!-- Header Navbar: style can be found in header.less -->
    <nav class="navbar navbar-static-top">
      <!-- Sidebar toggle button-->
      <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button"
         @click.stop.prevent="toggleSidebar(!sidebar.opened)">
        <span class="sr-only">Toggle navigation</span>
      </a>
      <!-- Navbar Right Menu -->
      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">
          <!-- Messages: style can be found in dropdown.less-->
          <li class="dropdown messages-menu">
            <a href="#" class="dropdown-toggle" @click.stop.prevent="showMessageBox=!showMessageBox">
              <i class="fa fa-envelope-o"></i>
              <span class="label label-success">{{count}}</span>
            </a>
            <ul class="dropdown-menu" v-if="showMessageBox">
              <li class="header">您有{{count}}条消息</li>
              <li>
                <!-- inner menu: contains the actual data -->
                <ul class="menu">
                  <li v-for="item in list"><!-- start message -->
                    <router-link :to="{path:'/img/process/result',query:{id:item.entityId}}">
                      <p>{{item.title}}</p>
                    </router-link>
                  </li>
                </ul>
              </li>
              <li><a href="#">查看所有</a></li>
            </ul>
          </li>
          <!-- User Account: style can be found in dropdown.less -->
          <li class="dropdown user user-menu">
            <a href="#" class="dropdown-toggle" @click.stop.prevent="showProfileBox=!showProfileBox">
              <img src="../../../static/img/user2-160x160.jpg" class="user-image" alt="User Image">
              <span class="hidden-xs">{{userInfo.name}}</span>
            </a>
            <ul class="dropdown-menu" v-if="showProfileBox">
              <!-- User image -->
              <li class="user-header">
                <img src="../../../static/img/user2-160x160.jpg" class="img-circle" alt="User Image">
                <p>
                  {{userInfo.name}} - Web Developer
                </p>
              </li>
              <!-- Menu Body -->
              <li class="user-body">
                <div class="row">
                  <div class="col-xs-4 text-center">
                    <a href="#">Followers</a>
                  </div>
                </div>
                <!-- /.row -->
              </li>
              <!-- Menu Footer-->
              <li class="user-footer">
                <div class="pull-left">
                  <router-link :to="{ path: '/resetPwd' }">
                    <el-button type="default">修改密码</el-button>
                  </router-link>
                </div>
                <div class="pull-right">
                  <el-button type="default" @click="logout">退出</el-button>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>

    </nav>

  </header>
</template>
<script>
  import {mapGetters, mapActions, mapMutations} from 'vuex'
  import * as types from "../../store/mutation-types"
  import * as api from "../../api"
  import  auth from '../../auth'
  export default {
    data(){
      return {
        showMessageBox: false,
        showProfileBox: false,
        list: [],
        count: 4,
      }
    },
    computed: mapGetters({
      sidebar: 'sidebar',
      userInfo: 'userInfo'
    }),
    methods: {
      logout(){
        this.$http.get("./static/data/data.json")
          .then(res => {
            auth.logout();
            this.$http.defaults.headers.common['authSid'] = '';
            this.$router.push({path: '/login'});
          })
      },
      ...mapMutations({toggleSidebar: types.TOGGLE_SIDEBAR, setUserInfo: types.SET_USER_INFO}),
      toggleMessage(){
        this.showMessageBox = !this.showMessageBox;
      },
      toggleProfile(){
        this.showProfileBox = !this.showProfileBox;
      },
      autoHide(evt) {
        if (!this.$el.querySelector('li.messages-menu').contains(evt.target)) {
          this.showMessageBox = false
        }
        if (!this.$el.querySelector('li.user-menu').contains(evt.target)) {
          this.showProfileBox = false
        }
      }
    },
    created(){
      let item = window.sessionStorage.getItem("user-info");
      if (!!item){
          this.setUserInfo(JSON.parse(item));
      }
      this.count = 0;
      this.list = [];
      this.$http.get("./static/data/data.json")
        .then(res => {
            res.data = res.data.messageList;
            if (res.data && res.data.length>0){
                this.count = res.data.length;
                this.list = res.data;
            }
        })
    },
    mounted() {
      document.addEventListener('click', this.autoHide, false)
    },
    destroyed() {
      document.removeEventListener('click', this.autoHide, false)
    }
  }
</script>
<style scoped>
  .animated {
    animation-duration: .5s;
  }

  .main-header a {
    text-decoration: none;
  }

  .main-header {
    position: fixed;
    min-width: 100%;
    box-shadow: 0 2px 3px hsla(0, 0%, 7%, .1), 0 0 0 1px hsla(0, 0%, 7%, .1);
    z-index: 1030;
    animation-name: slideInDown;
    animation-fill-mode: both;
  }

  .main-header .navbar .sidebar-toggle {
    float: left;
    background-color: transparent;
    background-image: none;
    padding: 15px 15px;
    font-family: fontAwesome;
    line-height: 20px;
  }

  .main-header .navbar .sidebar-toggle:before {
    content: "\f0c9";
  }

  .main-header .navbar .sidebar-toggle:hover {
    color: #fff;
  }

  .main-header .navbar .sidebar-toggle:focus,
  .main-header .navbar .sidebar-toggle:active {
    background: transparent;
  }

  .main-header .navbar .nav > li > a > .label {
    position: absolute;
    top: 9px;
    right: 7px;
    text-align: center;
    font-size: 9px;
    padding: 2px 3px;
    line-height: .9;
  }

  .main-header .logo {
    -webkit-transition: width 0.3s ease-in-out;
    -o-transition: width 0.3s ease-in-out;
    transition: width 0.3s ease-in-out;
    display: block;
    float: left;
    height: 50px;
    font-size: 20px;
    line-height: 50px;
    text-align: center;
    width: 230px;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    padding: 0 15px;
    font-weight: 300;
    overflow: hidden;
    text-decoration: none;
  }

  .main-header .logo .logo-lg {
    display: block;
    background-image: url("../../../static/img/foot_icon.png");
    background-repeat: no-repeat;
    background-position: 15px -6px;
    height: 38px;
    line-height: 38px;
    margin-top: 6px;
  }

  .main-header .logo .logo-mini {
    display: none;
  }

  .main-header .navbar {
    -webkit-transition: margin-left 0.3s ease-in-out;
    -o-transition: margin-left 0.3s ease-in-out;
    transition: margin-left 0.3s ease-in-out;
    margin-bottom: 0;
    margin-left: 230px;
    border: none;
    min-height: 50px;
    border-radius: 0;
  }

  .layout-top-nav .main-header .navbar {
    margin-left: 0;
  }

  .main-header .navbar-custom-menu {
    float: right;
  }

  /* Fix dropdown menu in navbars */
  .navbar-custom-menu > .navbar-nav > li {
    position: relative;
  }

  .navbar-custom-menu > .navbar-nav > li > .dropdown-menu {
    position: absolute;
    right: 0;
    left: auto;
  }

  .nav {
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
  }

  .navbar-nav > li > a {
    padding-top: 10px;
    padding-bottom: 10px;
    line-height: 20px;
  }

  .nav > li > a {
    position: relative;
    display: block;
    padding: 10px 15px;
  }

  .navbar-nav > li {
    float: left;
  }

  .navbar-nav > li > a {
    padding-top: 15px;
    padding-bottom: 15px;
  }

  .open > a {
    outline: 0;
  }

  .label {
    display: inline;
    padding: .2em .6em .3em;
    font-size: 75%;
    font-weight: 700;
    line-height: 1;
    color: #fff;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: .25em;
  }

  .label-success {
    background-color: #5cb85c;
  }

  .navbar-nav > li > .dropdown-menu {
    margin-top: 0;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

  .open > .dropdown-menu {
    display: block;
  }

  .dropdown-menu {
    box-shadow: none;
    border-color: #eee;
  }

  .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1000;
    display: none;
    float: left;
    min-width: 160px;
    padding: 5px 0;
    margin: 2px 0 0;
    font-size: 14px;
    text-align: left;
    list-style: none;
    background-color: #fff;
    -webkit-background-clip: padding-box;
    background-clip: padding-box;
    border: 1px solid #ccc;
    border: 1px solid rgba(0, 0, 0, .15);
    border-radius: 4px;
    -webkit-box-shadow: 0 6px 12px rgba(0, 0, 0, .175);
    box-shadow: 0 6px 12px rgba(0, 0, 0, .175);
  }

  /*Dropdowns in general*/
  .dropdown-menu {
    box-shadow: none;
    border-color: #eee;
  }

  .dropdown-menu > li > a {
    color: #777;
  }

  .dropdown-menu > li > a:hover {
    background-color: #e1e3e9;
    color: #333;
  }

  .navbar-nav > .notifications-menu > .dropdown-menu,
  .navbar-nav > .messages-menu > .dropdown-menu,
  .navbar-nav > .tasks-menu > .dropdown-menu {
    width: 280px;
    padding: 0 0 0 0;
    margin: 0;
    top: 100%;
  }

  .navbar-nav > .notifications-menu > .dropdown-menu > li,
  .navbar-nav > .messages-menu > .dropdown-menu > li,
  .navbar-nav > .tasks-menu > .dropdown-menu > li {
    position: relative;
  }

  .navbar-nav > .notifications-menu > .dropdown-menu > li.header,
  .navbar-nav > .messages-menu > .dropdown-menu > li.header,
  .navbar-nav > .tasks-menu > .dropdown-menu > li.header {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
    background-color: #ffffff;
    padding: 7px 10px;
    border-bottom: 1px solid #f4f4f4;
    color: #444444;
    font-size: 14px;
  }

  .navbar-nav > .notifications-menu > .dropdown-menu > li.footer > a,
  .navbar-nav > .messages-menu > .dropdown-menu > li.footer > a,
  .navbar-nav > .tasks-menu > .dropdown-menu > li.footer > a {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 4px;
    border-bottom-left-radius: 4px;
    font-size: 12px;
    background-color: #fff;
    padding: 7px 10px;
    border-bottom: 1px solid #eeeeee;
    color: #444 !important;
    text-align: center;
  }

  .navbar-nav > .notifications-menu > .dropdown-menu > li.footer > a:hover,
  .navbar-nav > .messages-menu > .dropdown-menu > li.footer > a:hover,
  .navbar-nav > .tasks-menu > .dropdown-menu > li.footer > a:hover {
    text-decoration: none;
    font-weight: normal;
  }

  .navbar-nav > .notifications-menu > .dropdown-menu > li .menu,
  .navbar-nav > .messages-menu > .dropdown-menu > li .menu,
  .navbar-nav > .tasks-menu > .dropdown-menu > li .menu {
    max-height: 200px;
    margin: 0;
    padding: 0;
    list-style: none;
    overflow-x: hidden;
  }

  .navbar-nav > .notifications-menu > .dropdown-menu > li .menu > li > a,
  .navbar-nav > .messages-menu > .dropdown-menu > li .menu > li > a,
  .navbar-nav > .tasks-menu > .dropdown-menu > li .menu > li > a {
    display: block;
    white-space: nowrap;
    /* Prevent text from breaking */
    border-bottom: 1px solid #f4f4f4;
  }

  .navbar-nav > .notifications-menu > .dropdown-menu > li .menu > li > a:hover,
  .navbar-nav > .messages-menu > .dropdown-menu > li .menu > li > a:hover,
  .navbar-nav > .tasks-menu > .dropdown-menu > li .menu > li > a:hover {
    background: #f4f4f4;
    text-decoration: none;
  }

  .navbar-nav > .notifications-menu > .dropdown-menu > li .menu > li > a {
    color: #444444;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 10px;
  }

  .navbar-nav > .messages-menu > .dropdown-menu > li .menu > li > a {
    margin: 0;
    padding: 10px 10px;
  }

  .navbar-nav > .messages-menu > .dropdown-menu > li .menu > li > a > div > img {
    margin: auto 10px auto auto;
    width: 40px;
    height: 40px;
  }

  .navbar-nav > .messages-menu > .dropdown-menu > li .menu > li > a > h4 {
    padding: 0;
    margin: 0 0 0 15px;
    color: #444444;
    font-size: 15px;
    position: relative;
  }

  .navbar-nav > .messages-menu > .dropdown-menu > li .menu > li > a > h4 > small {
    color: #999999;
    font-size: 10px;
    position: absolute;
    top: 0;
    right: 0;
  }

  .navbar-nav > .messages-menu > .dropdown-menu > li .menu > li > a > p {
    margin: 0 0 0 5px;
    font-size: 12px;
    color: #888888;
  }

  .navbar-nav > .messages-menu > .dropdown-menu > li .menu > li > a:before,
  .navbar-nav > .messages-menu > .dropdown-menu > li .menu > li > a:after {
    content: " ";
    display: table;
  }

  .navbar-nav > .messages-menu > .dropdown-menu > li .menu > li > a:after {
    clear: both;
  }

  .navbar-nav > .tasks-menu > .dropdown-menu > li .menu > li > a {
    padding: 10px;
  }

  .navbar-nav > .tasks-menu > .dropdown-menu > li .menu > li > a > h3 {
    font-size: 14px;
    padding: 0;
    margin: 0 0 10px 0;
    color: #666666;
  }

  .navbar-nav > .user-menu > .dropdown-menu {
    border-top-right-radius: 0;
    border-top-left-radius: 0;
    padding: 1px 0 0 0;
    border-top-width: 0;
    width: 280px;
  }

  .navbar-nav > .user-menu > .dropdown-menu,
  .navbar-nav > .user-menu > .dropdown-menu > .user-body {
    border-bottom-right-radius: 4px;
    border-bottom-left-radius: 4px;
  }

  .navbar-nav > .user-menu > .dropdown-menu > li.user-header {
    height: 175px;
    padding: 10px;
    text-align: center;
  }

  .navbar-nav > .user-menu > .dropdown-menu > li.user-header > img {
    z-index: 5;
    height: 90px;
    width: 90px;
    border: 3px solid;
    border-color: transparent;
    border-color: rgba(255, 255, 255, 0.2);
  }

  .navbar-nav > .user-menu > .dropdown-menu > li.user-header > p {
    z-index: 5;
    color: #fff;
    color: rgba(255, 255, 255, 0.8);
    font-size: 17px;
    margin-top: 10px;
  }

  .navbar-nav > .user-menu > .dropdown-menu > li.user-header > p > small {
    display: block;
    font-size: 12px;
  }

  .navbar-nav > .user-menu > .dropdown-menu > .user-body {
    padding: 15px;
    border-bottom: 1px solid #f4f4f4;
    border-top: 1px solid #dddddd;
  }

  .navbar-nav > .user-menu > .dropdown-menu > .user-body:before,
  .navbar-nav > .user-menu > .dropdown-menu > .user-body:after {
    content: " ";
    display: table;
  }

  .navbar-nav > .user-menu > .dropdown-menu > .user-body:after {
    clear: both;
  }

  .navbar-nav > .user-menu > .dropdown-menu > .user-body a {
    color: #444 !important;
  }

  @media (max-width: 991px) {
    .navbar-nav > .user-menu > .dropdown-menu > .user-body a {
      background: #fff !important;
      color: #444 !important;
    }
  }

  .navbar-nav > .user-menu > .dropdown-menu > .user-footer {
    background-color: #f9f9f9;
    padding: 10px;
  }

  .navbar-nav > .user-menu > .dropdown-menu > .user-footer:before,
  .navbar-nav > .user-menu > .dropdown-menu > .user-footer:after {
    content: " ";
    display: table;
  }

  .navbar-nav > .user-menu > .dropdown-menu > .user-footer:after {
    clear: both;
  }

  .navbar-nav > .user-menu > .dropdown-menu > .user-footer .btn-default {
    color: #666666;
  }

  .navbar-nav > .user-menu .user-image {
    float: left;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    margin-right: 10px;
    margin-top: -2px;
  }

  body.hold-transition .main-header .navbar,
  body.hold-transition .main-header .logo {
    /* Fix for IE */
    -webkit-transition: none;
    -o-transition: none;
    transition: none;
  }

  .dropdown-menu {
    display: inherit;
  }

  .main-header .navbar {
    background-color: #3c8dbc;
  }

  .main-header .navbar .nav > li > a {
    color: #ffffff;
  }

  .main-header .navbar .nav > li > a:hover,
  .main-header .navbar .nav > li > a:active,
  .main-header .navbar .nav > li > a:focus,
  .main-header .navbar .nav .open > a,
  .main-header .navbar .nav .open > a:hover,
  .main-header .navbar .nav .open > a:focus,
  .main-header .navbar .nav > .active > a {
    background: rgba(0, 0, 0, 0.1);
    color: #f6f6f6;
  }

  .main-header .navbar .sidebar-toggle {
    color: #ffffff;
    display: none;
  }

  @media (max-width: 800px) {
    .main-header .navbar .sidebar-toggle {
      display: block;
    }
  }

  .main-header .navbar .sidebar-toggle:hover {
    color: #f6f6f6;
    background: rgba(0, 0, 0, 0.1);
  }

  .main-header .navbar .sidebar-toggle {
    color: #fff;
  }

  .main-header .navbar .sidebar-toggle:hover {
    background-color: #367fa9;
  }

  .main-header .logo {
    background-color: #367fa9;
    color: #ffffff;
    border-bottom: 0 solid transparent;
  }

  .main-header .logo:hover {
    background-color: #357ca5;
  }

  .main-header li.user-header {
    background-color: #3c8dbc;
  }

  @media (max-width: 800px) {

    .main-header .logo {
      display: none;
    }

    .main-header .navbar {
      margin: 0;
    }

    .main-header .logo, .main-header .navbar {
      width: 100%;
      float: none;
    }

    .main-header .navbar-custom-menu, .navbar-custom-menu > .navbar-nav {
      float: right;
    }

    .navbar-custom-menu .navbar-nav {
      margin: 0;
      float: left;
    }

    .navbar-custom-menu > .navbar-nav > li {
      position: static;
      float: left;
    }

    .navbar-custom-menu .navbar-nav > li.messages-menu > a {
      padding-top: 15px;
      padding-bottom: 15px;
      line-height: 20px;
    }

    .main-header .navbar-custom-menu a, .main-header .navbar-right a {
      color: inherit;
      background: transparent;
    }

    .hidden-xs {
      display: none !important;
    }

    .navbar-nav > .user-menu .user-image {
      float: none;
      margin-right: 0;
      margin-top: 0px;
      line-height: 10px;
    }

    .navbar-nav > .user-menu a {
      padding: 10px 15px;
    }

  }
</style>
