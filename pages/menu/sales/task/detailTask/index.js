// pages/menu/sales/task/detailTask/index.js
let app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        detailList: {
            dt: 'ces',
            ma: 'ces',
            tmns: 'ce,ces',
            etfmt: '2021-01-01',
            cmns: 'cc',
            sta: '',
            pr: '进行中',
            sut: [{
                stn: 'ces1',
                sts: '1',
                sgid: 1,

            }]
        },
        isReload: false,
        isRequest: false,
        child: false,
        netStatus: ''
    },

    // 跳转添加子任务页面
    addSubTask() {
        wx.navigateTo({
            url: `../addSubtask/index?gid=${this.data.detailList.gid}`
        });
    },
    // 任务转为已完成
    handleFinish() {
        let sut = this.data.detailList.sut;
        let len = this.data.detailList.sc;
        let sub = true;
        let str = '已完成该子任务？'
        if (len) {
            for (var i = 0; i < len; i++) {
                if (sut[i].sts == 0) {
                    sub = false;
                    break;
                }
            }
            str = sub ? '子任务已全部完成，确认完成该任务?' : '该任务下尚有子任务未完成，确认完成该任务？'
        }
        wx.showModal({
            title: '提示',
            content: str,
            success: (res) => {
                if (res.confirm) {
                    wx.showModal({
                        title: '提示',
                        content: '操作成功',
                        showCancel: false,
                        success: (val) => {
                            if (val.confirm) {
                                wx.navigateBack({
                                    delta: 1
                                });
                            }
                        }
                    })
                    if (this.data.detailList.sc) {
                        for (var i = 0; i < this.data.detailList.sc; i++) {
                            this.setData({
                                [`detailList.sut[${i}].sts`]: 1
                            })
                        }
                    }
                }
            }
        })
    },
    //跳转编辑页
    goEditTask() {
        wx.navigateTo({
            url: `../editTask/index?isEdit=true`
        });
    },
    // 任务删除
    handleDelete() {
        wx.showModal({
            title: '提示',
            content: '确认删除当前任务？',
            success: (res) => {
                if (res.confirm) {
                    wx.showModal({
                        title: '提示',
                        content: '操作成功',
                        showCancel: false,
                        success: (res) => {
                            if (res.confirm) {
                                wx.navigateBack({
                                    delta: 1
                                });
                            }
                        }
                    })
                }
            }
        })
    },
    // 跳转子任务详情页
    goSubtaskDetail(e) {
        // if (this.data.type != 'cm' && e.currentTarget.dataset.sts != 1) {
            app.globalData.subTask = this.data.detailList.sut[e.target.dataset.idx]
            wx.navigateTo({
                url: `../detailSubtask/index`
            });
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