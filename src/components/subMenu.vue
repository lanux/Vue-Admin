<template>
  <el-submenu :index="item.href" v-if="item.children && item.children.length>0" class="el-menu-sub">
    <template slot="title"><i :class="item.icon"></i><span>{{item.name}}</span></template>
    <template v-for="child in item.children">
      <sub-menu v-if="child.children && child.children.length>0" :param="child"></sub-menu>
      <el-menu-item :index="child.href" v-else><i :class="child.icon"></i><span>{{child.name}}</span></el-menu-item>
    </template>
  </el-submenu>
  <el-menu-item :index="item.href" v-else class="el-menu-each"><i :class="item.icon"></i><span>{{item.name}}</span></el-menu-item>
</template>
<script>
  import subMenu from "./subMenu.vue"

  export default {
    name: 'subMenu',
    props: ['param'],
    data: function () {
      return {item: this.param}
    },
    components: {
      subMenu
    }
  }
</script>
<style>
  .el-menu .fa {
    margin-right: 10px;
  }
</style>
