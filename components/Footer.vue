<template>
		<footer class="site-footer">
			<div class="footer-link">
				<!-- <a href="#">关于我们</a>
				<span>|</span>
				<a href="#">联系我们</a>
				<span>|</span>
				<a href="#">加盟合作</a> -->
				<router-link to="/help/photo_strategy">旅拍攻略</router-link>
				<span>|</span>
				<router-link to="/help/tourism_strategy">旅游攻略</router-link>
			<!-- 	<span>|</span>
				<router-link to="/help/attentions">注意事项</router-link> -->
			</div>
	   <!--  <p class="copyright">
	    	Copyright©2017 www.yueshijue.com All Rights Reserved
	    </p> -->
	    <!-- <p>京公网备31010502000018号</p>
	    <p>旅游违法行为举报电话12318 | 服务质量投诉电话962020 | 北京市旅游网站落实诚信建设主体责任承诺书</p> -->
	  </footer>
</template>
<style scoped lang="scss">
	.site-footer {
    position: relative;
    overflow: hidden;
    padding: 10px 0 20px;
    text-align: center;
    color: #fff;
    font-size: 13px;
    background: #000;
    p {
    	margin: 5px 0;
    }
    .footer-link {
			margin: 20px 0;
			font-size: 14px;
			a {
				font-size: 14px;
				color: #fff;
			}
			span {
				margin: 0 15px
			}
		}
	}
</style>