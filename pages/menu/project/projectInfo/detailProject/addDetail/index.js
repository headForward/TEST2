// pages/menu/project/projectInfo/detailProject/addDetail/index.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        content: "",
        fileList: [],
        lc: "位置",
        lgc: Number,
        ltt: Number,
        gid: "",
        errcontent: ""

    },

        //跟进记录位置
        location() {
            wx.getSetting({
                success: (res) => {
                    if (res.authSetting['scope.userLocation'] != true) {
                        wx.authorize({
                            scope: 'scope.userLocation',
                            success: () => {
                                wx.chooseLocation({
                                    success: (res) => {
                                        this.setData({
                                            lc: res.name,
                                            lgc: res.latitude,
                                            ltt: res.longitude
                                        })
                                    }
                                })
                            },
                            fail: () => {
                                this.fetchAgainLocation()
                            }
                        })
                    } else {
                        wx.chooseLocation({
                            success: (res) => {
                                this.setData({
                                    lc: res.name,
                                    lgc: res.latitude,
                                    ltt: res.longitude
                                })
                            }
                        })
                    }
                }
            })
        },
        //取消
        cancel() {
            wx.navigateBack({
                delta: 1,
            })
        },
            //添加跟进记录
    saveRecord() {
        let recordId = global.utils.uuid();
        if (this.data.content != "") {
            wx.showModal({
                title: '提示',
                content: '添加成功',
                showCancel: false,
                success: (res) => {
                    if (res.confirm) {
                        wx.navigateBack({
                            delta: 1
                        });
                    }
                }
            })
        } else {
            this.setData({
                errcontent: "请填写跟进详情"
            })
        }

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

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