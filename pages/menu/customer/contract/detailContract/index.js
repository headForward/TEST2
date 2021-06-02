// pages/menu/customer/contract/detailContract/index.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        detailList: {
            ct: '1',
            cno: '1',
            amountfmt: '1',
            currency: '1',
            cn: '1',
            btfmt: '1',
            etfmt: '1',
            completion: '1',
            completed: '1',
            ls: '',
            rs: '',
            rm: '1'
        },
        isReload: false,
        dialogShow: false,
        title: '作废合同',
        rs: '',
        urls: [],
        isEdited: false,
        isRequest: false,
        child: false,
        netStatus: ''
    },
    // 合同状态为作废时，删除合同
    handleDelete() {
        wx.showModal({
            title: '提示',
            content: '确认删除此合同？',
            success: (res) => {
                if (res.confirm) {
                    this.setData({
                        dialogShow: true
                    })
                }
            }
        })
    },
    // 跳转编辑页
    goEditContract() {
        wx.navigateTo({
            url: `../editContract/index?type=edit`
            // url: `../editContract/index?detailList=${JSON.stringify(this.data.detailList)}`
        });
    },
    // 作废合同
    handleCancle() {
        wx.showModal({
            title: '提示',
            content: '确认作废此合同？',
            success: (res) => {
                if (res.confirm) {
                    this.setData({
                        dialogShow: true
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