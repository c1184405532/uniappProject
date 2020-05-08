

const getToken = function(){
	return uni.getStorageSync('set_token_user');
}
//console.log(getToken)
const setToken = function(params){
	uni.setStorageSync('set_token_user', params);
}

const removeToken = function(){
	uni.removeStorageSync('set_token_user')
}

export default {
	getToken,
	setToken,
	removeToken
	
}