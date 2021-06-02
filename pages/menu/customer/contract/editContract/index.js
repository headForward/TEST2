// pages/menu/customer/contract/editContract/index.js
import WxValidate from '../../../../../utils/WxValidate.js'
var app = getApp();
let currentYear = new Date().getFullYear();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        detailList: {
            pic: [],
            rm: '',
            quoteNo: ''
        },
        isEdit: false,
        isBt: true,
        calendarShow: false,
        minDate: new Date(currentYear - 1, 0, 1).getTime(),
        maxDate: new Date(currentYear + 1, 11, 31).getTime(),
        rules: {
            ct: {
                required: true
            },
            amount: {
                required: true,
                range: [0.01, 1000000000]
            },
            cn: {
                required: true
            },
            btfmt: {
                required: true
            },
            etfmt: {
                required: true,
            },
        },
        fileList: [],
        numLen: 18
    },
    // 图片上传
    fileUpload(e) {
        const {
            file
        } = e.detail;
        file.forEach(element => {
            let name = element.url.substring(element.url.lastIndexOf("/") + 1)
            wx.uploadFile({
                url: app.globalData.fileServerUrl,
                filePath: element.url,
                name: 'file',
                formData: {
                    'fileKey': 'file',
                    'fileName': name
                },
                success: (res) => {
                    const data = JSON.parse(res.data)
                    if (!data.error_code) {
                        element.path = data.path
                        const fileList = this.data.fileList;
                        fileList.push(element)
                        this.setData({
                            fileList
                        })
                    } else {
                        wx.showToast({
                            title: '图片上传失败，请重新尝试'
                        })
                    }
                },
                fail: (res) => {
                    wx.showToast({
                        title: '图片上传失败，请重新尝试'
                    })
                }
            })
        });
    },
    // 图片删除
    fileDelete(e) {
        let idx = e.detail.index;
        const fileList = this.data.fileList;
        fileList.splice(idx, 1);
        this.setData({
            fileList
        })
    },
    // 跳转选择客户界面
    selectClient() {
        // if (!this.data.isEdit) {
        wx.navigateTo({
            url: `../../basicClients/index`
        });
        // }
    },
    // 日历面板显示
    selectShow(e) {
        this.setData({
            currDate: this.data.detailList[e.target.dataset.label] ? 1000 * this.data.detailList[e.target.dataset.label] : new Date().getTime(),
            calendarShow: true,
            isBt: e.target.dataset.label == 'bt' ? true : false
        })
    },
    // 日历面板隐藏
    onCalendarCancel() {
        this.setData({
            calendarShow: false
        })
    },
    // 取消编辑
    onCancel() {
        wx.navigateBack({
            delta: 1
        });
    },
    handleSave() {
        // 1.表单校验
        if (this.data.detailList.bt && this.data.detailList.et) {
            this.setData({
                'rules.etfmt': {
                    required: true,
                    min: this.data.detailList.bt
                }
            })
        }
        let flagArr = []
        // 清空处理
        this.setData({
            errct: "",
            erramount: "",
            errcn: '',
            errbtfmt: '',
            erretfmt: ''
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
        let val = {
            ct: this.data.detailList.ct,
            amount: this.data.detailList.amount,
            cn: this.data.detailList.cn,
            btfmt: this.data.detailList.bt,
            etfmt: this.data.detailList.et,
        }
        flagArr.push(errMsg(val))
        let flag = flagArr.every(val => {
            return val;
        });
        if (flag) {
            // 处理图片
            let fileList = this.data.fileList;
            let pic = fileList.map(item => {
                return {
                    url: item.path,
                    name: item.path.substring(item.path.lastIndexOf("/") + 1)
                }
            });
            // 2.调接口
            if (this.data.isEdit) {
                let param = {
                    sid: app.globalData.crmUserInfo.userId,
                    co: app.globalData.crmUserInfo.code,
                    gid: this.data.detailList.gid,
                    ct: this.data.detailList.ct,
                    cno: this.data.detailList.cno,
                    cn: this.data.detailList.cn,
                    cid: this.data.detailList.cid,
                    bt: this.data.detailList.bt,
                    et: this.data.detailList.et,
                    rm: this.data.detailList.rm,
                    pic: pic,
                    amount: this.data.detailList.amount,
                    currency: "CNY",
                    signTime: 0,
                    sincerity: 0,
                    shopGuidList: [],
                    oldShopList: [],
                    update_by: app.globalData.crmUserInfo.name
                }
                global.api.editContract(param).then((res) => {
                    const {
                        code,
                        result
                    } = res;
                    if (result == 0) {
                        let data = {
                            isEdited: true,
                            isChanged: false,
                            child: true
                        }
                        bus.emit('contractData', data)
                        setTimeout(() => {
                            bus.emit('contractListData', data)
                        }, 1000)
                        wx.showModal({
                            title: '提示',
                            content: '编辑成功',
                            showCancel: false,
                            success: (res) => {
                                if (res.confirm) {
                                    wx.navigateBack();
                                }
                            }
                        })
                    } else {
                        wx.showModal({
                            title: '提示',
                            content: '编辑失败，请重新尝试',
                            showCancel: false,
                            success: (res) => {
                                if (res.confirm) {}
                            }
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
                    co: app.globalData.crmUserInfo.code,
                    ct: this.data.detailList.ct,
                    cno: this.data.detailList.cno,
                    cn: this.data.detailList.cn,
                    cid: this.data.detailList.cid,
                    bt: this.data.detailList.bt,
                    et: this.data.detailList.et,
                    rm: this.data.detailList.rm,
                    pic: pic,
                    amount: this.data.detailList.amount,
                    quoteNo: this.data.detailList.quoteNo,
                    currency: "CNY",
                    signTime: 0,
                    sincerity: 0,
                    shopGuidList: [],
                    shopList: [],
                    update_by: app.globalData.crmUserInfo.name
                }
                global.api.addContract(param).then((res) => {
                    const {
                        code,
                        result
                    } = res;
                    if (result == 0) {
                        let data = {
                            isChanged: true,
                            isEdited: false,
                            child: false
                        }
                        bus.emit('contractListData', data)
                        wx.showModal({
                            title: '提示',
                            content: '添加成功',
                            showCancel: false,
                            success: (res) => {
                                if (res.confirm) {
                                    wx.navigateBack();
                                }
                            }
                        })
                    } else {
                        wx.showModal({
                            title: '提示',
                            content: '添加失败，请重新尝试',
                            showCancel: false,
                            success: (res) => {
                                if (res.confirm) {}
                            }
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
    // 表单校验函数
    initValidate() {
        const messages = {
            ct: {
                required: '请填写合同标题'
            },
            amount: {
                required: '请输入合同总量',
                range: '请输入0~1,000,000,000之间(不含)的数值'
            },
            cn: {
                required: '请选择客户名称'
            },
            btfmt: {
                required: '请选择开始日期'
            },
            etfmt: {
                required: '请选择截止日期',
                min: '开始日期不能大于截止日期'
            },
        }
        this.WxValidate = new WxValidate(this.data.rules, messages)
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.initValidate() //验证规则函数
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