<template>
  <div class="dashboard" ref="dashboard">
    <el-row>
      <el-col :span="24">
        <div id="gotobedbar"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import echarts from 'echarts';
  import macarons from 'echarts/theme/macarons';
  import data from '../../static/data/data.json';
  import {mapGetters, mapActions, mapMutations} from 'vuex'
  const getBeforeDate = (n) => {
    var list = [];
    var d = new Date(); // 这个算法能自动处理闰年和非闰年。2012年是闰年，所以2月有29号
    var s = '';
    var i = 0;
    while (i < n) {
      d.setDate(d.getDate() - 1);
      var year = d.getFullYear();
      var mon = d.getMonth() + 1;
      var day = d.getDate();
      list.push(year + "-" + (mon < 10 ? ('0' + mon) : mon) + "-" + (day < 10 ? ('0' + day) : day));
      i++;
    }
    return list.reverse();
  }

  const option = {
    title: {
      text: '每日数据统计',
      subtext: '纯属虚构',
      left:'center',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer : {            // 坐标轴指示器，坐标轴触发有效
        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    legend: {
      data: ['指标1', '指标2', '指标3', '指标4'],
      orient:'vertical',
      left:'right',
      top:'middle',//如果 top 的值为'top', 'middle', 'bottom'，组件会根据相应的位置自动对齐。
      itemGap:20
    },
    toolbox: {
      show: true,
      orient: 'horizontal',      // 布局方式，默认为水平布局，可选为：
      // 'horizontal' ¦ 'vertical'
      x: 'right',                // 水平安放位置，默认为全图右对齐，可选为：
                                 // 'center' ¦ 'left' ¦ 'right'
                                 // ¦ {number}（x坐标，单位px）
      y: 'top',                  // 垂直安放位置，默认为全图顶端，可选为：
                                 // 'top' ¦ 'bottom' ¦ 'center'
                                 // ¦ {number}（y坐标，单位px）
      color: ['#1e90ff', '#22bb22', '#4b0082', '#d2691e'],
      feature: {
        mark: {show: true},
        dataView: {show: true, readOnly: false},
        magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
        restore: {show: true},
        saveAsImage: {show: true}
      }
    },
    calculable: true,
    dataZoom: {
      show: true,
      realtime: true,
      start: 0,
      end: 100
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: getBeforeDate(30)
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '指标1',
        type: 'line',
        tiled : '总量',
        areaStyle: {normal: {}},
        data: function () {
          var list = [];
          for (var i = 1; i <= 30; i++) {
            list.push(Math.round(Math.random() * 1000));
          }
          return list;
        }()
      },
      {
        name: '指标2',
        type: 'line',
        tiled : '总量',
        areaStyle: {normal: {}},
        data: function () {
          var list = [];
          for (var i = 1; i <= 30; i++) {
            list.push(Math.round(Math.random() * 600));
          }
          return list;
        }()
      },
      {
        name: '指标3',
        type: 'line',
        tiled : '总量',
        areaStyle: {normal: {}},
        data: function () {
          var list = [];
          for (var i = 1; i <= 30; i++) {
            list.push(Math.round(Math.random() * 200));
          }
          return list;
        }()
      },
      {
        name: '指标4',
        type: 'line',
        tiled : '总量',
        areaStyle: {normal: {}},
        data: function () {
          var list = [];
          for (var i = 1; i <= 30; i++) {
            list.push(Math.round(Math.random() * 100));
          }
          return list;
        }()
      }
    ]
  };


  export default {
    data() {
      return {
        chart: null
      };
    },
    computed: {
      ...mapGetters({
        sidebar: 'sidebar',
        device: 'device',
      }),
    },
    methods: {

      drawbar(id) {
        let o = document.getElementById(id);
        let height = document.documentElement.clientHeight;
        height -= 120;
        o.style.height= height+"px";
        this.chart = echarts.init(o,'macarons');
        this.chart.setOption(option);
      }
    },
    mounted() {
      this.$nextTick(function () {
        this.drawbar('gotobedbar');
        var that = this;
        var resizeTimer = null;
        window.onresize = function () {
          if (resizeTimer) clearTimeout(resizeTimer);
          resizeTimer = setTimeout(function () {
            that.drawbar('gotobedbar');
          }, 300);
        }
      });
    },
    watch: {
      'sidebar.collapsed': function (val) {
        this.chart = {}
        var that = this;
        setTimeout(function () {
          that.drawbar('gotobedbar');
        }, 300);
      },
    }
  }
</script>

<style scoped>

  #gotobedbar {
    width: 100%;
    min-height: 500px;
    margin-right: 15px;
  }
</style>
