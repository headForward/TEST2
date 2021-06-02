import utils from "./utils/index";
import api from "./api/index";
global.utils = utils;
global.api = api;
App({
    onLaunch(options) {
        wx.showLoading({
            title: '程序准备中',
            mask: true
        })
        wx.login({
            timeout: 5000,
            success: (res) => {
                wx.switchTab({
                    url: '/pages/menu/index',
                    success: function (res) {
                        wx.showToast({
                            title: "登陆成功",
                            icon: 'success',
                            duration: 2000
                        })
                    }
                })
            }
        });
    },

    // 全局变量
    globalData: {
        // openId
        openId: null,
    }
})