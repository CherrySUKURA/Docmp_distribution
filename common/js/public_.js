let url = "http://192.168.2.101:7002/"

function request(DK,methods,data) {
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
			url: url+DK,
			success(res) {
				resolve(res)
			},
			fail(err) {
				reject(err)
			}
		})
	})
}

export default{
	RequestHttp(url,method,data,succeed,defeated){//封装回调
		request(url,method,data).then(
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
	}
}
