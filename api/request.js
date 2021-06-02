import fly from './fly'
import env from './env'
import constant from '../public/constant'
const req = ({ baseUrl, method, url, data, timeout }) => {
    let options = {
        baseURL: env[baseUrl],
        method: method,
        headers: {},
        // params: data
    }
    if (timeout) {
        options.timeout = timeout
    }
    if (constant.temptoken) {
        options.headers.temptoken = constant.temptoken
    }
    return fly.request(url, data, options)
}

export default req