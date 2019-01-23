/*
* @Author: iMocco
* @Date:   2019-01-17 19:02:50
* @Last Modified by:   iMocco
* @Last Modified time: 2019-01-17 19:38:16
*/
// 封装axis请求，外面直接传值调用就可以了
import axios from 'axios';
axios.defaults.baseURL = 'https://vgrvflqm.api.lncld.net/1.1';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['X-LC-Id'] = 'VgrVFlqmXRWWMXrULu2O189j-gzGzoHsz';
axios.defaults.headers.common['X-LC-Key'] = '2morl5mF5v3y3h5cbb6di6XV';

// 返回封装的函数
export default {
	http(data) {
		let options = {
			method: data.type,
			url: data.url
		};
		options[data.type.toUpperCase() == 'POST' ? 'data' : 'params'] = data.data;
		return axios(options)
			.then((result) => {
				return result;
			})
			.catch((error) => {
				return error;
			});
	}
};
