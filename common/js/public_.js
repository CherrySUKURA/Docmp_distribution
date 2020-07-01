// let url = "https://www.hotmine.cn/api/"  
// let url = "http://114.55.171.119:8823/api/"
let url = "http://192.168.2.101:8787/api/"
let token
let uuid

function request(DK,methods,data) {
	return new Promise((resolve,reject) => {
		uni.request({
			url: url+DK,
			method: methods,
			dataType: 'json',
			data : data,
			header: {
				'Content-Type': 'application/json;charset=utf-8',
				"Authorization": token,
				"uuid": uuid
			},
			success(res) {
				resolve(res)
			},
			fail(err) {
				reject(err)
			}
		})
	})
}

function loginReuqest(DK,methods,data){
	return new Promise((resolve,reject) => {
		uni.request({
			url: url+DK,
			method: methods,
			dataType: 'json',
			data : data,
			header: {
				'Content-Type': 'application/json;charset=utf-8'
			},
			success(res) {
				resolve(res)
			},
			fail(err) {
				reject(err)
			}
		})
	})
}

function download(DK) {
	return new Promise((resolve,reject) => {
		uni.downloadFile({
			url: DK,
			header: {
				'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
			},
			success(res) {
				resolve(res)
			},
			fail(err) {
				reject(err)
			}
		})
	})
}

function callback(res) {
	uni.removeStorage({
		key: "storage_key",
		success() {
			// uni.navigateTo({
			// 	url: "/pages/me/me"
			// })
		}
	})

}

export default{
	storagedata(e){
		token = e.access_token;
		uuid = e.uuid
	},
	RequestHttp(url,method,data,succeed,defeated,losed=null){//封装回调
		uni.showLoading({
			title: "加载中",
			mask: true,
			success: (res)=> {
				request(url,method,data).then(
					(res) => {
						if(res.data.code == "401"){
							if(losed!=null){
								losed(res)
							}
							this.showToast("登录已失效,请前往登录","none",2000,callback)
						}else{
							succeed(res)
							setTimeout(function () {
							    uni.hideLoading();
							}, 3000)
						}
					}).catch(
					(err) => {
						defeated(err)
					})
				
			},
			fail: (res) => {
				this.showToast("加载失败","none",2000,null)
			}
		})
		
	},
	loginRequestHttp(url,method,data,succeed,defeated){
		// debugger
		loginReuqest(url,method,data).then(
		(res) => {
			succeed(res)
		}).catch(
		(err) => {
			defeated(err)
		})
	},
	RequestDownload(url,succeed,defeated){
		download(url).then(
		(res) => {
			succeed(res)
		}).catch(
		(err) => {
			defeated(err)
		})
	},
	formatNumber(num){
		num = parseFloat(num).toFixed(2).toString().split(".");
		num[0] = num[0].replace(new RegExp('(\\d)(?=(\\d{3})+$)', 'ig'), "$1,");
		return num.join(".");
	},
	showToast(title,icon,duration,success){
		uni.showToast({
			title,
			icon,
			duration,
			success:(e) => {
				if(success != null){
					success(e)
				}
			}
		})
	}
}