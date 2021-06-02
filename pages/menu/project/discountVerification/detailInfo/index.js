// pages/menu/project/discountVerification/detailInfo/index.js
import constant from "../../../../../public/constant"

var app = getApp();
let curDate = new Date();
let currentYear = new Date().getFullYear();
let lastYear = new Date(currentYear - 1, 0, 1).getTime()
let beginDate = global.utils.dateFormat('yyyyMMdd', lastYear)
let endDate = global.utils.dateFormat('yyyyMMdd', curDate)
Page({

    /**
     * 页面的初始数据
     */
    data: {
        detail: {
            kunnr:'0001',
            clientName:'cees',
            project:'3',
            projectName:'dcscv',
            zmoney:'3333',
            sapSpecialOas:[{
                oaId:'dwcsdc',
                zmoney:'444'
            }]
        },
        activeNames: Number
    },

    goDetail(e) {
        wx.navigateTo({
            url: `/pages/menu/project/discountVerification/detailOA/index?id=${e.target.dataset.id}`
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