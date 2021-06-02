// pages/menu/project/projectInfo/detailProject/projectDetail/index.js
let app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        followList: {
            ct:'2021-04-25',
            fer:'ces',
            cont:'无',
            lc:'123'
        },
        projectName: "1",
        pic: [],
        url: ['/images/wodekehu.png']
    },

    locationMap() {
        wx.getLocation({
            type: 'gcj02', //返回可以用于wx.openLocation的经纬度
            success (res) {
              const latitude = res.latitude
              const longitude = res.longitude
              wx.openLocation({
                latitude,
                longitude,
                scale: 18
              })
            }
           })
        // if (this.data.followList.lc !== "") {
            // wx.openLocation({
            //     latitude: this.data.followList.lgc,
            //     longitude: this.data.followList.ltt,
            //     success: () => {},
            //     fail: (res) => {
            //         console.log(res);

            //     }
            // })
        // }
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