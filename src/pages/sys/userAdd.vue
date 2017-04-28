<template>
  <imp-panel :title="form.id ? '编辑':'新增用户'">
    <el-form ref="form" :model="form" label-width="180px">
      <el-form-item label="用户名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="登录用户名">
        <el-input v-model="form.loginName"></el-input>
      </el-form-item>
      <el-form-item label="手机">
        <el-input v-model="form.mobile"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="工号">
        <el-input v-model="form.no"></el-input>
      </el-form-item>
      <el-form-item label="固定电话">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-radio-group v-model="form.status">
          <el-radio :label="0">未激活</el-radio>
          <el-radio :label="1">已激活</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="用户类型">
        <el-radio-group v-model="form.userType">
          <el-radio label="0">注册用户</el-radio>
          <el-radio label="1">后台配置用户</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" v-model="form.remarks"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="info" @click="onEditSubmit" v-if="form.id">保存</el-button>
        <el-button type="primary" @click="onSubmit" v-else>立即创建</el-button>
      </el-form-item>
    </el-form>
  </imp-panel>
</template>
<script>
  import panel from "../../components/panel.vue"
  import * as api from "../../api"

  export default {
    components: {
      'imp-panel': panel
    },
    data(){
      return {
        form: {
          id: null,
          no: '',
          name: '',
          loginName: '',
          phone: '',
          email: '',
          mobile: '',
          status: 1,
          userType: '1',
          remarks: ''
        }
      }
    },
    created(){
      this.loadData();
    },
    methods: {
      onSubmit(){
        this.$http.post(api.SYS_USER_ADD, this.form)
          .then(res => {
            this.form = res.data;
            this.$confirm('添加成功, 是否返回列表?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'success'
            }).then(() => {
              this.$router.push({path: 'userList'})
            })
          })
      },
      onEditSubmit(){
        this.$http.post(api.SYS_USER_UPDATE, this.form)
          .then(res => {
            this.form = res.data;
            this.$confirm('修改成功, 是否返回列表?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'success'
            }).then(() => {
              this.$router.push({path: 'userList'})
            })
          })
      },
      loadData(){
        if (this.$route.query && this.$route.query != null && this.$route.query.id && this.$route.query.id != null) {
          this.form.id = this.$route.query.id;
          this.$http.get(api.SYS_USER_GET + "?id=" + this.form.id)
            .then(res => {
              this.form = res.data;
            })
        }
      }
    }
  }
</script>
