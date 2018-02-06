<template>
	<div class="main transition" @mousewheel.native="scroll">
		<div class="wrapper">
			<div class="container-fluid">
				<transition name="fade" mode="out-in">
					<router-view></router-view>
				</transition>
				<div class="wrap-footer"></div>
				<div class="btn-top transition" v-show="backShow" @click="toTop">
					<i class="el-icon-arrow-up"></i>
					<span>顶部</span>
				</div>
			</div>
		</div>
		<FooterComp></FooterComp>
	</div>
</template>
<script>
	import FooterComp from './Footer'
	export default {
		name: 'container',
		data () {
			return {
				userInfo: null,
				backShow: false,
			}
		},
		components: {
			FooterComp
		},
	  methods: {
	  	scroll () {
	  		this.backShow = window.scrollY >= 200 ? true : false;
	  	},
	    toTop () {
	    	let timer = null;
	      let gotoTop = () => {
	        let currentPosition = document.documentElement.scrollTop || document.body.scrollTop;
	        currentPosition -= currentPosition*0.2;
	        if (currentPosition > 0) {
	          window.scrollTo(0, currentPosition);
	        } else {
	          window.scrollTo(0, 0);
	          clearInterval(timer);
	          timer = null;
	        }
	      }
	      timer = setInterval(gotoTop, 1)
	    },
	    getUserInfo() {
	      getMyInfo().then(res => {
	        if(res.data.code === '0001') {
	          this.userInfo = res.data.result.userInfo
	        } else {
	          this.userInfo = null;
	        }
	      }).catch(err => {
	        console.log(err)
	        this.$catchError(err)
	      })
	    }
	  },
	  mounted () {
	  	document.addEventListener('scroll', this.scroll)
	  },
	  beforeDestroy() {
	  	document.removeEventListener('scroll', this.scroll)
	  }
	}
</script>
<style scoped lang="scss">
	.main {
		position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    .wrapper {
	    min-height: 100%;
	    height: auto !important;
	    height: 100%;
	    margin-bottom: -89px;
	  }
	}
	.main.spread {
		left: 0;
	}
  .container-fluid {
    margin-right: auto;
    margin-left: auto;
    padding: 0;
  }
  .el-breadcrumb {
		padding: 0 0 10px;
		font-size: 14px;
  }
  .wrap-footer {
		height: 89px;
	}
	.btn-top {
		position: fixed;
		right: 35px;
		bottom: 45px;
		z-index: 999;
		width: 45px;
		height: 45px;
		line-height: 45px;
		text-align: center;
		color: #999;
		cursor: pointer;
		background: #fff;
		border: 1px solid #e5e5e5;
		&:hover {
			i {
				display: none;
			}
			span {
				display: block;
			}
		}
		i {
			margin-top: 10px;
			font-size: 20px
		}
		span {
			display: none;
			font-size: 12px;
		}
	}
	.fade-enter-active, .fade-leave-active {
	  transition: all .3s;
	}
	.fade-enter, .fade-leave-active {
	  opacity: 0;
	}
</style>
