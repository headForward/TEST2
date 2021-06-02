var app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        isShow: {
            type: Boolean,
            value: true
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        baseImgUrl: app.globalData.baseImgUrl
    },

    /**
     * 组件的方法列表
     */
    methods: {
        //获取用户信息
        getUserInfo: function () {
            var that = this
            wx.getUserProfile({
                desc: '申请获取您的信息',
                success: (res) => {
                    that.triggerEvent('getUserAuth', res);
                    that.setData({
                        isShow: false
                    })
                }
            })

        },
        cancel() {
            this.setData({
                isShow: false
            })
            this.triggerEvent('cancel')
        }
    }
})