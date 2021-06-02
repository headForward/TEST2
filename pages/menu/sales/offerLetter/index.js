// pages/menu/sales/offerLetter/index.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        fileList: [{
            a:[{
                attachmentName:'dewaff',
                uploadDate:'236815323',
                dataType:'ces',
                attachmentsize:'ces'
            }]
        }],
        page: 0,
        pageSize: 15,
        isReload: false,
        loadMore: true,
        searchVal: "",
        base: "http://appfile.lesso.com/fileserver/",
        netStatus: '',
        preventCtrl: true
    },
    /**
     * 下载文件
     */
    clickEvent(event) {
        wx.showLoading({
            title: '下载中...'
        })
        wx.downloadFile({
            url: this.data.base + `${event.currentTarget.dataset.info.download}`,
            success: (res) => {
                if (res.statusCode === 200) {
                    wx.hideLoading();
                    wx.saveFile({
                        tempFilePath: res.tempFilePath,
                        success: (res) => {
                            wx.openDocument({
                                filePath: res.savedFilePath,
                                fileType: 'pdf',
                                success: (res) => {
                                    console.log("打开文件成功");
                                }
                            })
                        }
                    })
                } else {
                    wx.showToast({
                        title: '下载失败',
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