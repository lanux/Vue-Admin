<template>
  <imp-panel title="重置密码">
    <el-form ref="form" :model="form" label-width="180px">
      <el-form-item label="旧密码">
        <el-input v-model="form.oldPwd" type="password"></el-input>
      </el-form-item>
      <el-form-item label="新密码">
        <el-input v-model="form.newPwd" type="password"></el-input>
      </el-form-item>
      <el-form-item label="重复新密码">
        <el-input v-model="form.newPwd2" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">修改</el-button>
      </el-form-item>
    </el-form>
  </imp-panel>
</template>
<script>
  import * as api from "../api"
  export  default{
    data(){
      return {
        form: {
          oldPwd: '',
          newPwd: '',
          newPwd2: ''
        }
      }
    },
    methods: {
      onSubmit(){
        if (this.newPwd !== this.newPwd2) {
          this.$message({type: "error", message: "两次输入密码不一致"});
          return;
        }
        this.$http.post(api.CHANGE_PWD, this.form)
          .then(res => {
          this.$message("修改成功");
      })
      }
    }
  }
</script>
