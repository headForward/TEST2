import Fly from '../miniprogram_npm/flyio/index';
import constant from '../public/constant'
let fly = new Fly();

// 请求拦截
fly.interceptors.request.use((request) => {
    // console.log("拦截前", request)
    return request
})

// 响应拦截
fly.interceptors.response.use(
    response => {
        let headers = response.headers;
        if (headers.temptoken) {
            let temptoken = headers.temptoken[0];
            constant.temptoken = temptoken;
        }
        // console.log("拦截后", response)
        return response.data;
    },
    err => {
        console.log(err);
        // 弹窗处理
    }
)

export default fly