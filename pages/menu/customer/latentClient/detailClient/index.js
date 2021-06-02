// pages/menu/customer/latentClient/detailClient/index.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        loading: false,
        detailList: {
            gid: "1",
            na: "1",
            industry: "1",
            address: "1",
            cty: "1",
            city: "1",
            provice: "1",
            lev: "1",
            src: "1",
            productType: "1",
            createTime: "1",
            fers: [],
            followers: "1",
        },
        contactList: [],
        isReload: false,
        editPermission: true, // 转化标记
        isEdited: false,
        isRequest: false,
        child: false,
        netStatus: ''
    },
    // 转化
    replaceBtn() {
        wx.showModal({
            title: '提示',
            content: '确认将此潜在客户转化为客户？',
        })
    },
    // 跳转编辑页
    goEditClient() {
        wx.navigateTo({
            url: `../editClient/index?type=edit`,
            // url: `../editClient/index?detailList=${JSON.stringify(this.data.detailList)}&contactList=${JSON.stringify(this.data.contactList)}`,
        })
    },
    // 删除
    handleDelete() {
        wx.showModal({
            title: '提示',
            content: '确认删除此客户信息？',
            success: (res) => {
                if (res.confirm) {
                    wx.showModal({
                        title: '提示',
                        content: '删除成功',
                        showCancel: false,
                        success: (res) => {
                            console.log(res)
                            if (res.confirm) {
                                wx.navigateBack()
                            }
                        }
                    })
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
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