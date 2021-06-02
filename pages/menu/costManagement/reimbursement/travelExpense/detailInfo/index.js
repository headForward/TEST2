// pages/menu/costManagement/reimbursement/detailInfo/index.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        currency:'12',
        detail:{
            feeDate:'2021-04-02',
            businessTravelAddress:'ffff',
            businessTravelDetails:'无',
            totalAmount:'33',
            nodesList:[{
                feeTypeText:'eew',
                appliedAmount:'ed',
                relPayInvoiceList:[]
            }]
        }
    },
    goInvoiceDetail(e) {
        console.log(e);
        if (this.data.detail.nodesList[e.currentTarget.dataset.id].relPayInvoiceList) {
            app.globalData.invoice = this.data.detail.nodesList[e.currentTarget.dataset.id]
            wx.navigateTo({
                url: '../../invoiceInfo/index?type=detail'
            });
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