// pages/menu/sales/task/editTask/index.js
import WxValidate from '../../../../../utils/WxValidate.js'

var app = getApp();
let currentYear = new Date().getFullYear();
let curDate = new Date();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        tm: [],
        cm: [],
        isCalendarShow: false,
        minDate: new Date(currentYear - 1, 0, 1).getTime(),
        maxDate: new Date(currentYear + 1, 11, 31).getTime(),
        currDate: curDate.getTime(),
        isShow: false,
        columns: ['普通', '重要', '紧急'],
        isEdit: false, //编辑标记
        rules: {
            tn: {
                required: true
            },
            cont: {
                required: true
            },
            tmn: {
                required: true
            },
            etfmt: {
                required: true
            },
            pr: {
                required: true
            },
        }
    },

    // 跳转任务成员页
    goSelectMe() {
        wx.navigateTo({
            url: `/pages/menu/followerMultiple/index?tm=${JSON.stringify(this.data.tm)}&type=selectTm`
        });
    },
    // 截止日期面板弹出控制
    calendarShow() {
        this.setData({
            isCalendarShow: !this.data.isCalendarShow
        })
    },
    // 截止日期选择
    onetConfirm(e) {
        this.setData({
            et: parseInt(new Date(e.detail).getTime() / 1000),
            etfmt: global.utils.dateFormat("yyyy-MM-dd", e.detail),
            isCalendarShow: false,
        })
    },
    // 优先级选择面板弹出控制
    selectShow() {
        this.setData({
            isShow: !this.data.isShow
        })
    },
    // 跳转抄送页
    goSelectCC() {
        wx.navigateTo({
            url: `/pages/menu/followerMultiple/index?type=selectCC&cm=${JSON.stringify(this.data.cm)}`
        });
    },
    // 取消
    handleCancle() {
        wx.navigateBack({
            delta: 1
        });
    },
    // 新增修改
    handleSave() {
        // 校验表单
        let flagArr = [];
        let val = {
            tn: this.data.tn,
            cont: this.data.cont,
            tmn: this.data.tmn,
            ma: this.data.ma,
            etfmt: this.data.etfmt,
            pr: this.data.pr
        }
        this.setData({
            errtn: '',
            errcont: '',
            errtmn: '',
            errma: '',
            erretfmt: '',
            errpr: ''
        });
        const errMsg = (val) => {
            let flag = true;
            if (!this.WxValidate.checkForm(val)) {
                const error = this.WxValidate.errorList;
                if (error.length) {
                    flag = false;
                }
                error.forEach(item => {
                    let str = `err${item.param}`;
                    this.setData({
                        [str]: item.msg
                    })
                })
            }
            return flag
        }
        flagArr.push(errMsg(val))
        let flag = flagArr.every(val => {
            return val;
        });
        if (flag) {
            if (this.data.isEdit) {
                let param = {
                    gid: this.data.gid,
                    co: app.globalData.crmUserInfo.code,
                    sid: app.globalData.crmUserInfo.userId,
                    tn: this.data.tn,
                    cont: this.data.cont,
                    tm: this.data.tm,
                    cm: this.data.cm,
                    maid: this.data.maid,
                    ma: this.data.ma,
                    et: this.data.et,
                    pr: this.data.pr
                }
                global.api.editTask(param).then((result) => {
                    const {
                        res
                    } = result;
                    if (res == 0) {
                        let data = {
                            isChanged: false,
                            isLChanged: true, //在'我发布的'中修改任务，需要对'我的任务'列表页全部更新
                            isEdited: true,
                            child: true
                        }
                        bus.emit('postMessage', data)
                        wx.showModal({
                            title: '提示',
                            content: '编辑成功',
                            showCancel: false,
                            success: (res) => {
                                if (res.confirm) {
                                    wx.navigateBack({
                                        delta: 1
                                    });
                                    bus.emit('mainListMessage', data)
                                    setTimeout(() => {
                                        bus.emit('listMessage', data)
                                    }, 1000)
                                }
                            }
                        })
                    } else {
                        wx.showModal({
                            title: '提示',
                            content: '编辑失败，请重新尝试',
                            showCancel: false
                        })
                    }
                }).catch(err => {
                    wx.showModal({
                        title: '连接服务器失败',
                        showCancel: false,
                        success: (res) => {
                            if (res.confirm) {}
                        }
                    })
                })
            } else {
                let param = {
                    sid: app.globalData.crmUserInfo.userId,
                    sn: app.globalData.crmUserInfo.name,
                    co: app.globalData.crmUserInfo.code,
                    tn: this.data.tn,
                    cont: this.data.cont,
                    tm: this.data.tm,
                    cm: this.data.cm,
                    maid: this.data.maid,
                    ma: this.data.ma,
                    et: this.data.et,
                    pr: this.data.pr
                }
                global.api.addTask(param).then((result) => {
                    const {
                        res
                    } = result;
                    if (res == 0) {
                        let data = {
                            isChanged: true,
                            isEdited: false,
                            child: true
                        }
                        bus.emit('postMessage', data)
                        wx.showModal({
                            title: '提示',
                            content: '添加成功',
                            showCancel: false,
                            success: (res) => {
                                if (res.confirm) {
                                    wx.navigateBack({
                                        delta: 1
                                    });
                                    bus.emit('mainListMessage', data)
                                    setTimeout(() => {
                                        bus.emit('listMessage', data)
                                    }, 1000)
                                }
                            }
                        })
                    } else {
                        wx.showModal({
                            title: '提示',
                            content: '添加失败，请重新尝试',
                            showCancel: false
                        })
                    }
                }).catch(err => {
                    wx.showModal({
                        title: '连接服务器失败',
                        showCancel: false,
                        success: (res) => {
                            if (res.confirm) {}
                        }
                    })
                })
            }
        }
    },
    /**
     * 验证规则函数
     */
    initValidate() {
        const messages = {
            tn: {
                required: '请填写任务标题'
            },
            cont: {
                required: '请填写任务内容'
            },
            tmn: {
                required: '请选择任务成员'
            },
            ma: {
                required: '请选择负责人'
            },
            etfmt: {
                required: '请选择截止日期'
            },
            pr: {
                required: '请选择优先级'
            },
        }
        this.WxValidate = new WxValidate(this.data.rules, messages)
    },
    onConfirm(e) {
        const {value} = e.detail
        this.setData({
            pr:value
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.initValidate()
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