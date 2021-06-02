// pages/menu/project/discountVerification/detailOA/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        activeNames: [],
        oaId: '',
        list: [{
            a:[{
                matnr:'223',
                merSpec:'dwe',
                matnr:'dawdc',
                lfdat:'2021-04-02',
                ernam:'fwfv',
                fvbeln:'11',
                matnr:'33',
                vkorg:'dwec',
                vrkme:'dwcw',
                fkimg:'22',
                zprice:'23',
                zmoney:'232423'
            }]
        }],
        page: 1,
        pageSize: 15,
        isReload: false,
        loadMore: true,
        scrollY: 0
    },

    onChange(e) {
        this.setData({
            activeNames: e.detail
        })
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