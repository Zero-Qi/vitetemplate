
import axios from 'axios';
import qs from 'qs';
const pendingMap = new Map()

function getPendingKey(config){
  let { url, method,params,data} = config 
  if( typeof data === 'string')data = JSON.parse(data)
  return [url, method, JSON.stringify(params), JSON.stringify(data)].join('&')
}

function addPending(config){
  const pendingKey = getPendingKey(config)
  config.cancelToken = config.cancelToken || new axios.CancelToken((cancel)=>{
      if(  !pendingMap.has(pendingKey)){
          pendingMap.set(pendingKey, cancel)
      }
  })
}

function removePending(config){
const pendingKey = getPendingKey(config)
if(pendingMap.has(pendingKey)){
    const cancelToken = pendingMap.get(pendingKey)
    cancelToken(pendingKey)
    pendingMap.delete(pendingKey)
}
}


const instance = axios.create({
  timeout: 8000,
});
// 请求发起前拦截
instance.interceptors.request.use(
  config => {
    console.log('请求拦截', config);
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
// 响应拦截
instance.interceptors.response.use(
  response => {
    console.log('响应拦截');
    return response;
  },
  error => {
    console.log('catch', error);
    return Promise.reject(error);
  }
);
// 按请求类型对axiose进行封装

const api = {
  get(url, data) {
    return instance.get(url, { params: data });
  },
  post(url, data) {
    return instance.post(url, qs.stringify(data));
  },
};
export { api };
