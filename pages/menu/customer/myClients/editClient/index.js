// pages/menu/customer/myClients/editClient/index.js
import areaList from "../../../../../utils/area"
import WxValidate from '../../../../../utils/WxValidate'

var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 基本信息数组
        detailList: {
            na: "",
            industry: "",
            cty: "",
            city: "",
            provice: "",
            address: "",
            lev: "",
            src: "",
            fers: []
        },
        // 联系人信息数组
        contactList: [{
            mail: 1,
            contactRemark: "",
            email: "",
            imageDatas: [],
            job: "",
            telephone: "",
            sex: '1',
            fileList: []
        }],
        isShow: false,
        isEdit: false, // 编辑标志
        isAddShow: false, //区域面板
        columns: [], //面板选项
        areaList: areaList, // 区域面板选项
        area: "", // 区域
        followers: "", // 跟进人
        ferShow: true, // 跟进人是否允许修改
        showThis:'',//显示的面板
    },

    selectShow(e) {
        let columns;
        if (e.target.dataset.label == "所在地区") {
            this.setData({
                isAddShow: true
            })
        } else if (e.target.dataset.label == "来源") {
            // columns = app.globalData.filterOption[0];
            // console.log(1);
            this.setData({
                columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
                isShow: true,
                showThis:'src'
            })
        } else if (e.target.dataset.label == "客户级别") {
            // columns = app.globalData.filterOption[1];
            this.setData({
                columns: ['1','2','3'],
                isShow: true,
                showThis:'lev'
            })
        } else if (e.target.dataset.label == "行业") {
            // columns = app.globalData.industryType;
            this.setData({
                columns:['x','f','g'],
                isShow: true,
                showThis:'in'
            })
        }
    },
    /**
     * 选择面板确认
     */
    onAddConfirm(e) {
        this.setData({
            'detailList.cty': e.detail.values[2].name,
            'detailList.city': e.detail.values[1].name,
            'detailList.provice': e.detail.values[0].name,
            area: e.detail.values[2].code,
            isAddShow: false
        })
    },

    onInConfirm(e) {
        const {
            picker,
            value,
            index
        } = e.detail;
        let str = `detailList.industry`
        this.setData({
            [str]: value,
            isInShow: false,
        })
    },

    // 选择面板隐藏
    onCancel() {
        this.setData({
            isAddShow: false,
            isInShow: false,
            isSrcShow: false,
            isLevShow: false
        })
    },
    // 跳转选择跟进人页
    goSelectFollower() {
        // if (this.data.ferShow) {
        wx.navigateTo({
            // url: `/pages/menu/followerMultiple/index?fers=${JSON.stringify(this.data.detailList.fers)}`
            url: `/pages/menu/followerMultiple/index`
        })
        // }
    },
    addRecord() {
        let list = this.data.contactList;
        list.push({
            mail: 1,
            contactRemark: "",
            email: "",
            imageDatas: [],
            job: "",
            telephone: "",
            sex: '1',
            fileList: []
        })
        this.setData({
            contactList: list
        })
    },
    // 删除联系人
    removeRecord(e) {
        let idx = e.currentTarget.dataset.idx;
        let list = this.data.contactList;
        list.splice(idx, 1)
        this.setData({
            contactList: list
        })
    },
    // 保存编辑
    handleSave(e) {
        let list = [];
        // 校验表单
        let flagArr = []
        this.data.contactList.forEach((val, index) => {
            // 过滤联系人数组
            let obj = {};
            obj.name = val.name;
            obj.mobilePhone = val.mobilePhone;
            obj.mail = val.mail;
            obj.contactRemark = val.contactRemark;
            obj.email = val.email;
            obj.imageDatas = val.imageDatas;
            obj.job = val.job;
            obj.telephone = val.telephone;
            list.push(obj)
            // 清空处理
            let errcontname = `contactList[${index}].errname`;
            let errcontphone = `contactList[${index}].errmobilePhone`;
            let erremail = `contactList[${index}].erremail`
            this.setData({
                [errcontname]: "",
                errna: '',
                [errcontphone]: "",
                errarea: '',
                erraddress: '',
                errfollowers: '',
                [erremail]: ''
            });
            const errMsg = (val) => {
                let flag = true;
                if (!this.WxValidate.checkForm(val)) {
                    const error = this.WxValidate.errorList;
                    if (error.length) {
                        flag = false;
                    }
                    error.forEach(item => {
                        if (item.param == "name") {
                            this.setData({
                                [errcontname]: item.msg,
                            });
                        } else if (item.param == "mobilePhone") {
                            this.setData({
                                [errcontphone]: item.msg,
                            });
                        } else if (item.param == "email") {
                            this.setData({
                                [erremail]: item.msg,
                            });
                        } else {
                            let str = `err${item.param}`;
                            this.setData({
                                [str]: item.msg
                            })
                        }
                    })
                }
                return flag
            }
            val = Object.assign(val, {
                na: this.data.detailList.na,
                area: this.data.detailList.provice,
                address: this.data.detailList.address,
                followers: this.data.followers
            })
            flagArr.push(errMsg(val))
        });
        let flag = flagArr.every(val => {
            return val;
        });
        if (flag) {
            if (this.data.isEdit) {
                wx.showModal({
                    title: '提示',
                    content: '修改成功',
                    showCancel: false,
                    success: (res) => {
                        if (res.confirm) {
                            wx.navigateBack()
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
                            wx.navigateBack()
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
            area: {
                required: true
            },
            address: {
                required: true
            },
            followers: {
                required: true
            },
            name: {
                required: true
            },
            mobilePhone: {
                required: true,
                rangelength: [11, 11]
            },
            email: {
                // required: true,
                email: true
            }
        }
        const messages = {
            na: {
                required: '请填写客户名称'
            },
            area: {
                required: '请选择地区'
            },
            address: {
                required: '请填写详细地址'
            },
            followers: {
                required: '请选择跟进人'
            },
            name: {
                required: '请填写联系人名称'
            },
            mobilePhone: {
                required: '请填写联系人手机号',
                rangelength: '请输入11位数的手机号码'
            },
            email: {
                // required: '请填写邮箱',
                email: '请填写正确的邮箱地址'
            }
        }
        this.WxValidate = new WxValidate(rules, messages)
    },
    onConfirm(e) {
        const {value} = e.detail
        if(this.data.showThis ==='src'){
            let str = `detailList.src`
            this.setData({
                [str]:value
            })
        } else if(this.data.showThis ==='in'){
            let str = `detailList.industry`
            this.setData({
                [str]:value
            })
        } else if(this.data.showThis ==='lev'){
            let str = `detailList.lev`
            this.setData({
                [str]:value
            })
        }
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