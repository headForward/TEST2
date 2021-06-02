// pages/menu/customer/visitClient/addRecord/index.js
import WxValidate from '../../../../../utils/WxValidate.js'
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        content: '',
        fileList: [],
        pic: [],
        location: '地点',
        latitude: Number,
        longitude: Number,
        client: {},
        type: '正式客户',
        isShow: false,
        columns: ['正式客户','潜在客户']
    },

    selectShow(){
        this.setData({
            isShow:true
        })
    },
    selectClient() {
        wx.navigateTo({
            url: `../../basicClients/index?client=${JSON.stringify(this.data.client)}&type=${this.data.type}`
        });
    },
    selectLocation() {
        wx.getSetting({
            success: (res) => {
                if (!res.authSetting['scope.userLocation']) {
                    wx.authorize({
                        scope: 'scope.userLocation',
                        success: () => {
                            wx.chooseLocation({
                                latitude: this.data.latitude,
                                longitude: this.data.longitude,
                                success: (res) => {
                                    this.setData({
                                        latitude: res.latitude,
                                        longitude: res.longitude,
                                        location: res.name
                                    })
                                }
                            })
                        },
                        fail: () => {
                            // 用户点击不允许引导重新获取授权
                            this.fetchAgainLocation()
                        }
                    })
                } else {
                    // 已经授权了就会直接进入地图
                    wx.chooseLocation({
                        latitude: this.data.latitude,
                        longitude: this.data.longitude,
                        success: (res) => {
                            this.setData({
                                latitude: res.latitude,
                                longitude: res.longitude,
                                location: res.name
                            })
                        }
                    })
                }
            }
        })
    },
    onCancel() {
        wx.navigateBack({
            delta: 1,
        })
    },
    handleSave() {
        // 校验表单
        let flagArr = []
        let val = {
            na: this.data.client.name,
            content: this.data.content
        }
        // 清空处理
        this.setData({
            errna: '',
            errcontent: ''
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
            // 随机生成uuid
            let recordId = global.utils.uuid();
            // 处理图片
            let fileList = this.data.fileList;
            let pic = [];
            for (var i = 0; i < fileList.length; i++) {
                let obj = {}
                obj.url = fileList[i].path
                obj.name = fileList[i].path.substring(fileList[i].path.lastIndexOf("/") + 1)
                obj.fullPath = fileList[i].url
                obj.thumbPath = fileList[i].url
                pic.push(obj);
            }
            // 调接口
            if (this.data.type == '正式客户') {
                wx.showModal({
                    title: '提示',
                    content: '添加成功',
                    showCancel: false,
                    success: (res) => {
                        if (res.confirm) {
                            wx.navigateBack({
                                delta: 1
                            });
                        }
                    }
                })
            } else {
                wx.showModal({
                    title: '提示',
                    content: '添加成功',
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
    },
    // 验证函数
    initValidate() {
        const rules = {
            na: {
                required: true
            },
            content: {
                required: true
            }
        }
        const messages = {
            na: {
                required: '请选择客户名称'
            },
            content: {
                required: '请填写跟进详情'
            }
        }
        this.WxValidate = new WxValidate(rules, messages)
    },
    onConfirm(e){
        const {value} = e.detail
        this.setData({
            type:value
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