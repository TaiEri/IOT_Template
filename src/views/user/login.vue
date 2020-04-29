<template>
  <div class="login">
    <el-card class="login-wrap">
      <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="ruleForm">
        <el-form-item
          prop="userName"
          :rules="[
        { required: true, message: '用户名不能为空'}
      ]"
        >
          <el-input
            type="text"
            v-model="ruleForm.userName"
            placeholder="请输入用户名"
            autocomplete="off"
            @keyup.enter.native="submitForm('ruleForm')"
          ></el-input>
        </el-form-item>
        <el-form-item prop="pwd" :rules="[
        { required: true, message: '密码不能为空'}
      ]">
          <el-input
            type="password"
            placeholder="请输入密码"
            v-model="ruleForm.pwd"
            autocomplete="off"
            @keyup.enter.native="submitForm('ruleForm')"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code" :rules="[
        { required: true, message: '公司代码不能为空'}
      ]">
          <el-input
            type="text"
            placeholder="请输入公司代码"
            v-model="ruleForm.code"
            autocomplete="off"
            @keyup.enter.native="submitForm('ruleForm')"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="login-btn" type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { loginReq } from '../../api/index'
import CryptoJS from 'crypto-js'
import { mapState } from 'vuex'
export default {
  name: 'Login',
  data () {
    return {
      ruleForm: {
        userName: '',
        pwd: '',
        tiping: false,
        code: ''
      }
    }
  },
  computed: {
    ...mapState({
      device_UDID: state => state.device_UDID
    })
  },
  methods: {
    tipCloseCallback (obj) {
      this.tiping = false
    },
    submitForm (formName) {
      console.log({ username: this.ruleForm.userName, pwd: this.ruleForm.pwd, dev_sn: this.device_UDID })
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          // 发送登陆请求
          const result = await loginReq({ username: this.ruleForm.userName, pwd: this.ruleForm.pwd, company: this.ruleForm.code, dev_sn: this.device_UDID })
          console.log(result)
          if (result.ret === '0') {
            if (!this.tiping) {
              this.tiping = true
            }
            const info = { user: this.ruleForm.userName, ...result }
            this.$store.dispatch('getUserInfo', info)
            sessionStorage.setItem('userInfo', JSON.stringify(info))
            // 加密保存
            const access = this.ruleForm.userName + '&' + this.ruleForm.pwd + '&' + this.ruleForm.code
            // Encrypt
            const ciphertext = CryptoJS.AES.encrypt(access, 'xxx').toString()
            sessionStorage.setItem('access', ciphertext)
            // 判断是否已经选择了房间
            const flag = localStorage.getItem('room_flag')
            console.log('flag', flag)
            if (flag) {
              this.$router.replace('/')
            } else {
              this.$router.replace('/rooms')
            }
            // this.$router.replace('/')
          } else {
            if (!this.tiping) {
              this.$message({
                message: 'xixixixixi',
                type: 'error',
                onClose: this.tipCloseCallback
              })
              this.tiping = true
            }
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style lang="less">
@import "../../styles/public.less";
#app {
  background-color: #202228;

  .login {
    .size(100%, 100%);
    background-image: url("../../assets/images/login_bg.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;

    .login-wrap {
      .size(420px, 310px);
      .box-center();
      border: none;
      background-color: #444750;

      .el-card__body {
        padding-left: 0;

        .el-form {
          margin-top: 20px;

          .el-form-item {
            width: 100%;

            .el-form-item__content {
              margin-left: 20px !important;
              position: relative;
              .el-input__inner {
                height: 40px;
                background-color: #1e2025;
                border: none;
              }
              .login-btn {
                .size(280px, 45px);
                .position-absolute(50%, 12px);
                transform: translateX(-50%);
                background-color: #3f70e9;
                outline: none;
                border: none;
                & > span {
                  font-size: 16px;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
