// pages/menu/followerMultiple/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        searchVal: '', // 关键词
        val: [], //多选框选中值
        ferList: [], //原数组
        follower: [],
        tm: [],
        tmn: [],
        cm: [],
        cmn: [],
        fers: [],
        list: [{
            userid:1,
            name:'ces'
        }], //过滤数组
        type: ''
    },
    // 确定选择抄送
    handleComfirm() {
        let pages = getCurrentPages(),
            thispage = pages[pages.length - 1], //子页面
            parpage = pages[pages.length - 2] //父页面
        if (this.data.type == 'selectCC') {
            parpage.setData({
                cm: this.data.cm,
                cmn: this.data.cmn.join('、')
            })
        } else if (this.data.type == 'selectTm') {
            parpage.setData({
                tm: this.data.tm,
                tmn: this.data.tmn.join('、'),
                ma: '',
                maid: 0
            })
            if (this.data.tm.length == 1) {
                parpage.setData({
                    ma: this.data.tm[0].tmn,
                    maid: this.data.tm[0].tmid,
                })
            }
            app.globalData.tm = this.data.follower
        } else {
            let str = 'detailList.fers'
            parpage.setData({
                [str]: this.data.follower
            })
        }
        wx.navigateBack();
    },
    // 取消选择抄送
    handleCancle() {
        wx.navigateBack();
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