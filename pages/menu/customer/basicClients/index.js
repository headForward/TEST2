// pages/menu/customer/basicClients/index.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        type: '正式客户',
        searchVal: '',
        clientList: [{
            a:[{
                id:1,
                cn:'1',
            }]
        }],// 过滤列表
        list: [], // 接口获取的列表
        val: '',
        client: {}, // 返回的客户对象
        isVisit: false, //客户拜访选择对象
        page: 0,
        pageSize: 20,
        loadMore: false,
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