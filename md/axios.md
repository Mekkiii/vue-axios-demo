### 安装
    npm i axios

### 引入axios
    import axios from "axios"

### axios函数 发送请求
    axios({
       url: '/user',
       method: 'get',
       baseURL: 'https://some-domain.com/api/',
       data:{}
    })

    axios('/user',{
       method: 'get',
       baseURL: 'https://some-domain.com/api/',
       data:{}
    })


    axios.get('/user',{
       baseURL: 'https://some-domain.com/api/'
    })
    axios.post('/user',data,{
       baseURL: 'https://some-domain.com/api/'
    })

### axios实例 发送请求  (一个模块 一个请求对象)
    var axiosObj = axios.create(config)
    axiosObj(config)
    axiosObj(url,config)
    axiosObj.get(url,config)

### 拦截器
    // 添加请求拦截器
    axios.interceptors.request.use(function (config) {
        // 在发送请求之前做些什么
        return config;
      }, function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
      });

    // 添加响应拦截器
    axios.interceptors.response.use(function (response) {
        // 对响应数据做点什么
        return response;
      }, function (error) {
        // 对响应错误做点什么
        return Promise.reject(error);
      });
