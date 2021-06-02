// pages/login/index.js
import api from "../../api/index";
global.api = api;
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        username: '',
        password: '',
        isUserInfo: false,
        phoneVi: null,
        phoneEncryptedData: null,
        userEncryptedData: null,
        userVi: null,
        code: null
    },
    getPhoneNumber(e) {
        if (this.data.username.length == 0 || this.data.password.length == 0) {
            wx.showModal({
                title: "提示",
                content: "账号或密码不能为空",
                showCancel: false
            })
        } else {
            if (e.detail.errMsg === "getPhoneNumber:ok") {
                this.setData({
                    phoneEncryptedData: e.detail.encryptedData,
                    phoneVi: e.detail.iv,
                    isUserInfo: true
                });
            } else {
                this.cancel()
            }
        }
    },
    btnLogin(e) {
        wx.showLoading({
            title: '登录中',
            mask: true
        })

        wx.login({
            success: (res) => {
                wx.getSetting({
                    success: (res) => {
                        wx.hideLoading()
                        if (!res.authSetting["scope.userLocation"]) {
                            wx.authorize({
                                scope: 'scope.userLocation',
                                success: () => {
                                    this.insertLog()
                                },
                                fail: () => {
                                    this.fetchAgainLocation()
                                }
                            })
                        } else {
                            this.insertLog()
                        }
                    },
                    fail: () => {
                        this.fetchAgainLocation()
                    }
                })
            },
            fail: () => {
                wx.hideLoading()
                wx.showToast({
                    title: '连接微信服务器失败',
                    icon: 'none'
                })
            }
        });

    },
    fetchAgainLocation() {
        wx.getSetting({
            success: (res) => {
                var statu = res.authSetting;
                if (!statu['scope.userLocation']) {
                    wx.showModal({
                        title: '是否授权当前位置',
                        content: '请确认授权，否则将无法使用',
                        success: (tip) => {
                            if (tip.confirm) {
                                wx.openSetting({
                                    success: (data) => {
                                        if (data.authSetting["scope.userLocation"] === true) {
                                            wx.showToast({
                                                title: '授权成功',
                                            })
                                            this.insertLog()
                                        } else {
                                            wx.showToast({
                                                title: '授权失败',
                                            })
                                        }
                                    },
                                    fail: () => {},
                                    complete: () => {}
                                });
                            }
                        }
                    })
                }
            },
            fail: () => {},
            complete: () => {}
        })
    },
    insertLog() {
        wx.getLocation({
            type: 'wgs84',
            success: (res) => {
                let param = {
                    openId: app.globalData.openId,
                    latitude: res.latitude,
                    longitude: res.longitude
                }
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
            },
            fail: (res) => {
                wx.showModal({
                    title: '请打开GPS后，重新进入小程序',
                    showCancel: false
                })
            }
        })
    },
    // 获取用户鉴权
    getUserAuth(e) {
        if (e.detail.errMsg == "getUserProfile:ok") {
            this.setData({
                userEncryptedData: e.detail.encryptedData,
                userVi: e.detail.iv
            });
            console.log(1);
            this.btnLogin();
        } else {
            console.log(2);
            this.cancel();
        }
    },
    // 取消用户授权
    cancel() {
        wx.showModal({
            title: '提示',
            content: '需授权后才能使用本程序',
            showCancel: false,
            success: (res) => {}
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {},

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})