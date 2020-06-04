export default {
	ajax(url,methods,data) {
		return new Promise((resolve,reject) => {
			uni.request({
				url: url,
				method: methods,
				data : data,
				header: {
					'Content-Type' : 'application/x-www-form-urlencoded'
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
}
