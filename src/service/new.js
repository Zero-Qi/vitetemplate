import {api} from './serveice'

const news={
    getNewlist(){
        return api.get("www.baidu.com")
    }
}
export default news