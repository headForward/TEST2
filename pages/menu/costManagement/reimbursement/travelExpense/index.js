// pages/menu/costManagement/reimbursement/travelExpense/index.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        urls: ['https://img.yzcdn.cn/vant/cat.jpeg', 'https://img.yzcdn.cn/vant/cat.jpeg'],
        isReload: false,
        netStatus: '',
        days:'15',
        detail:{
            payNo:'01',
            supplierName:'cees',
            payDate:'2021-04-20',
            account:'1001022',
            costCenter:'fr',
            costCenterName:'cefr',
            deptName:'开发',
            remark:'无',
            startDate:'2021.04.02',
            endDate:'2021.04.23',
            payWayName:'微信',
            currency:'222',
            costAmount:'33',
            apportion:'er',
            nodesNoteList:[{
                feeDate:'2021-04-02',
                businessTravelDetails:'无',
                totalAmount:'3333',
            }],
        }
    },

    goDetailInfo(e) {
        wx.navigateTo({
            url: `./detailInfo/index?rowId=${e.currentTarget.dataset.id}`,
        });
    },
    goDetail() {
        if (this.data.detail.apportion) {
            wx.navigateTo({
                url: '../absorbedCost/index',
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