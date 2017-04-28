<template>
  <div class="box">
    <div class="box-header" v-if="title || $slots.header" :class="{'with-border':widthBorder}">
      <slot name="header"><h3 class="box-title" v-text="title" v-if="title"></h3></slot>
    </div>
    <div class="box-body">
      <slot name="body" v-if="$slots.body">
        暂无内容显示
      </slot>
      <slot v-else>
      </slot>
    </div>
    <div class="box-footer" v-text="footer" v-if="footer">
    </div>
  </div>
</template>
<script type="text/javascript">
  export default{
    name:"ImpPanel",
    props: {
      widthBorder:{
          type:Boolean
      },
      title: {
        type: String
      },
      footer: {
        type: String
      }
    }
  }
</script>
<style scoped>
  .box{
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
    border: 1px solid #d3dce6;
    border-radius: 4px;
  }

  .box {
    position: relative;
    border-radius: 5px;
    background: #ffffff;
    /*border-top: 3px solid #d2d6de;*/
    margin-bottom: 20px;
    width: 100%;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  }

  .box .overlay.dark,
  .overlay-wrapper .overlay.dark {
    background: rgba(0, 0, 0, 0.5);
  }
  .box-header:before,
  .box-body:before,
  .box-footer:before,
  .box-header:after,
  .box-body:after,
  .box-footer:after {
    content: " ";
    display: table;
  }
  .box-header:after,
  .box-body:after,
  .box-footer:after {
    clear: both;
  }
  .box-header {
    color: #444;
    display: block;
    padding: 15px;
    position: relative;
  }
  .box-header.with-border {
    border-bottom: 1px solid #f4f4f4;
  }
  .collapsed-box .box-header.with-border {
    border-bottom: none;
  }
  .box-header > .fa,
  .box-header > .glyphicon,
  .box-header > .ion,
  .box-header .box-title {
    display: inline-block;
    font-size: 18px;
    margin: 0;
    line-height: 1;
  }
  .box-header > .fa,
  .box-header > .glyphicon,
  .box-header > .ion {
    margin-right: 5px;
  }
  .box-header > .box-tools {
    position: absolute;
    right: 10px;
    top: 5px;
  }
  .box-header > .box-tools [data-toggle="tooltip"] {
    position: relative;
  }
  .box-header > .box-tools.pull-right .dropdown-menu {
    right: 0;
    left: auto;
  }
  .box-header > .box-tools .dropdown-menu > li > a {
    color: #444!important;
  }

  .box-body {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px;
    padding: 10px;
  }

  .box-footer {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px;
    border-top: 1px solid #f4f4f4;
    padding: 10px;
    background-color: #ffffff;
  }
</style>
