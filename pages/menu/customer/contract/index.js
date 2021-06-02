// pages/menu/customer/contract/index.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        searchVal: '',
        isSortShow: false,
        sortlist: ['最新创建', '截止日期'],
        num: 0,
        sort: 1,
        contractList: [{
            a: [{
                cn: '1',
                amountfmt: '1',
                ltfmt: '1',
                ls: '1'
            }]
        }],
        page: 0,
        pageSize: 15,
        curPage: 0,
        loadMore: true,
        isChanged: false,
        isEdited: false,
        isReload: false,
        isRequest: false, //是否在请求数据
        child: false, // 是否是编辑页面调用请求
        netStatus: '',
        preventCtrl: false
    },
    goDetailContract(e) {
        wx.navigateTo({
            url: `./detailContract/index`
        });
    },
    sortShow() {
        if (!this.data.preventCtrl) {
            this.setData({
                searchVal: '',
                isSortShow: Boolean(!this.data.isSortShow)
            })
        }
    },
    sortClick(e) {
        this.setData({
            num: e.currentTarget.dataset.index,
            sort: Number(e.currentTarget.dataset.index) + 1,
            isSortShow: false
        })
    },
    goAddContract(e) {
        wx.navigateTo({
            url: `./editContract/index`
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