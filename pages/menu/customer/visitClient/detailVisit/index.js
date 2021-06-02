// pages/menu/customer/visitClient/detailVisit/index.js
import utils from "../../../../../utils/index";

let app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        visitDetail: {
            name: "1",
            customerType: 1,
            createdfmt: "1",
            follower: "1",
            location: "1",
            locationMap: "1",
            content: "1",
            lev: "1",
            src: "1",
            productType: "1",
            createTime: "1",
            fers: [],
            followers: "1",
        },
        urls: ['https://img.yzcdn.cn/vant/cat.jpeg', 'https://img.yzcdn.cn/vant/cat.jpeg'],
        netStatus: ''
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