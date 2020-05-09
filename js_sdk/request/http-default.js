
import Request from '@/js_sdk/luch-request/index.js' 
import global from "@/js_sdk/globalUtils.js"
const baseClearToastTime = 1600;
//const baseURL = 'http://192.168.0.101:9999';
const baseURL = 'http://192.168.8.38:9999';

// const instance = Request.create({
//     //baseURL:'https://api.github.com/users',//basePort + baseURL,
//     baseURL:baseURL,
//     timeout:2000,
// })
const instance = new Request()
instance.setConfig((config)=>{/* config 为默认全局配置*/
	config.baseUrl = getApp().globalData.baseUrl; /* 根域名 */
	return config
})
instance.interceptor.request(function (config,cancel) { /* cancel 为函数，如果调用会取消本次请求。需要注意：调用cancel,本次请求的catch仍会执行。必须return config */
    // 在发送请求之前做些什么
    const token = global.getToken() 
	//console.log(token)
    //const token = 888
    if(token){
        config.header['X-Access-Token'] = token;
    }
    //console.log('在发送请求之前做些什么',config)
    if(instance.toastConfig.beforeRequestToastType){
		uni.showLoading({
			title:config.toastmessage || instance.toastConfig.message,
			mask:true,
		})
        
    }
	
    //console.log(config)
    return config;
}, function (error) {
    //对请求错误做些什么
    //console.log(error)
    return Promise.reject(error);
});
// 添加响应拦截器
instance.interceptor.response(function (response) {
    //对响应数据做点什么

    //清除响应前的toast
    uni.hideLoading()
    if(instance.toastConfig.successRequestToastType && response.data.status === 200){
		uni.showToast({
			title:instance.toastConfig.successMessage || response.data.message,
			mask:false,
			icon:'none',
			duration:baseClearToastTime
		})
        
    }
    if(instance.toastConfig.errorRequestToastType && response.data.status !== 200){
		uni.showToast({
			title:instance.toastConfig.successMessage || response.data.message,
			mask:false,
			icon:'none',
			duration:baseClearToastTime
		})
		
        
    }
    //console.log('response',response)
    //console.log('instance',instance.toastConfig)
    
    return response.data;
}, function (error) {
    // 对响应错误做点什么
	
    uni.hideLoading()
    //console.log('响应错误',error)
    const config = error.config;
    //console.log(config)
    //是否配置请求错误重连 目前uiapp中无法支持请求重连
    if(config && config.custom.shouldRetry && config.custom.retry){
        if(config.custom.retry === 1 && config.custom.lastRetryUrl){
            config.baseUrl = config.custom.lastRetryUrl
        }
        config.custom.retry -= 1;
        config.toastmessage = config.custom.message
		//return instance.request(config)
        const backoff = new Promise(function(resolve){
            setTimeout(()=>{
                resolve()
            },config.custom.retryDelay || 16)
        })
		
		
        return backoff.then(()=>{
            return instance.request(config)
        })
        
    }else{
        if(error.response){
			uni.showLoading({
				title:error.response.data.message,
				mask:true,
			})
			setTimeout(()=>{
			    uni.hideLoading()
			},2500)
            let status = error.response.status;
            setTimeout(()=>{
                switch(status){
                    case 500:
                        
                        
                    break;
                }
            },1000)
            
        }else{
			uni.showLoading({
				title:error.message,
				mask:true,
			})
			
			setTimeout(()=>{
			    uni.hideLoading()
			},2500)
            
        }
        return error
    }
});
export default instance;