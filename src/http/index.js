import axios from "axios";
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  config.headers.Authorization = "damu"
  // 在发送请求之前做些什么
  return config;
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response.data;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default axios
