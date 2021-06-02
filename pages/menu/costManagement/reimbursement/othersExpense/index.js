// pages/menu/costManagement/reimbursement/othersExpense/index.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        steps: [],
        activeName: [],
        checked: true,
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
            userName:'fees',
            feeTypeText:'cess',
            payTypeName:'ddcwe',
            bankName:'as',
            bankCode:'fes',
            projectName:'ayy',
            projectNo:'00323',
            companyName:'ces',
            invoice:'ces'
        }
    },

    goInvoiceDetail() {
        if (this.data.detail.invoice) {
            wx.navigateTo({
                url: `../invoiceInfo/index`
            });
        }
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