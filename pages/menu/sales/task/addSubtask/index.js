// pages/menu/sales/task/addSubtask/index.js
import WxValidate from '../../../../../utils/WxValidate.js'
var app = getApp();
let currentYear = new Date().getFullYear();
let curDate = new Date();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isCalendarShow: false,
        minDate: new Date(currentYear - 1, 0, 1).getTime(),
        maxDate: new Date(currentYear + 1, 11, 31).getTime(),
        currDate: curDate.getTime(),
        isEdit: false, //编辑标记
    },

        // 跳转选择负责人页面
        goSelectMa() {
            wx.navigateTo({
                url: `/pages/menu/followerSingle/index?type=selectManager&val=${this.data.maid}`
            });
        },
            // 截止日期面板弹出控制
    selectShow() {
        this.setData({
            isCalendarShow: !this.data.isCalendarShow
        })
    },
        // 取消添加子任务
        handleCancle() {
            wx.navigateBack({
                delta: 1
            });
        },
        //保存添加子任务
        handleSave(){
            wx.navigateBack({
                delta: 1
            });
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