<template>
  <div class="wrapper fixed">
    <vue-progress-bar></vue-progress-bar>
    <imp-header></imp-header>
    <side-menu :show="sidebar.opened && !sidebar.hidden"></side-menu>
    <div class="content-wrapper">
      <section class="content">
        <transition mode="out-in" enter-active-class="fadeIn" leave-active-class="fadeOut" appear>
          <router-view></router-view>
        </transition>
      </section>
      <imp-footer></imp-footer>
    </div>
  </div>
</template>

<script>

  import Vue from 'vue'
  import sideMenu from './components/sideMenu.vue'
  import impHeader from "./pages/layout/header.vue"
  import impFooter from "./pages/layout/footer.vue"
  require("jquery-slimscroll/jquery.slimscroll.js")
  import {mapGetters, mapActions,mapMutations} from 'vuex'
  import * as types from "./store/mutation-types"
  import 'animate.css'

  export default {
    name: 'app',
    components: {
      sideMenu,
      impFooter,
      impHeader
    },
    computed: {
        ...mapGetters({
            sidebar: 'sidebar'
        })
    },
    data: function () {
      return {
        active: true,
        headerFixed: true,
        breadcrumb: []
      }
    },
    methods: {
      ...mapMutations({
          toggleDevice: types.TOGGLE_DEVICE,
          toggleSidebar: types.TOGGLE_SIDEBAR
      }),
    },
    watch: {
      '$route': function (to, from) {
      }
    },
    beforeMount () {
      const { body } = document
      const WIDTH = 784
      const handler = () => {
        if (!document.hidden) {
          let rect = body.getBoundingClientRect()
          let isMobile = rect.width < WIDTH
          this.toggleDevice(isMobile);
          this.toggleSidebar(!isMobile)
        }
      }
      document.addEventListener('visibilitychange', handler)
      window.addEventListener('DOMContentLoaded', handler)
      window.addEventListener('resize', handler)
    },
    mounted () {
      //  [App.vue specific] When App.vue is finish loading finish the progress bar
      this.$Progress.finish()
    },
    created () {
      //  [App.vue specific] When App.vue is first loaded start the progress bar
      this.$Progress.start()
      //  hook the progress bar to start before we move router-view
      this.$router.beforeEach((to, from, next) => {
        //  does the page we want to go to have a meta.progress object
//        if (to.meta.progress !== undefined) {
//          let meta = to.meta.progress
//          // parse meta tags
//          this.$Progress.parseMeta(meta)
//        }
        //  start the progress bar
        this.$Progress.start()
        //  continue to next page
        next()
      })
      //  hook the progress bar to finish after we've finished moving router-view
      this.$router.afterEach((to, from) => {
        //  finish the progress bar
//        console.log(JSON.stringify())
        this.$Progress.finish()
      })

//      this.$router.push('/activePublic');
    }
  }

  // 在状态改变后和断言 DOM 更新前等待一刻
  Vue.nextTick(() => {
    if (typeof $.fn.slimScroll != 'undefined') {
      //Destroy if it exists
      $(".sidebar").slimScroll({destroy: true}).height("auto");
      //Add slimscroll
      $(".sidebar").slimScroll({
        height: ($(window).height() - $(".main-header").height()) + "px",
        color: "rgba(0,0,0,0.2)",
        size: "3px"
      });
    }
    $(window).on("resize", function () {
      if (typeof $.fn.slimScroll != 'undefined') {
        //Destroy if it exists
        $(".sidebar").slimScroll({destroy: true}).height("auto");
        //Add slimscroll
        $(".sidebar").slimScroll({
          height: ($(window).height() - $(".main-header").height()) + "px",
          color: "rgba(0,0,0,0.2)",
          size: "3px"
        });
      }
    });
  })
</script>

<style>

  .animated {
    animation-duration: .5s;
  }

  blockquote, body, dd, dl, dt, fieldset, figure, h1, h2, h3, h4, h5, h6, hr, html, iframe, legend, li, ol, p, pre, textarea, ul {
    margin: 0;
    padding: 0;
  }

  *,:after, :before {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }


  .content-wrapper {
    -webkit-transition: -webkit-transform 0.3s ease-in-out, margin 0.3s ease-in-out;
    -moz-transition: -moz-transform 0.3s ease-in-out, margin 0.3s ease-in-out;
    -o-transition: -o-transform 0.3s ease-in-out, margin 0.3s ease-in-out;
    transition: transform 0.3s ease-in-out, margin 0.3s ease-in-out;
    margin-left: 230px;
    z-index: 820;
    padding-top: 50px;
    min-height: 100%;
    z-index: 800;
  }
  @media (max-width: 800px) {
    .content-wrapper{
      margin-left: 0px;
    }
  }
  .content-wrapper .content {
    padding: 1.25rem;
  }
</style>
