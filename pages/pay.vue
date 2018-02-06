<template>
  <div class="container">
    <div class="payWay clearfix2">
        <ul id="wxpPayWay" class="fl clearfix2 payWayClick cursor" @click="wxpClick($event)" data-type="WXP">
           <li class="fl paySelect" :class=" isActive ? 'active' : ''"></li>
           <li class="fl clearfix2 payBz">
               <div class="fl iconJ iconWechat"></div>
               <span>微信支付</span>
           </li>
        </ul>
        <ul id="ybfPayWay" class="fl clearfix2 payWayClick cursor" @click="ybfClick($event)" data-type="YBF">
           <li class="fl paySelect" :class=" isActive ? '' : 'active' "></li>
           <li class="fl clearfix2 payBz">
               <img src="../assets/img/logo_ybfpay1.png">
               <img src="../assets/img/logo_ybfpay2.png">
           </li>
        </ul>
        <div class="pay-button">
            <button id="payBtn" class="btn btn-primary btn-lg" @click="confirmPay">确认支付</button>
        </div>
    </div>

    <div v-show="showDialog" id="qrCodeDialog" class="dialog-wrapper">
        <div class="dialog">
            <div class="dialog-header">
                <h3 class="dialog-title">{{dialogTitle}}</h3>
                <i class="fr btn-close dialog-close cursor" @click="removeDialog">x</i>
            </div>
            <div class="dialog-body">
                <img src="../assets/img/dialog.jpg" alt="">
            </div>
        </div>
    </div>

    
  </div>
</template>

<script>
import { getOrderInfoByPayId , yueInstalment } from "@/api";
export default {
  data() {
    return {
      isActive: true,
      payChannel: "WXP",
      showDialog: false,
      dialogTitle: "",
      urlF: window.location.href.split("?")[1],
      dataUrl:
        '{"id":"' + window.location.href.split("?")[1] + '","payType":"1"}',
      socketUrl: 'ws://' + window.location.host + '/pay/webSocket',
      orderId: "",
      nm: 0,
      type: '',
      timer: null,
    };
  },
  created() {
    this.setInterFn();
  },
  methods: {
    setInterFn() {
      let data = {
        id: this.orderId,
        payType: this.type
      };
      getOrderInfoByPayId(data).then(res => {
        if (res.status == 1) {
          if (res.data == "SUCCESS") {
            clearInterval(this.timer);
            this.$message("这是一条消息提示");
            setTimeout(function() {
              if (type == 0) {
                // window.location.href = "./fillInfo.html?0?" + this.orderId;
                this.$router.push('/fillInfo.html?0?'+ this.orderId)
              } else if (type == 1) {
                // window.location.href = "./fillInfo.html?1?" + this.orderId;
                this.$router.push('/fillInfo.html?1?'+ this.orderId)                
              }
            }, 1100);
          } else if (res.data == "FAIL") {
            this.nm += 1;
            if (this.nm == 75) {
              clearInterval(this.timer);
              this.$message("支付失败");
            }
          }
        }
      });
    },
    payFn(data) {
      if (data.status == 1) {
        this.type = data.data.orderType;
        this.orderId = data.data.orderId;
        this.timer = setInterval(function() {
          this.setInterFn();
        }, 8000);
      }
    },
    wxpClick(e) {
      this.isActive = true;
      this.payChannel = document
        .getElementById("wxpPayWay")
        .getAttribute("data-type");
      console.log(this.payChannel);
      console.log(this.urlF);
    },
    ybfClick(e) {
      this.isActive = false;
      this.payChannel = document
        .getElementById("ybfPayWay")
        .getAttribute("data-type");
      console.log(this.payChannel);
    },
    confirmPay() {
      this.showDialog = true;
      if (this.payChannel === "WXP") {
        this.dialogTitle = "打开微信扫一扫";
      } else if (this.payChannel === "YBF") {
        this.dialogTitle = "悦百分分期支付";
      }
      let data = this.urlF;
      getOrderInfoByPayId(data).then(res => {
        this.payFn(res);
        if (this.payChannel == "YBF") {
          let data1 = {
            orderId: this.urlF
          };
          yueInstalment(data1).then(res => {
            if (res.url) {
              window.location.href = res.url;
            } else {
              alert(res.msg);
            }
          });
        }
      });

      // 创建websocket
      var socket = new WebSocket(this.socketUrl);
      socket.onopen = () => {
        console.log("WebSocket Open");
        socket.send("hello");
        timer = setInterval(() => {
          console.log("hello");
          socket.send("hello");
        }, 20000);
      };
      socket.onmessage = e => {
        console.log(e.data);
        if (e.data.indexOf("{") > -1) {
          let data = JSON.parse(e.data);
          if (data.code === "0001") {
            socket.close();
            window.location.href = data.result.redirectUrl;
          }
        }
      };
      socket.onclose = e => {
        console.log("WebSocket Closed");
        clearInterval(this.timer);
      };
      socket.onerror = e => {
        console.log("WebSocket Error");
      };
    },
    removeDialog() {
      this.showDialog = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.payWay {
  margin-top: 100px;
  border-bottom: 1px solid #dedede;
  padding-bottom: 30px;
  .payWayClick {
    margin-right: 40px;
    &:hover {
      .payBz {
        img:nth-child(2) {
          height: 24px;
        }
      }
    }
    .paySelect {
      width: 15px;
      height: 15px;
      border: 5px solid #eee;
      border-radius: 50%;
      margin-top: 14px;
      position: relative;
    }
    .active {
      border: 5px solid #41aaff;
    }
  }

  .payBz {
    height: 65px;
    line-height: 40px;
    font-size: 16px;
    color: #282828;
    .iconWechat {
      width: 40px;
      height: 40px;
      margin-right: 8px;
      margin-left: 10px;
    }
    .iconJ {
      background: url("../assets/img/pay_icon.png") no-repeat -358px -39px;
      display: inline-block;
    }
    img {
      margin-left: 10px;
      display: block;
    }
    img:nth-child(2) {
      width: 125px;
      margin-top: 5px;
      margin-left: 10px;
      height: 0;
      transition: all 1s;
    }
  }

  .pay-button {
    display: inline-block;
    margin-top: 6px;
    margin-left: 50px;
    vertical-align: middle;
  }
}

.dialog-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  .dialog {
    position: absolute;
    top: 50%;
    left: 50%;
    min-width: 300px;
    height: auto;
    background-color: #fff;
    box-shadow: 1px 1px 5px 3px rgba(0, 0, 0, 0.1);
    transform: translate(-50%, -50%);
    .dialog-header {
      padding: 20px 10px;
      text-align: center;
      font-size: 18px;
      color: #666;
      overflow: hidden;
      .dialog-title {
        display: inline-block;
        font-size: 18px;
      }
      .btn-close {
        margin-top: -5px;
        font-size: 24px;
        font-style: normal;
      }
    }
    .dialog-body {
      padding: 10px 50px 40px;
      text-align: center;
    }
  }
}
</style>
