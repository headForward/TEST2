var app = getApp();
//Page Object
Page({
    /**
     * 页面的初始数据
     */
    data: {
        basicUserInfo: {
            avatarUrl: 'https://img.yzcdn.cn/vant/cat.jpeg',
            oaUserInfo: {
                lastname: 'fewf',
                loginid: '112',
                departmentname: 'wefwef'
            }
        }
    },
    getUserInfo(e) {
        wx.navigateTo({
            url: `./userInfoPreview/index?gid=${e.target.dataset.gid}`
        })
    },
    signout() {
        wx.showModal({
            title: '提示',
            content: '确定退出登录？',
            success: (res) => {
                if (res.confirm) {
                    wx.reLaunch({
                        url: '../login/index'
                    })
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },
    //options(Object)
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(app)
        if (app.globalData.userInfo == false) {
            wx.showModal({
                title: '提示',
                content: '请先完善CRM用户角色后使用本模块',
                showCancel: false,
                success: (res) => {
                    if (res.confirm) {
                        wx.navigateBack();
                    }
                }
            })
        } else {
            this.setData({
                basicUserInfo: app.globalData.userInfo
            })
        }
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

    },
    onPageScroll: function () {

    },
    //item(index,pagePath,text)
    onTabItemTap: function (item) {

    }
});