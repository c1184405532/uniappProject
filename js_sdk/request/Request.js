import request from './http-default.js';
/*
Axios下的函数接受多个参数
参数1 请求地址 String
参数2 请求数据 Object
{
	data: 给后台传递的参数 ,
	requestToastConfig: Object,
	custom:Object 自定义参数携带在请求config字段里 会和自定义默认重连字段进行合并
}
requestToastConfig toast请求配置 Object
  {
    beforeRequestToastType:true,//是否显示请求前toast加载框 默认显示  Boolean
    successRequestToastType:false,//是否显示请求后请求成功 状态status === 200 toast加载框 默认不显示 Boolean
    errorRequestToastType:true,//是否显示请求后请求成功 状态 status !== 200 toast加载框提示加载错误失败原因 取message字段 默认显示 Boolean
	afterErrorRequestToastType:true,//是否显示请求失败  toast加载框 默认显示 Boolean
	message:String//请求前toast提示文字
	successMessage:String //请求成功后toast提示文字
  }  
*/
const Request = {}

Request.get = (url,data)=>{
	//console.log('url',url)
	initAxiosConfig(data.requestToastConfig)
    return request.get(url,{
		params:data.data,
		header:data.header ? data.header : {},
		dataType:data.dataType ? data.dataType : "json",
		custom:{
			...initDefaults(data.custom)
		},
		// #ifndef MP-ALIPAY || APP-PLUS
		responseType: 'text',
		// #endif
    })
   
}
Request.post = (url,data)=>{
    initAxiosConfig(data.requestToastConfig)
    //console.log('axios',axios)
    return request.post(url,
		data.data,
		{
			params:data.params,
			custom:{
				...initDefaults(data.custom)
			},
		}
		
	)
   
}
Request.put = (url,data)=>{
	initAxiosConfig(data.requestToastConfig)
	//console.log('axios',axios)
	return request.put(url,
		data.data,
		{
			params:data.params,
			custom:{
				...initDefaults(data.custom)
			},
		}
		
	)
}
Request.delete = (url,data)=>{
	initAxiosConfig(data.requestToastConfig)
	//console.log('axios',axios)
	return request.delete(url,
		data.data,
		{
			params:data.params,
			custom:{
				...initDefaults(data.custom)
			},
		}
		
	)
}
function initAxiosConfig(requestToastConfig){
	//console.log('initAxiosConfig',requestToastConfig)
	let toastConfig = {
		afterErrorRequestToastType:true,
		beforeRequestToastType:true,
		errorRequestToastType:true,
		successRequestToastType:false,
		message:"加载中...",
		successMessage:'',
	}
	Object.assign(toastConfig,requestToastConfig || {})
	request.toastConfig = toastConfig;
	//console.log('toastConfig',toastConfig)
}
//初始化自定义配置
function initDefaults(custom){
	let defaultOpations = {
		//报错重发请求次数
		retry:2,
		//重试间隔多久去发送请求
		retryDelay:2000,
		//重试的条件判断
		shouldRetry: false,
		//请求重试最后一次url 在有多个备用链接时可配置
		//lastRetryUrl:'http://192.168.0.103:8888',
		//发起重连默认提示信息
		message:'请求失败，重连中...',
	}
	Object.assign(defaultOpations,custom || {})
	return defaultOpations
}
export default Request;