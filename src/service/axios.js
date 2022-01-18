import axios from "axios"

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
