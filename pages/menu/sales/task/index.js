// pages/menu/sales/task/index.js
let app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        pq: 1,
        cm: 1,
        rm: 1,
        taskList: [{
            a: [{
                    tn: 'ces',
                    gid: 1,
                    etfmt: '2021-05-23',
                    aer: 'ces',
                    et: 23,
                    pr: 'cess'
                },
                {
                    tn: 'ces',
                    gid: 2,
                    etfmt: '2021-05-23',
                    aer: 'ces',
                    et: 12222222110,
                    pr: 'cess'
                }
            ]
        }],
        isChanged: false,
        isEdited: false,
        curpg: 0,
        page: 0,
        pageSize: 15,
        isReload: false,
        loadMore: true,
        currDate: new Date().getTime(),
        isRequest: false,
        child: false,
        netStatus: '',
        preventCtrl: false
    },
    // 跳转详情页
    goDetailTask(e) {
        this.setData({
            curpg: e.target.dataset.idx
        })
        wx.navigateTo({
            url: `./detailTask/index?gid=${e.target.dataset.gid}`
        });
    },
    // 跳转列表页
    goList(e) {
        if (!this.data.preventCtrl) {
            wx.navigateTo({
                url: `./taskList/index?type=${e.target.dataset.label}`
            });
        }
    },
    // 跳转编辑页
    goEditTask() {
        wx.navigateTo({
            url: `./editTask/index`
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