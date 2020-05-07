<template>
	<view class="">
		<button type="primary" @click="logout('login/login')">退出登录</button>
	</view>
</template>

<script>

export default {
	components: {
		
	},
	data() {
		return {
			
		};
	},
	//监听页面加载，其参数为上个页面传递的数据，参数类型为Object
	onLoad(params) {
		
	},
	//监听页面卸载
	onUnload(){
		
	},
	//监听用户下拉动作，一般用于下拉刷新 
	onPullDownRefresh(){
		
	},
	//页面滚动到底部的事件（不是scroll-view滚到底），常用于上拉加载下一页数据。如使用scroll-view导致页面级没有滚动，则触底事件不会被触发
	onReachBottom(){
		
	},
	//监听原生标题栏按钮点击事件，参数为Object  App、H5
	onNavigationBarButtonTap(e) {
		
	},
	//监听页面返回，返回 event = {from:backbutton、 navigateBack} ，
	//backbutton 表示来源是左上角返回按钮或 android 返回键；navigateBack表示来源是 uni.navigateBack ；
	onBackPress(){
		
	},
	//vue 生命周期 组件创建前
	created(){
		
	},
	//vue 生命周期 组件创建后
	mounted() {
		
	},
	//vue 生命周期 组件卸载后触发
	destroyed(){
		
	},
	methods: {
		logout(path){
			uni.reLaunch({
				url: '../'+ path
			});
		},			
		
	}
};
</script>
<style>
	
</style>
<style scoped lang="less">
	
</style>
