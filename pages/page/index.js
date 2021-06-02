const app = getApp();
//Page Object
Page({
    /**
     * 页面的初始数据
     */
    data: {},

    //options(Object)
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        if (app.globalData.openId) {
            // 不为空
            console.log("openId不为空:", app.globalData)
        } else {
            app.userInfoCallBack = res => {
                console.log("openId为空:", res)
            }
        }
        console.log(global.utils);
        global.api.test().then(res=>{
            console.log(res)
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    },
    onPageScroll() {

    },
    //item(index,pagePath,text)
    onTabItemTap(item) {

    },
});