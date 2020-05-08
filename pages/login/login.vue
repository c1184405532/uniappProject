<template>
	<view class="login_box">
		<view class="input-group">
			<view class="input-row border">
				<text class="title">账号：</text>
				<m-input class="m-input" type="text" clearable focus v-model="account" placeholder="请输入账号"></m-input>
			</view>
			<view class="input-row">
				<text class="title">密码：</text>
				<m-input class="m-input" type="password" displayable v-model="password" placeholder="请输入密码"></m-input>
			</view>
		</view>
		<view class="btn-row">
			<button type="primary" class="primary" @tap="login">登录</button>
		</view>
		
		
	</view>
</template>

<script>
	
	import mInput from '../../components/m-input.vue'
	import Request from '@/static/request/Request.js'
	export default {
		components: {
			mInput
		},
		data() {
			return {
				account:'admin',
				password:'123456',
			}
		},
		
		methods: {
			login(){
				Request.post('api/login',{
					data:{
						userName:this.account,
						passWord:this.password,
					},
					requestToastConfig:{
						message:'正在登陆...'
					},
				}).then((res)=>{
					
					if(res.success){
						this.global.setToken(res.data.token)
						uni.switchTab({
							url:'/pages/homePage/Home'
						})
					}
					
				},error=>{
					console.log(error)
				})
				//console.log(Request)
			},
			
		},
		
	}
</script>

<style>
	.login_box{
		padding: 24rpx;
	}
	.input-row{
		margin-top: 40rpx;
	}
	.btn-row{
		margin-top: 60rpx;
	}
	.m-input{
		padding: 16rpx;
		width: 400rpx;
		border: 1rpx solid #ddd;
		border-radius: 10rpx;
	}
</style>
