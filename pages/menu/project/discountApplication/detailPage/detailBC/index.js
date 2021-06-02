// pages/menu/project/discountApplication/detailPage/detailBC/index.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tagactive: 0,
        logs: [],
        active: 0,
        urls: ['https://img.yzcdn.cn/vant/cat.jpeg', 'https://img.yzcdn.cn/vant/cat.jpeg'],
        activeName: 0,
        costName:'sdac',
        main: [{
            requestname:'ces',
            ApplyDate:'2021-05-03',
            Num:'01',
            requestlevel:'中',
            isFirsttime:'1',
            Firsttime:'2',
            Maturity:'无',
            Dep:'ces',
            UserName:'cess',
            UserTel:'无',
            UserManager:'cccc',
            ShenPi:'to',
            Dealer:'cccccc',
            DealerNature:"sdsd",
            ConType:'desda',
            Project:'daweqc',
            ComName:'dsdwacd',
            Reason:'dwqff',
            ExpectedProjectQuantity:'2222',
            SpecialUsage:'212',
            ProjectQuantity:'2323',
            SlaeQuantity:'323',
            ContinueProjectQuantity:'233',
            ContinueSlaeQuantity:'333',
        }],
        detail:[{
            a:[{
                ProductName:'aaef',
                ProductSpec:'dqdeq',
                NowPrice:'ewfac',
                ConPrice:'22',
                ApplyPrice:'232',
                AuditPrice:'323',
                SupplyCycle:'caca'
            }]
        }]
    },

    onChange(e) {
        this.setData({
            activeName: e.detail
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