let url = "https://www.hotmine.cn/api/"  
// let url = "http://114.55.171.119:8823/api/"
// let url = "http://192.168.2.101:8787/api/"
let token

function request(DK,methods,data) {
	return new Promise((resolve,reject) => {
		uni.request({
			url: url+DK,
			method: methods,
			dataType: 'json',
			data : data,
			header: {
				'Content-Type': 'application/json;charset=utf-8',
				"Authorization": token
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
		key: "storage_key"
	})

}

export default{
	token1(e){
		token = e;
	},
	RequestHttp(url,method,data,succeed,defeated){//封装回调
		request(url,method,data).then(
			(res) => {
				if(res.data.code == "401"){
					this.showToast("登录已失效,请前往登录","none",2000,callback)
				}else{
					succeed(res)
				}
			}).catch(
			(err) => {
				defeated(err)
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