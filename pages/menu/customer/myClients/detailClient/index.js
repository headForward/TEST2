// pages/menu/customer/myClients/detailClient/index.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        detailList: {
            gid: "1",
            na: "1",
            industry: "1",
            address: "1",
            cty: "hug",
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
        isEdited: false,
        child: false,
        netStatus: ''
    },

    goEditClient() {
        wx.navigateTo({
            url: `../editClient/index?type=edit`,
            // 编码，传参中若包含&特殊符号，会影响传参
            // url: `../editClient/index?detailList=${escape(JSON.stringify(this.data.detailList))}&contactList=${escape(JSON.stringify(this.data.contactList))}`,
        })
    },
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
                            if (res.confirm) {
                                wx.navigateBack()
                            }
                        }
                    })
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