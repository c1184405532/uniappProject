<script>
	export default {
		globalData:{
			//baseUrl:"http://192.168.0.101:9999",
			baseUrl:"http://192.168.8.38:9999",
		},
		//当uni-app 初始化完成时触发（全局只触发一次）
		onLaunch: function() {
			console.log('App Launch');
		},
		//当 uni-app 启动，或从后台进入前台显示
		onShow: function() {
			console.log('App Show');
		},
		//当 uni-app 从前台进入后台
		onHide: function() {
			console.log('App Hide');
		}
	}
</script>

<style>
	/* 头条小程序需要把 iconfont 样式放到组件外 */
	@import "components/m-icon/m-icon.css";

	/*每个页面公共css */
	page {
		min-height: 100%;
		display: flex;
		font-size: 16px;
	}

	/* #ifdef MP-BAIDU */
	page {
		width: 100%;
		height: 100%;
		display: block;
	}

	swan-template {
		width: 100%;
		min-height: 100%;
		display: flex;
	}

	/* 原生组件模式下需要注意组件外部样式 */
	custom-component {
		width: 100%;
		min-height: 100%;
		display: flex;
	}

	/* #endif */

	/* #ifdef MP-ALIPAY */
	page {
		min-height: 100vh;
	}

	/* #endif */

	/* 原生组件模式下需要注意组件外部样式 */
	m-input {
		width: 100%;
		/* min-height: 100%; */
		display: flex;
		flex: 1;
	}

</style>
