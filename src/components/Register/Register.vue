<template>
  <div id="Register">
    <h1>{{title}}</h1>
    <mu-container>
      <mu-form ref="form" :model="validateForm" class="mu-demo-form">
        <mu-form-item label="用户名" prop="username" :rules="usernameRules">
          <mu-text-field class="username" v-model="validateForm.username" prop="username"></mu-text-field>
        </mu-form-item>
        <mu-form-item label="请输入密码" prop="password" :rules="passwordRules">
          <mu-text-field type="password" v-model="validateForm.password" prop="password"></mu-text-field>
        </mu-form-item>
        <p>
          <router-link to="/" tag="li">返回登录</router-link>
        </p>
        <mu-form-item class="logincontent">
          <mu-button color="primary" @click="submit">注册</mu-button>
        </mu-form-item>
      </mu-form>
    </mu-container>
  </div>
</template>

<script>
  import Axios from "axios";
  export default {
    name: "Register",
    data(){
      return{
        title:"注册",
        usernameRules: [
          { validate: (val) => !!val, message: '必须填写用户名'},
          { validate: (val) => val.length >= 3, message: '用户名长度大于3'}
        ],
        passwordRules: [
          { validate: (val) => !!val, message: '必须填写密码'},
          { validate: (val) => val.length >= 3 && val.length <= 10, message: '密码长度大于3小于10'}
        ],
        validateForm: {
          username: '',
          password: '',
        }
      }
    },
    methods:{
      submit () {
        const that =this;
        that.$refs.form.validate().then((result) => {
          // console.log(that.validateForm.username);
          const api = window.g.register;
          const param = new URLSearchParams();
                param.append("newUserName",that.validateForm.username);
                param.append("newUserPwd",that.validateForm.password);
          Axios.post(api,param).then((res)=>{
              console.log(res);
              const code = res.data.code;
              if (code === 200){
                  that.$router.push("/")
              }
          },(err)=>{
            console.log(err)
          })
        });
      },
      clear () {
        this.$refs.form.clear();
        this.validateForm = {
          username: '',
          password: '',
          isAgree: false
        };
      },
    },
    mounted() {

    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #Register
    padding 3%
    font-size 20px
    font-weight bold
  & h1
    text-align center
    margin-top  28%
    color #292b33
    font-size 26px
    font-weight bold
    margin-bottom 10%
  .mu-demo-form
    width 100%
    max-width 460px
  & .mu-text-field-input
    /*background #f8f8f8*/
    border-radius -2%
    text-align center
  & p
    text-align right
    font-size 14px
    color #8f8f8f
  .logincontent
    margin-top 16%
  & .mu-button
    margin 0px !important
    background #292b33
    height 50px
    line-height 50px
    width 100%

</style>
