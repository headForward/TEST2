// pages/menu/sales/salesPlan/detailPlan/index.js
import utils from "../../../../../utils/index";
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        detailList: {
            year:'2021',
            area:'广东',
            planType:'年度计划',
            cycle:'1',
            plantotalfmt:'10',
            finishtotalfmt:'10',
            rate:'100%',
            ower:'ces',
            detail:[{
                name:'ces',
                planfmt:'10',
                finfmt:'10'
            }]
        },
        isReload: false,
        addPermission: true, //销售计划修改删除权限
        same: false,
        isRequest: false,
        child: false,
        netStatus: ''
    },
        /**
     * 跳转编辑页面
     */
    goEditPlan() {
        wx.navigateTo({
            url: `../editPlan/index?type=edit`
        });
    },
        /**
     * 删除数据
     */
    handleDelete() {
        let pages = getCurrentPages(),
            thispage = pages[pages.length - 1], //子页面
            parpage = pages[pages.length - 2] //父页面
        wx.showModal({
            title: '提示',
            content: '确认删除此销售计划？',
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