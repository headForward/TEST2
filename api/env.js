import constant from '../public/constant'
const env = {
    dev: {
        baseUrl: "http://dev.auth.authority-web-v2.172.16.90.27.xip.io/",
        test:"http://127.0.0.1:4523/mock/373879",
    },
    qas: {
        baseUrl: "http://dev.auth.authority-web-v2.172.16.90.28.xip.io/"
    },
    app: {
        baseUrl: ""
    }
}
export default env[constant.env];