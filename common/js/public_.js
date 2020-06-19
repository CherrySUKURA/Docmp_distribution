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
	},
	formatNumber(num){
		// console.log("进来的num",num);
		num = parseFloat(num).toFixed(2).toString().split(".");
		// console.log("第一次处理后的num",num);
		num[0] = num[0].replace(new RegExp('(\\d)(?=(\\d{3})+$)', 'ig'), "$1,");
		// console.log("第一次处理后的num",num[0]);
		return num.join(".");
	},
	showToast(title,icon,duration,success){
		uni.showToast({
			title,
			icon,
			duration,
			success:(e) => {
				if(success != 'null'){
					success(e)
				}
			}
		})
	}
}
