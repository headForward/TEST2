import req from './request'

export default {
    test: (param)=> req({
        baseUrl:"test",
        method:"post",
        url:"/auth/getSalt",
        data: param
    })
}