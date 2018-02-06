<template>
  <div>
      <div class="dMain-container">
          <div class="login-register">
              <div class="login-register-box container clearfix2">
                  <div class="fr login-register-container">
                      <h3 class="loginP-title">会员登录</h3>
                      <ul class="loginP-main">
                            <li class="clearfix2 loginP-pBox">
                                <a class="fl clearfix2" href="javascript:;" @click="telLogin">
                                    <span class="fl loginP-pointer" :class="isChangeLoginType ? 'active' : ''"></span>
                                    <span class="fl loginP-txt">普通登录</span>
                                </a>
                                <a class="fl clearfix2" href="javascript:;" @click="normalLogin">
                                    <span class="fl loginP-pointer" :class="isChangeLoginType ? '' : 'active'"></span>
                                    <span class="fl loginP-txt">手机动态密码登录</span>
                                </a>
                            </li>
                            <!-- <div class="normalLogin" v-show="isChangeLoginType">
                                <li class="clearfix2 loginP-nameBox">
                                <p class="fl">登录名</p>
                                <input class="loginP-name J_inputFocus" type="text" placeholder="用户名/手机号/邮箱" v-model="username">
                                <span class="loginP-errorInfo">{{uernameErrorInfo}}</span>
                                </li>
                                <li class="clearfix2 loginP-nameBox">
                                    <p class="fl">密　码</p>
                                    <input class="loginP-name" type="password" placeholder="请输入密码" v-model="password">
                                    <span class="loginP-errorInfo">{{passwordErrorInfo}}</span>
                                </li>
                                <li class="clearfix2 loginP-help" style="width:233px;float: left;display: block;margin-bottom: 0px;">
                                    <input type="checkbox" id="re_password1" style="margin-left:140px;float:left;display: block;">
                                    <label for="re_password1" style="color:#fff;float: left;margin-left:10px;font-size:12px;cursor:pointer;display: block">记住密码</label>
                                </li>
                                <li class="loginP-go clearfix2">
                                    <a id="loginGo" class="fr" href="javascript:void(0)" @click="login1">登录</a>
                                </li>
                            </div>
                            <div class="normalLogin" v-show="!isChangeLoginType">
                                <li class="clearfix2 loginP-nameBox">
                                    <p class="fl">登录名</p>
                                    <input class="fr loginP-name" type="text" placeholder="请输入注册的手机号" v-model="telephone">
                                </li>
                                <li class="clearfix2 loginP-nameBox">
                                    <p class="fl">验证码</p>
                                    <input type="text" class="fl code-input" value="" placeholder="请输入验证码" v-model="codeInput1">
                                    <input type="text" readonly="readonly" class="code_readOnly fl" v-model="randomCode">
                                </li>
                                <li class="clearfix2 loginP-nameBox" style="position: relative;">
                                    <p class="fl">动态码</p>
                                    <input type="text" class="fl code-input" value="" placeholder="动态密码" v-model="codeInput2">
                                    <input type="text" readonly="readonly" class="code_readOnly fl" placeholder="点击发送" v-model="sendCode">
                                    <div class="mengCeng hide cursor" style="width:101px;height:36px;position: absolute;z-index: 2;top:0;right:0;" @click="dynamicVerificationCode()"></div>
                                </li>
                                <li class="loginP-go clearfix2">
                                    <a id="loginGo" href="javascript:void(0)" @click="login2">登录</a>
                                </li>
                            </div>  -->
                            <li class="clearfix2 loginP-nameBox">
                                <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                                    <el-form-item label="登录名" prop="username">
                                        <el-input type="text" v-model="username" auto-complete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="密码" prop="pass">
                                        <el-input type="password" v-model="password" auto-complete="off"></el-input>
                                    </el-form-item>
                                </el-form>
                            </li>

                      </ul>
                  </div>
              </div>
          </div>
      </div>

      <Footer></Footer>
  </div>
</template>

<script>
import { login, forgetpassword } from "@/api";
import Footer from "@/components/Footer.vue";
export default {
  data() {
    return {
      isChangeLoginType: true,
      username: "",
      password: "",
      telephone: "",
      codeInput1: "",
      codeInput2: "",
      randomCode: '',
      sendCode: "",
      count: '',
      timer: null,
      uernameErrorInfo: '',
      passwordErrorInfo: '',
      ruleForm2: {
          username: '',
          pass: '',
        },
        rules2: {
          username: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          pass: [
            { required: true, message: '请输入密码', trigger: 'blur' }//这里需要用到全局变量
          ],
        }
    };
  },
  created() {
    this.randomCodeFn();
  },
  methods: {
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
        if (valid) {
            alert('submit!');
        } else {
            console.log('error submit!!');
            return false;
        }
        });
    },
    resetForm(formName) {
        this.$refs[formName].resetFields();
    },
    randomCodeFn() {
      var codeLength = 4;
      var random = new Array(
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
      );
      for (var i = 0; i < codeLength; i++) {
        var index = Math.floor(Math.random() * 36);
        this.randomCode += random[index];
      }
    },
    normalLogin() {
      this.isChangeLoginType = false;
    },
    telLogin() {
      this.isChangeLoginType = true;
    },
    login1() {
      if (this.username.trim().length == "") return this.uernameErrorInfo = "用户名不能为空";
      var uernameReg = /^([\u4e00-\u9fa5]{0,}|[a-zA-Z0-9_-]{2,6}|1[3|4|5|7|8][0-9]\d{8}|(\w-*\.*)+@(\w-?)+(\.\w{2,})+)$/; //中文、英文、手机号码、邮箱
      if (!uernameReg.test(this.username)) return this.uernameErrorInfo = "用户名格式不对";
      if (this.password.trim().length == "") return this.passwordErrorInfo = "密码不能为空";
      // var passwordReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/
      // if(!passwordReg.test(this.password))
      // return this.$message("至少输入6位密码！");

      let data = {
        username: this.uername,
        loginType: "1",
        password: this.password,
        storeId: sessionStorage.getItem("providerId"),
        // storeId: "23",
        autoLogin: "1"
      };
      login(data).then(res => {
        console.log(res);
        if (res.status == 1) {
          this.$message("登录成功");
          this.$router.push("/index");
        } else {
        }
      });
    },
    login2() {
      if (this.telephone.trim().length == "") return this.$message("手机号码不能为空");
      var telephoneReg = /^1[3|4|5|7|8][0-9]\d{8}$/;
      if (!telephoneReg.test(this.telephone))
        return this.$message("请输入正确的手机格式");
      if (this.codeInput1.trim().length == "") return this.$message("验证码不能为空");
      if (this.codeInput1 !== this.randomCode) return this.$message("验证码不正确");
      if (this.codeInput2.trim().length == "") return this.$message("动态码不能为空");

      let data = {
        phone: this.telephone,
        storeId: sessionStorage.getItem("providerId")
      };
      forgetpassword(data).then(res => {
        if (res.status == 1) {
          console.log(验证码发送成功);
        }
      });
    },
    dynamicVerificationCode() {
        clearInterval(this.timer)
        this.timer = null;
       const TIME_COUNT = 60;
        if (!this.timer) {
        this.count = TIME_COUNT;
        // this.show = false;
        this.timer = setInterval(() => {
        if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
        } else {
            this.show = true;
            clearInterval(this.timer);
            this.timer = null;
        }
        console.log(this.count)
            this.sendCode = this.count + 's'
            if(this.count == 0){
                this.sendCode = '点击发送'
            }
        }, 1000)
        }
    }
  },
  components: {
    Footer
  }
};
</script>

<style lang="scss" scoped>
.dMain-container {
  position: relative;
  z-index: 1;
  width: 100%;
  margin: auto;
  .login-register {
    max-width: 1920px;
    height: 813px;
    margin: auto;
    background: url("http://pai.yueshijue.com/assets/img/img/background.png")
      center bottom no-repeat;
    .login-register-container {
      margin-top: 80px;
      margin-right: 100px;
      width: 340px;
      height: auto;
      background: url("../assets/img/opacity2.png") repeat;
      padding: 20px 30px;
      box-sizing: content-box;
      .loginP-title {
        font-weight: normal;
        padding-bottom: 15px;
        font-size: 18px;
        color: #fff;
      }
      .loginP-main {
        width: 100%;
        margin: auto;
        border-top: 1px solid #fff;
        padding-bottom: 20px;
        .loginP-pBox {
          width: 290px;
          margin: auto;
          margin-left: 12px;
          .loginP-pointer {
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background-color: #fff;
            border: 5px solid #fff;
            margin: 40px 6px 0 12px;
          }
          .active {
            border: 5px solid #41aaff;
          }
          .loginP-txt {
            font-size: 14px;
            color: #fff;
            line-height: 54px;
            margin-top: 20px;
          }
        }
        li {
          margin: 0 70px 20px 70px;
        }
        .loginP-nameBox {
          width: 290px;
          margin: 0 auto;
          p {
            font-size: 16px;
            color: #fff;
            width: 50px;
            line-height: 36px;
            margin-right: 20px;
          }
          input {
            width: 220px;
            height: 36px;
            line-height: 36px;
            border: none;
            padding-left: 20px;
          }
          span{
            color: #ff4949;
            height: 30px;
            line-height: 30px;
            padding-left: 70px;
          }
          .code-input {
            width: 99px;
            height: 36px;
            padding-left: 10px;
          }
          .code_readOnly {
            width: 100px;
            height: 36px;
            background-color: #dddddd;
            margin-left: 20px;
            letter-spacing: 2px;
            font-style: italic;
            text-align: center;
            padding-left: 0;
            cursor: pointer;
          }
        }
        .loginP-go {
          width: 290px;
          margin: 0 auto;
          a {
            display: block;
            color: #fff;
            font-size: 16px;
            width: 290px;
            height: 36px;
            text-align: center;
            line-height: 36px;
            margin-top: 20px;
            background-color: #19a9e8;
          }
        }
      }
    }
  }
}
</style>
