<template>

  <imp-panel>
    <h3 class="box-title" slot="header" style="width: 100%;">
      <el-button type="primary" icon="plus" @click="newAdd">新增</el-button>
      <el-button type="danger" icon="delete" @click="batchDelete">删除</el-button>
    </h3>
    <el-row slot="body" :gutter="24" style="margin-bottom: 20px;">
      <el-col :span="6" :xs="24" :sm="24" :md="6" :lg="6" style="margin-bottom: 20px;">
        <el-tree v-if="menuTree"
                 ref="menuTree"
                 :data="menuTree"
                 show-checkbox
                 highlight-current
                 :render-content="renderContent"
                 @node-click="handleNodeClick" clearable node-key="id" :props="defaultProps"></el-tree>
      </el-col>
      <el-col :span="18" :xs="24" :sm="24" :md="18" :lg="18">
        <el-card class="box-card">
          <div class="text item">
            <el-form :model="form" ref="form">
              <el-form-item label="父级" :label-width="formLabelWidth">
                <!--<el-input v-model="form.parentId" auto-complete="off"></el-input>-->
                <el-select-tree v-model="form.parentId" :treeData="menuTree" :propNames="defaultProps" clearable
                                placeholder="请选择父级">
                </el-select-tree>
              </el-form-item>
              <el-form-item label="名称" :label-width="formLabelWidth">
                <el-input v-model="form.name" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="链接" :label-width="formLabelWidth">
                <el-input v-model="form.href" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="是否显示" :label-width="formLabelWidth">
                <el-radio class="radio" v-model="form.isShow" label="1">显示</el-radio>
                <el-radio class="radio" v-model="form.isShow" label="0">不显示</el-radio>
              </el-form-item>
              <el-form-item label="图标" :label-width="formLabelWidth">
                <i :class="form.icon" v-model="form.icon"></i>
                <el-button type="text" @click="selectIconDialog=true">选择</el-button>
              </el-form-item>
              <el-form-item label="排序" :label-width="formLabelWidth">
                <el-slider v-model="form.sort"></el-slider>
              </el-form-item>
              <el-form-item label="" :label-width="formLabelWidth">
                <el-button type="primary" @click="onSubmit" v-text="form.id?'修改':'新增'"></el-button>
                <el-button type="danger" @click="deleteSelected" icon="delete" v-show="form.id && form.id!=null">删除
                </el-button>
              </el-form-item>
            </el-form>
          </div>
          <el-dialog title="选择图标" v-model="selectIconDialog" size="tiny">
            <div class="select-tree">
              <el-scrollbar
                tag="div"
                class='is-empty'
                wrap-class="el-select-dropdown__wrap"
                view-class="el-select-dropdown__list">
                <div class="icons-wrapper"><i class="fa fa-address-book" @click="selectIcon($event)"></i><i class="fa fa-address-book-o" @click="selectIcon($event)"></i><i class="fa fa-address-card" @click="selectIcon($event)"></i><i class="fa fa-address-card-o" @click="selectIcon($event)"></i><i class="fa fa-adjust" @click="selectIcon($event)"></i><i class="fa fa-american-sign-language-interpreting" @click="selectIcon($event)"></i><i class="fa fa-anchor" @click="selectIcon($event)"></i><i class="fa fa-archive" @click="selectIcon($event)"></i><i class="fa fa-area-chart" @click="selectIcon($event)"></i><i class="fa fa-arrows" @click="selectIcon($event)"></i><i class="fa fa-arrows-h" @click="selectIcon($event)"></i><i class="fa fa-arrows-v" @click="selectIcon($event)"></i><i class="fa fa-asl-interpreting" @click="selectIcon($event)"></i><i class="fa fa-assistive-listening-systems" @click="selectIcon($event)"></i><i class="fa fa-asterisk" @click="selectIcon($event)"></i><i class="fa fa-at" @click="selectIcon($event)"></i><i class="fa fa-audio-description" @click="selectIcon($event)"></i><i class="fa fa-automobile" @click="selectIcon($event)"></i><i class="fa fa-balance-scale" @click="selectIcon($event)"></i><i class="fa fa-ban" @click="selectIcon($event)"></i><i class="fa fa-bank" @click="selectIcon($event)"></i><i class="fa fa-bar-chart" @click="selectIcon($event)"></i><i class="fa fa-bar-chart-o" @click="selectIcon($event)"></i><i class="fa fa-barcode" @click="selectIcon($event)"></i><i class="fa fa-bars" @click="selectIcon($event)"></i><i class="fa fa-bath" @click="selectIcon($event)"></i><i class="fa fa-bathtub" @click="selectIcon($event)"></i><i class="fa fa-battery" @click="selectIcon($event)"></i><i class="fa fa-battery-0" @click="selectIcon($event)"></i><i class="fa fa-battery-1" @click="selectIcon($event)"></i><i class="fa fa-battery-2" @click="selectIcon($event)"></i><i class="fa fa-battery-3" @click="selectIcon($event)"></i><i class="fa fa-battery-4" @click="selectIcon($event)"></i><i class="fa fa-battery-empty" @click="selectIcon($event)"></i><i class="fa fa-battery-full" @click="selectIcon($event)"></i><i class="fa fa-battery-half" @click="selectIcon($event)"></i><i class="fa fa-battery-quarter" @click="selectIcon($event)"></i><i class="fa fa-battery-three-quarters" @click="selectIcon($event)"></i><i class="fa fa-bed" @click="selectIcon($event)"></i><i class="fa fa-beer" @click="selectIcon($event)"></i><i class="fa fa-bell" @click="selectIcon($event)"></i><i class="fa fa-bell-o" @click="selectIcon($event)"></i><i class="fa fa-bell-slash" @click="selectIcon($event)"></i><i class="fa fa-bell-slash-o" @click="selectIcon($event)"></i><i class="fa fa-bicycle" @click="selectIcon($event)"></i><i class="fa fa-binoculars" @click="selectIcon($event)"></i><i class="fa fa-birthday-cake" @click="selectIcon($event)"></i><i class="fa fa-blind" @click="selectIcon($event)"></i><i class="fa fa-bluetooth" @click="selectIcon($event)"></i><i class="fa fa-bluetooth-b" @click="selectIcon($event)"></i><i class="fa fa-bolt" @click="selectIcon($event)"></i><i class="fa fa-bomb" @click="selectIcon($event)"></i><i class="fa fa-book" @click="selectIcon($event)"></i><i class="fa fa-bookmark" @click="selectIcon($event)"></i><i class="fa fa-bookmark-o" @click="selectIcon($event)"></i><i class="fa fa-braille" @click="selectIcon($event)"></i><i class="fa fa-briefcase" @click="selectIcon($event)"></i><i class="fa fa-bug" @click="selectIcon($event)"></i><i class="fa fa-building" @click="selectIcon($event)"></i><i class="fa fa-building-o" @click="selectIcon($event)"></i><i class="fa fa-bullhorn" @click="selectIcon($event)"></i><i class="fa fa-bullseye" @click="selectIcon($event)"></i><i class="fa fa-bus" @click="selectIcon($event)"></i><i class="fa fa-cab" @click="selectIcon($event)"></i><i class="fa fa-calculator" @click="selectIcon($event)"></i><i class="fa fa-calendar" @click="selectIcon($event)"></i><i class="fa fa-calendar-check-o" @click="selectIcon($event)"></i><i class="fa fa-calendar-minus-o" @click="selectIcon($event)"></i><i class="fa fa-calendar-o" @click="selectIcon($event)"></i><i class="fa fa-calendar-plus-o" @click="selectIcon($event)"></i><i class="fa fa-calendar-times-o" @click="selectIcon($event)"></i><i class="fa fa-camera" @click="selectIcon($event)"></i><i class="fa fa-camera-retro" @click="selectIcon($event)"></i><i class="fa fa-car" @click="selectIcon($event)"></i><i class="fa fa-caret-square-o-down" @click="selectIcon($event)"></i><i class="fa fa-caret-square-o-left" @click="selectIcon($event)"></i><i class="fa fa-caret-square-o-right" @click="selectIcon($event)"></i><i class="fa fa-caret-square-o-up" @click="selectIcon($event)"></i><i class="fa fa-cart-arrow-down" @click="selectIcon($event)"></i><i class="fa fa-cart-plus" @click="selectIcon($event)"></i><i class="fa fa-cc" @click="selectIcon($event)"></i><i class="fa fa-certificate" @click="selectIcon($event)"></i><i class="fa fa-check" @click="selectIcon($event)"></i><i class="fa fa-check-circle" @click="selectIcon($event)"></i><i class="fa fa-check-circle-o" @click="selectIcon($event)"></i><i class="fa fa-check-square" @click="selectIcon($event)"></i><i class="fa fa-check-square-o" @click="selectIcon($event)"></i><i class="fa fa-child" @click="selectIcon($event)"></i><i class="fa fa-circle" @click="selectIcon($event)"></i><i class="fa fa-circle-o" @click="selectIcon($event)"></i><i class="fa fa-circle-o-notch" @click="selectIcon($event)"></i><i class="fa fa-circle-thin" @click="selectIcon($event)"></i><i class="fa fa-clipboard"></i><i class="fa fa-clock-o" @click="selectIcon($event)"></i><i class="fa fa-clone" @click="selectIcon($event)"></i><i class="fa fa-close" @click="selectIcon($event)"></i><i class="fa fa-cloud" @click="selectIcon($event)"></i><i class="fa fa-cloud-download" @click="selectIcon($event)"></i><i class="fa fa-cloud-upload" @click="selectIcon($event)"></i><i class="fa fa-code" @click="selectIcon($event)"></i><i class="fa fa-code-fork" @click="selectIcon($event)"></i><i class="fa fa-coffee" @click="selectIcon($event)"></i><i class="fa fa-cog" @click="selectIcon($event)"></i><i class="fa fa-cogs" @click="selectIcon($event)"></i><i class="fa fa-comment" @click="selectIcon($event)"></i><i class="fa fa-comment-o" @click="selectIcon($event)"></i><i class="fa fa-commenting" @click="selectIcon($event)"></i><i class="fa fa-commenting-o" @click="selectIcon($event)"></i><i class="fa fa-comments" @click="selectIcon($event)"></i><i class="fa fa-comments-o" @click="selectIcon($event)"></i><i class="fa fa-compass" @click="selectIcon($event)"></i><i class="fa fa-copyright" @click="selectIcon($event)"></i><i class="fa fa-creative-commons" @click="selectIcon($event)"></i><i class="fa fa-credit-card" @click="selectIcon($event)"></i><i class="fa fa-credit-card-alt" @click="selectIcon($event)"></i><i class="fa fa-crop" @click="selectIcon($event)"></i><i class="fa fa-crosshairs" @click="selectIcon($event)"></i><i class="fa fa-cube" @click="selectIcon($event)"></i><i class="fa fa-cubes" @click="selectIcon($event)"></i><i class="fa fa-cutlery" @click="selectIcon($event)"></i><i class="fa fa-dashboard" @click="selectIcon($event)"></i><i class="fa fa-database" @click="selectIcon($event)"></i><i class="fa fa-deaf" @click="selectIcon($event)"></i><i class="fa fa-deafness" @click="selectIcon($event)"></i><i class="fa fa-desktop" @click="selectIcon($event)"></i><i class="fa fa-diamond" @click="selectIcon($event)"></i><i class="fa fa-dot-circle-o" @click="selectIcon($event)"></i><i class="fa fa-download" @click="selectIcon($event)"></i><i class="fa fa-drivers-license" @click="selectIcon($event)"></i><i class="fa fa-drivers-license-o" @click="selectIcon($event)"></i><i class="fa fa-edit" @click="selectIcon($event)"></i><i class="fa fa-ellipsis-h" @click="selectIcon($event)"></i><i class="fa fa-ellipsis-v" @click="selectIcon($event)"></i><i class="fa fa-envelope" @click="selectIcon($event)"></i><i class="fa fa-envelope-o" @click="selectIcon($event)"></i><i class="fa fa-envelope-open" @click="selectIcon($event)"></i><i class="fa fa-envelope-open-o" @click="selectIcon($event)"></i><i class="fa fa-envelope-square" @click="selectIcon($event)"></i><i class="fa fa-eraser" @click="selectIcon($event)"></i><i class="fa fa-exchange" @click="selectIcon($event)"></i><i class="fa fa-exclamation" @click="selectIcon($event)"></i><i class="fa fa-exclamation-circle" @click="selectIcon($event)"></i><i class="fa fa-exclamation-triangle" @click="selectIcon($event)"></i><i class="fa fa-external-link" @click="selectIcon($event)"></i><i class="fa fa-external-link-square" @click="selectIcon($event)"></i><i class="fa fa-eye" @click="selectIcon($event)"></i><i class="fa fa-eye-slash" @click="selectIcon($event)"></i><i class="fa fa-eyedropper" @click="selectIcon($event)"></i><i class="fa fa-fax" @click="selectIcon($event)"></i><i class="fa fa-feed" @click="selectIcon($event)"></i><i class="fa fa-female" @click="selectIcon($event)"></i><i class="fa fa-fighter-jet" @click="selectIcon($event)"></i><i class="fa fa-file-archive-o" @click="selectIcon($event)"></i><i class="fa fa-file-audio-o" @click="selectIcon($event)"></i><i class="fa fa-file-code-o" @click="selectIcon($event)"></i><i class="fa fa-file-excel-o" @click="selectIcon($event)"></i><i class="fa fa-file-image-o" @click="selectIcon($event)"></i><i class="fa fa-file-movie-o" @click="selectIcon($event)"></i><i class="fa fa-file-pdf-o" @click="selectIcon($event)"></i><i class="fa fa-file-photo-o" @click="selectIcon($event)"></i><i class="fa fa-file-picture-o" @click="selectIcon($event)"></i><i class="fa fa-file-powerpoint-o" @click="selectIcon($event)"></i><i class="fa fa-file-sound-o" @click="selectIcon($event)"></i><i class="fa fa-file-video-o" @click="selectIcon($event)"></i><i class="fa fa-file-word-o" @click="selectIcon($event)"></i><i class="fa fa-file-zip-o" @click="selectIcon($event)"></i><i class="fa fa-film" @click="selectIcon($event)"></i><i class="fa fa-filter" @click="selectIcon($event)"></i><i class="fa fa-fire" @click="selectIcon($event)"></i><i class="fa fa-fire-extinguisher" @click="selectIcon($event)"></i><i class="fa fa-flag" @click="selectIcon($event)"></i><i class="fa fa-flag-checkered" @click="selectIcon($event)"></i><i class="fa fa-flag-o" @click="selectIcon($event)"></i><i class="fa fa-flash" @click="selectIcon($event)"></i><i class="fa fa-flask" @click="selectIcon($event)"></i><i class="fa fa-folder" @click="selectIcon($event)"></i><i class="fa fa-folder-o" @click="selectIcon($event)"></i><i class="fa fa-folder-open" @click="selectIcon($event)"></i><i class="fa fa-folder-open-o" @click="selectIcon($event)"></i><i class="fa fa-frown-o" @click="selectIcon($event)"></i><i class="fa fa-futbol-o" @click="selectIcon($event)"></i><i class="fa fa-gamepad" @click="selectIcon($event)"></i><i class="fa fa-gavel" @click="selectIcon($event)"></i><i class="fa fa-gear" @click="selectIcon($event)"></i><i class="fa fa-gears" @click="selectIcon($event)"></i><i class="fa fa-gift" @click="selectIcon($event)"></i><i class="fa fa-glass" @click="selectIcon($event)"></i><i class="fa fa-globe" @click="selectIcon($event)"></i><i class="fa fa-graduation-cap" @click="selectIcon($event)"></i><i class="fa fa-group" @click="selectIcon($event)"></i><i class="fa fa-hand-grab-o" @click="selectIcon($event)"></i><i class="fa fa-hand-lizard-o" @click="selectIcon($event)"></i><i class="fa fa-hand-paper-o" @click="selectIcon($event)"></i><i class="fa fa-hand-peace-o" @click="selectIcon($event)"></i><i class="fa fa-hand-pointer-o" @click="selectIcon($event)"></i><i class="fa fa-hand-rock-o" @click="selectIcon($event)"></i><i class="fa fa-hand-scissors-o" @click="selectIcon($event)"></i><i class="fa fa-hand-spock-o" @click="selectIcon($event)"></i><i class="fa fa-hand-stop-o" @click="selectIcon($event)"></i><i class="fa fa-handshake-o" @click="selectIcon($event)"></i><i class="fa fa-hard-of-hearing" @click="selectIcon($event)"></i><i class="fa fa-hashtag" @click="selectIcon($event)"></i><i class="fa fa-hdd-o" @click="selectIcon($event)"></i><i class="fa fa-headphones" @click="selectIcon($event)"></i><i class="fa fa-heart" @click="selectIcon($event)"></i><i class="fa fa-heart-o" @click="selectIcon($event)"></i><i class="fa fa-heartbeat" @click="selectIcon($event)"></i><i class="fa fa-history" @click="selectIcon($event)"></i><i class="fa fa-home" @click="selectIcon($event)"></i><i class="fa fa-hotel" @click="selectIcon($event)"></i><i class="fa fa-hourglass" @click="selectIcon($event)"></i><i class="fa fa-hourglass-1" @click="selectIcon($event)"></i><i class="fa fa-hourglass-2" @click="selectIcon($event)"></i><i class="fa fa-hourglass-3" @click="selectIcon($event)"></i><i class="fa fa-hourglass-end" @click="selectIcon($event)"></i><i class="fa fa-hourglass-half" @click="selectIcon($event)"></i><i class="fa fa-hourglass-o" @click="selectIcon($event)"></i><i class="fa fa-hourglass-start" @click="selectIcon($event)"></i><i class="fa fa-i-cursor" @click="selectIcon($event)"></i><i class="fa fa-id-badge" @click="selectIcon($event)"></i><i class="fa fa-id-card" @click="selectIcon($event)"></i><i class="fa fa-id-card-o" @click="selectIcon($event)"></i><i class="fa fa-image" @click="selectIcon($event)"></i><i class="fa fa-inbox" @click="selectIcon($event)"></i><i class="fa fa-industry" @click="selectIcon($event)"></i><i class="fa fa-info" @click="selectIcon($event)"></i><i class="fa fa-info-circle" @click="selectIcon($event)"></i><i class="fa fa-institution" @click="selectIcon($event)"></i><i class="fa fa-key" @click="selectIcon($event)"></i><i class="fa fa-keyboard-o" @click="selectIcon($event)"></i><i class="fa fa-language" @click="selectIcon($event)"></i><i class="fa fa-laptop" @click="selectIcon($event)"></i><i class="fa fa-leaf" @click="selectIcon($event)"></i><i class="fa fa-legal" @click="selectIcon($event)"></i><i class="fa fa-lemon-o" @click="selectIcon($event)"></i><i class="fa fa-level-down" @click="selectIcon($event)"></i><i class="fa fa-level-up" @click="selectIcon($event)"></i><i class="fa fa-life-bouy" @click="selectIcon($event)"></i><i class="fa fa-life-buoy" @click="selectIcon($event)"></i><i class="fa fa-life-ring" @click="selectIcon($event)"></i><i class="fa fa-life-saver" @click="selectIcon($event)"></i><i class="fa fa-lightbulb-o" @click="selectIcon($event)"></i><i class="fa fa-line-chart" @click="selectIcon($event)"></i><i class="fa fa-location-arrow" @click="selectIcon($event)"></i><i class="fa fa-lock" @click="selectIcon($event)"></i><i class="fa fa-low-vision" @click="selectIcon($event)"></i><i class="fa fa-magic" @click="selectIcon($event)"></i><i class="fa fa-magnet" @click="selectIcon($event)"></i><i class="fa fa-mail-forward" @click="selectIcon($event)"></i><i class="fa fa-mail-reply" @click="selectIcon($event)"></i><i class="fa fa-mail-reply-all" @click="selectIcon($event)"></i><i class="fa fa-male" @click="selectIcon($event)"></i><i class="fa fa-map" @click="selectIcon($event)"></i><i class="fa fa-map-marker" @click="selectIcon($event)"></i><i class="fa fa-map-o" @click="selectIcon($event)"></i><i class="fa fa-map-pin" @click="selectIcon($event)"></i><i class="fa fa-map-signs" @click="selectIcon($event)"></i><i class="fa fa-meh-o" @click="selectIcon($event)"></i><i class="fa fa-microchip" @click="selectIcon($event)"></i><i class="fa fa-microphone" @click="selectIcon($event)"></i><i class="fa fa-microphone-slash" @click="selectIcon($event)"></i><i class="fa fa-minus" @click="selectIcon($event)"></i><i class="fa fa-minus-circle" @click="selectIcon($event)"></i><i class="fa fa-minus-square" @click="selectIcon($event)"></i><i class="fa fa-minus-square-o" @click="selectIcon($event)"></i><i class="fa fa-mobile" @click="selectIcon($event)"></i><i class="fa fa-mobile-phone" @click="selectIcon($event)"></i><i class="fa fa-money" @click="selectIcon($event)"></i><i class="fa fa-moon-o" @click="selectIcon($event)"></i><i class="fa fa-mortar-board" @click="selectIcon($event)"></i><i class="fa fa-motorcycle" @click="selectIcon($event)"></i><i class="fa fa-mouse-pointer" @click="selectIcon($event)"></i><i class="fa fa-music" @click="selectIcon($event)"></i><i class="fa fa-navicon" @click="selectIcon($event)"></i><i class="fa fa-newspaper-o" @click="selectIcon($event)"></i><i class="fa fa-object-group" @click="selectIcon($event)"></i><i class="fa fa-object-ungroup" @click="selectIcon($event)"></i><i class="fa fa-paint-brush" @click="selectIcon($event)"></i><i class="fa fa-paper-plane" @click="selectIcon($event)"></i><i class="fa fa-paper-plane-o" @click="selectIcon($event)"></i><i class="fa fa-paw" @click="selectIcon($event)"></i><i class="fa fa-pencil" @click="selectIcon($event)"></i><i class="fa fa-pencil-square" @click="selectIcon($event)"></i><i class="fa fa-pencil-square-o" @click="selectIcon($event)"></i><i class="fa fa-percent" @click="selectIcon($event)"></i><i class="fa fa-phone" @click="selectIcon($event)"></i><i class="fa fa-phone-square" @click="selectIcon($event)"></i><i class="fa fa-photo" @click="selectIcon($event)"></i><i class="fa fa-picture-o" @click="selectIcon($event)"></i><i class="fa fa-pie-chart" @click="selectIcon($event)"></i><i class="fa fa-plane" @click="selectIcon($event)"></i><i class="fa fa-plug" @click="selectIcon($event)"></i><i class="fa fa-plus" @click="selectIcon($event)"></i><i class="fa fa-plus-circle" @click="selectIcon($event)"></i><i class="fa fa-plus-square" @click="selectIcon($event)"></i><i class="fa fa-plus-square-o" @click="selectIcon($event)"></i><i class="fa fa-podcast" @click="selectIcon($event)"></i><i class="fa fa-power-off" @click="selectIcon($event)"></i><i class="fa fa-print" @click="selectIcon($event)"></i><i class="fa fa-puzzle-piece" @click="selectIcon($event)"></i><i class="fa fa-qrcode" @click="selectIcon($event)"></i><i class="fa fa-question" @click="selectIcon($event)"></i><i class="fa fa-question-circle" @click="selectIcon($event)"></i><i class="fa fa-question-circle-o" @click="selectIcon($event)"></i><i class="fa fa-quote-left" @click="selectIcon($event)"></i><i class="fa fa-quote-right" @click="selectIcon($event)"></i><i class="fa fa-random" @click="selectIcon($event)"></i><i class="fa fa-recycle" @click="selectIcon($event)"></i><i class="fa fa-refresh" @click="selectIcon($event)"></i><i class="fa fa-registered" @click="selectIcon($event)"></i><i class="fa fa-remove" @click="selectIcon($event)"></i><i class="fa fa-reorder" @click="selectIcon($event)"></i><i class="fa fa-reply" @click="selectIcon($event)"></i><i class="fa fa-reply-all" @click="selectIcon($event)"></i><i class="fa fa-retweet" @click="selectIcon($event)"></i><i class="fa fa-road" @click="selectIcon($event)"></i><i class="fa fa-rocket" @click="selectIcon($event)"></i><i class="fa fa-rss" @click="selectIcon($event)"></i><i class="fa fa-rss-square" @click="selectIcon($event)"></i><i class="fa fa-s15" @click="selectIcon($event)"></i><i class="fa fa-search" @click="selectIcon($event)"></i><i class="fa fa-search-minus" @click="selectIcon($event)"></i><i class="fa fa-search-plus" @click="selectIcon($event)"></i><i class="fa fa-send" @click="selectIcon($event)"></i><i class="fa fa-send-o" @click="selectIcon($event)"></i><i class="fa fa-server" @click="selectIcon($event)"></i><i class="fa fa-share" @click="selectIcon($event)"></i><i class="fa fa-share-alt" @click="selectIcon($event)"></i><i class="fa fa-share-alt-square" @click="selectIcon($event)"></i><i class="fa fa-share-square" @click="selectIcon($event)"></i><i class="fa fa-share-square-o" @click="selectIcon($event)"></i><i class="fa fa-shield" @click="selectIcon($event)"></i><i class="fa fa-ship" @click="selectIcon($event)"></i><i class="fa fa-shopping-bag" @click="selectIcon($event)"></i><i class="fa fa-shopping-basket" @click="selectIcon($event)"></i><i class="fa fa-shopping-cart" @click="selectIcon($event)"></i><i class="fa fa-shower" @click="selectIcon($event)"></i><i class="fa fa-sign-in" @click="selectIcon($event)"></i><i class="fa fa-sign-language" @click="selectIcon($event)"></i><i class="fa fa-sign-out" @click="selectIcon($event)"></i><i class="fa fa-signal" @click="selectIcon($event)"></i><i class="fa fa-signing" @click="selectIcon($event)"></i><i class="fa fa-sitemap" @click="selectIcon($event)"></i><i class="fa fa-sliders" @click="selectIcon($event)"></i><i class="fa fa-smile-o" @click="selectIcon($event)"></i><i class="fa fa-snowflake-o" @click="selectIcon($event)"></i><i class="fa fa-soccer-ball-o" @click="selectIcon($event)"></i><i class="fa fa-sort" @click="selectIcon($event)"></i><i class="fa fa-sort-alpha-asc" @click="selectIcon($event)"></i><i class="fa fa-sort-alpha-desc" @click="selectIcon($event)"></i><i class="fa fa-sort-amount-asc" @click="selectIcon($event)"></i><i class="fa fa-sort-amount-desc" @click="selectIcon($event)"></i><i class="fa fa-sort-asc" @click="selectIcon($event)"></i><i class="fa fa-sort-desc" @click="selectIcon($event)"></i><i class="fa fa-sort-down" @click="selectIcon($event)"></i><i class="fa fa-sort-numeric-asc" @click="selectIcon($event)"></i><i class="fa fa-sort-numeric-desc" @click="selectIcon($event)"></i><i class="fa fa-sort-up" @click="selectIcon($event)"></i><i class="fa fa-space-shuttle" @click="selectIcon($event)"></i><i class="fa fa-spinner" @click="selectIcon($event)"></i><i class="fa fa-spoon" @click="selectIcon($event)"></i><i class="fa fa-square" @click="selectIcon($event)"></i><i class="fa fa-square-o" @click="selectIcon($event)"></i><i class="fa fa-star" @click="selectIcon($event)"></i><i class="fa fa-star-half" @click="selectIcon($event)"></i><i class="fa fa-star-half-empty" @click="selectIcon($event)"></i><i class="fa fa-star-half-full" @click="selectIcon($event)"></i><i class="fa fa-star-half-o" @click="selectIcon($event)"></i><i class="fa fa-star-o" @click="selectIcon($event)"></i><i class="fa fa-sticky-note" @click="selectIcon($event)"></i><i class="fa fa-sticky-note-o" @click="selectIcon($event)"></i><i class="fa fa-street-view" @click="selectIcon($event)"></i><i class="fa fa-suitcase" @click="selectIcon($event)"></i><i class="fa fa-sun-o" @click="selectIcon($event)"></i><i class="fa fa-support" @click="selectIcon($event)"></i><i class="fa fa-tablet" @click="selectIcon($event)"></i><i class="fa fa-tachometer" @click="selectIcon($event)"></i><i class="fa fa-tag" @click="selectIcon($event)"></i><i class="fa fa-tags" @click="selectIcon($event)"></i><i class="fa fa-tasks" @click="selectIcon($event)"></i><i class="fa fa-taxi" @click="selectIcon($event)"></i><i class="fa fa-television" @click="selectIcon($event)"></i><i class="fa fa-terminal" @click="selectIcon($event)"></i><i class="fa fa-thermometer" @click="selectIcon($event)"></i><i class="fa fa-thermometer-0" @click="selectIcon($event)"></i><i class="fa fa-thermometer-1" @click="selectIcon($event)"></i><i class="fa fa-thermometer-2" @click="selectIcon($event)"></i><i class="fa fa-thermometer-3" @click="selectIcon($event)"></i><i class="fa fa-thermometer-4" @click="selectIcon($event)"></i><i class="fa fa-thermometer-empty" @click="selectIcon($event)"></i><i class="fa fa-thermometer-full" @click="selectIcon($event)"></i><i class="fa fa-thermometer-half" @click="selectIcon($event)"></i><i class="fa fa-thermometer-quarter" @click="selectIcon($event)"></i><i class="fa fa-thermometer-three-quarters" @click="selectIcon($event)"></i><i class="fa fa-thumb-tack" @click="selectIcon($event)"></i><i class="fa fa-thumbs-down" @click="selectIcon($event)"></i><i class="fa fa-thumbs-o-down" @click="selectIcon($event)"></i><i class="fa fa-thumbs-o-up" @click="selectIcon($event)"></i><i class="fa fa-thumbs-up" @click="selectIcon($event)"></i><i class="fa fa-ticket" @click="selectIcon($event)"></i><i class="fa fa-times" @click="selectIcon($event)"></i><i class="fa fa-times-circle" @click="selectIcon($event)"></i><i class="fa fa-times-circle-o" @click="selectIcon($event)"></i><i class="fa fa-times-rectangle" @click="selectIcon($event)"></i><i class="fa fa-times-rectangle-o" @click="selectIcon($event)"></i><i class="fa fa-tint" @click="selectIcon($event)"></i><i class="fa fa-toggle-down" @click="selectIcon($event)"></i><i class="fa fa-toggle-left" @click="selectIcon($event)"></i><i class="fa fa-toggle-off" @click="selectIcon($event)"></i><i class="fa fa-toggle-on" @click="selectIcon($event)"></i><i class="fa fa-toggle-right" @click="selectIcon($event)"></i><i class="fa fa-toggle-up" @click="selectIcon($event)"></i><i class="fa fa-trademark" @click="selectIcon($event)"></i><i class="fa fa-trash" @click="selectIcon($event)"></i><i class="fa fa-trash-o" @click="selectIcon($event)"></i><i class="fa fa-tree" @click="selectIcon($event)"></i><i class="fa fa-trophy" @click="selectIcon($event)"></i><i class="fa fa-truck" @click="selectIcon($event)"></i><i class="fa fa-tty" @click="selectIcon($event)"></i><i class="fa fa-tv" @click="selectIcon($event)"></i><i class="fa fa-umbrella" @click="selectIcon($event)"></i><i class="fa fa-universal-access" @click="selectIcon($event)"></i><i class="fa fa-university" @click="selectIcon($event)"></i><i class="fa fa-unlock" @click="selectIcon($event)"></i><i class="fa fa-unlock-alt" @click="selectIcon($event)"></i><i class="fa fa-unsorted" @click="selectIcon($event)"></i><i class="fa fa-upload" @click="selectIcon($event)"></i><i class="fa fa-user" @click="selectIcon($event)"></i><i class="fa fa-user-circle" @click="selectIcon($event)"></i><i class="fa fa-user-circle-o" @click="selectIcon($event)"></i><i class="fa fa-user-o"></i><i class="fa fa-user-plus" @click="selectIcon($event)"></i><i class="fa fa-user-secret" @click="selectIcon($event)"></i><i class="fa fa-user-times" @click="selectIcon($event)"></i><i class="fa fa-users" @click="selectIcon($event)"></i><i class="fa fa-vcard" @click="selectIcon($event)"></i><i class="fa fa-vcard-o" @click="selectIcon($event)"></i><i class="fa fa-video-camera" @click="selectIcon($event)"></i><i class="fa fa-volume-control-phone" @click="selectIcon($event)"></i><i class="fa fa-volume-down" @click="selectIcon($event)"></i><i class="fa fa-volume-off" @click="selectIcon($event)"></i><i class="fa fa-volume-up" @click="selectIcon($event)"></i><i class="fa fa-warning" @click="selectIcon($event)"></i><i class="fa fa-wheelchair" @click="selectIcon($event)"></i><i class="fa fa-wheelchair-alt" @click="selectIcon($event)"></i><i class="fa fa-wifi" @click="selectIcon($event)"></i><i class="fa fa-window-close" @click="selectIcon($event)"></i><i class="fa fa-window-close-o" @click="selectIcon($event)"></i><i class="fa fa-window-maximize" @click="selectIcon($event)"></i><i class="fa fa-window-minimize" @click="selectIcon($event)"></i><i class="fa fa-window-restore" @click="selectIcon($event)"></i><i class="fa fa-wrench" @click="selectIcon($event)"></i></div>
              </el-scrollbar>
            </div>
            <span slot="footer" class="dialog-footer">
          <el-button @click="selectIconDialog = false">取 消</el-button>
          <el-button type="primary" @click="selectIconDialog = false">确 定</el-button>
          </span>
          </el-dialog>
        </el-card>
      </el-col>
    </el-row>
  </imp-panel>

</template>
<script  type="text/babel">

  import panel from "../../components/panel.vue"
  import selectTree from "../../components/selectTree.vue"
  import treeter from "../../components/treeter"
  import merge from 'element-ui/src/utils/merge';

  import * as api from "../../api"

  export default {
    mixins: [treeter],
    components: {
      'imp-panel': panel,
      'el-select-tree': selectTree
    },
    data(){
      return {
        selectIconDialog:false,
        formLabelWidth: '100px',
        defaultProps: {
          children: 'children',
          label: 'name',
          id: "id",
        },
        maxId:7000000,
        menuTree: [],
        form: {
          id: null,
          name: '',
          sort: 0,
          icon:'',
          href: '',
          isShow: '',
          delivery: false,
          parentId: null,
          desc: ''
        }
      }
    },
    methods: {
      selectIcon(event){
        this.form.icon = event.target.className;
        this.selectIconDialog = false;
      },
      renderContent(h, {node, data, store}) {
        return (
          <span>
            <span>
              <span><i class={data.icon}></i>&nbsp;{node.label}</span>
            </span>
          </span>);
      },
      newAdd(){
        this.form = {
          id: null,
          name: '',
          sort: 0,
          icon:'',
          href: '',
          isShow: '',
          delivery: false,
          parentId: null,
          desc: ''
        };
      },
      deleteSelected(){
        this.$http.get(api.SYS_MENU_DELETE + "?menuIds=" + this.form.id)
          .then(res => {
            this.$message('操作成功');
            this.deleteFromTree(this.menuTree, this.form.id);
            this.newAdd();
          }).catch(e =>{
            this.$message('操作成功');
            this.deleteFromTree(this.menuTree, this.form.id);
            this.newAdd();
        })
      },
      batchDelete(){
        var checkKeys = this.$refs.menuTree.getCheckedKeys();
        if (checkKeys == null || checkKeys.length <= 0) {
          this.$message.warning('请选择要删除的资源');
          return;
        }
        this.$confirm('确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.get(api.SYS_MENU_DELETE + "?menuIds=" + checkKeys.join(','))
            .then(res => {
              this.$message('操作成功');
              this.load();
            }).catch(e => {
             this.$message('操作成功');
            console.log(checkKeys);
            this.batchDeleteFromTree(this.menuTree, checkKeys);
          })
        });

      },
      handleNodeClick(data){
        this.form = merge({}, data);
      },
      onSubmit(){
        if (this.form.id == null) {
          this.$http.post(api.SYS_MENU_ADD, this.form)
            .then(res => {
              this.$message('操作成功');
              this.form.id = res.data.id;
              this.appendTreeNode(this.menuTree, res.data);
            }).catch(e => {
                this.maxId += 1;
                this.$message('操作成功');
                this.form.id = this.maxId;
                var  ddd = {
                  id: this.form.id,
                  name: this.form.name,
                  sort: this.form.sort,
                  icon:this.form.icon,
                  href:this.form.href,
                  isShow: this.form.isShow,
                  delivery: this.form.delivery,
                  parentId: this.form.parentId,
                  desc: this.form.desc,
                  children:[]
                }
                console.log(ddd)
                this.appendTreeNode(this.menuTree, ddd);
            this.menuTree.push({});
            this.menuTree.pop();
          })
        } else {
          this.$http.post(api.SYS_MENU_UPDATE, this.form)
            .then(res => {
              this.$message('操作成功');
              this.updateTreeNode(this.menuTree, res.data);
            }).catch(e=>{
            this.$message('操作成功');
            this.updateTreeNode(this.menuTree, merge({},this.form));
          })
        }
      },
      load(){
        this.$http.get(api.TEST_DATA)
          .then(res => {
            this.menuTree = res.data.menuList;
          }).catch((error) => {
           console.log(error)
        })
      }
    },
    created(){
      this.load();
    }
  }
</script>

<style>
  .select-tree .icons-wrapper{
    display: block;
  }
  .select-tree .is-empty i{
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    display: inline-block;
    cursor: pointer;
  }
  .select-tree .is-empty i:hover{
    background-color: #0d6aad;
    color: #ffffff;
  }

</style>
