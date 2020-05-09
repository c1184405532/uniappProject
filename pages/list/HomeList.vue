<template>
	<view class="list_component_box">
		<div class="list" v-for="(value,index) in listData" :key="index" @click="gotoDetail('home/listReveal/detail',value)">
			<p>姓名：{{value.name}}</p>
			<p>年龄：{{value.age}}</p>
		</div>
	</view>
</template>

<script>
	import Request from '@/js_sdk/request/Request.js'
	export default {
		components: {

		},
		data() {
			return {
				listData: [

				],
				page: 1,
				listTotal: 0,
			};
		},
		//监听页面加载，其参数为上个页面传递的数据，参数类型为Object
		onLoad(params) {
			console.log('onLoad')
		},
		onReady() {
			console.log('onReady')
		},
		//监听页面卸载
		onUnload() {
			console.log('onUnload')
		},
		//监听用户下拉动作，一般用于下拉刷新 
		onPullDownRefresh() {
			this.page = 1;
			this.listData = [];
			//this.finishedText = '';
			this.getList({
				clearRefresh:true,
				successMessage:"刷新成功"
			})
		},
		//页面滚动到底部的事件（不是scroll-view滚到底），常用于上拉加载下一页数据。如使用scroll-view导致页面级没有滚动，则触底事件不会被触发
		onReachBottom() {

		},
		//监听原生标题栏按钮点击事件，参数为Object  App、H5
		onNavigationBarButtonTap(e) {

		},
		//监听页面返回，返回 event = {from:backbutton、 navigateBack} ，
		//backbutton 表示来源是左上角返回按钮或 android 返回键；navigateBack表示来源是 uni.navigateBack ；
		onBackPress() {

		},
		//vue 生命周期 组件创建前
		created() {
			console.log('created')
		},
		//vue 生命周期 组件创建后
		mounted() {
			this.getList();
			console.log("mounted")
		},
		//vue 生命周期 组件卸载后触发
		destroyed() {
			console.log('destroyed')
		},
		methods: {
			gotoDetail(routerName, data) {
				//window.setLocalStorage('homelistReveallistScrollTop',this.$refs.ListComponentsRef.$el.scrollTop)
				//window.vm.$emit('setKeepAliveData','homelistReveallist')
				// this.$router.push({
				// 	name:routerName,
				// 	query:data
				// })
			},
			getList(getDataType) {
				Request.get('api/list', {
					//当前页数
					data: {
						page: this.page,
					},
					//此配置详见Request.js配置
					requestToastConfig: {
						beforeRequestToastType: getDataType ? getDataType.beforeRequestToastType : true,
						successRequestToastType:getDataType && getDataType.clearRefresh ? true : false,
						successMessage:getDataType && getDataType.successMessage
					}
				}).then((res) => {
					//console.log('刷新成功',res)  
					if (res.success) {
						//数据合并
						this.listData = [...this.listData, ...res.data.list]
						this.listTotal = res.data.total;
						//如果数据全部加装完毕 设置滚动到底状态为完成
						//滚动到底文字为没有更多了
						if (this.listData.length >= this.listTotal) {
							//this.finishedText = '没有更多了';
							//this.$refs.ListComponentsRef.listFinished(true)
						} else {
							//this.$refs.ListComponentsRef.listFinished(false)
						}
						//如果没有数据 设置滚动到底的提示文字为暂无数据
						if (this.listData.length === 0) {
							//this.finishedText = '暂无数据';
						}
					}
					//如果是下拉刷新 重置下拉刷新状态
					if (getDataType && getDataType.clearRefresh) {
						
						//如果没有数据 设置下拉刷新成功文字 为空 避免和暂无数据两个提示重叠
						// if (this.listData.length === 0) {
						// 	this.successText = '';
						// } else {
						// 	this.successText = '刷新成功';
						// }
						uni.stopPullDownRefresh()
					}
					//如果是滚动到底请求 重置滚动到底状态
					if (getDataType && getDataType.clearListLoad) {
						//this.$refs.ListComponentsRef.listSuccess()
					}
					//如果是报错之后点击底部提示文字重新发起请求
					//重置状态
					if (this.isListError) {
						//this.$refs.ListComponentsRef.listError(false)
						//this.isListError = false
					}
				}, error => {
					//console.log(error)
					//如果是下拉刷新请求报错 也重置下拉刷新状态
					if (getDataType && getDataType.clearRefresh) {
						//this.$refs.ListComponentsRef.refreshSuccess()
					}
					if (getDataType && getDataType.clearListLoad) {
						//当请求报错的时候 会出现底部点击文字提示重新发起请求
						//虽然上一次请求结果没成功 但是page的页数也会同样加一
						//所以报错需要重复请求时page页数设置减一
						//this.isListError = true;
						//this.$refs.ListComponentsRef.listError(true)
						//this.page -= 1;
						//this.$refs.ListComponentsRef.listSuccess()
					}
				})
			},
		}
	};
</script>
<style>

</style>
<style scoped lang="scss">
	.list_component_box {
		height: 100%;
		width: 100%;

		// overflow: auto;
		.list {
			padding: 42rpx;
			border-top: 1px solid #ddd;
		}
	}
</style>
