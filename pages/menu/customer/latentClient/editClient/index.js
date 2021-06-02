// pages/menu/customer/latentClient/editClient/index.js
import areaList from '../../../../../utils/area'
import WxValidate from '../../../../../utils/WxValidate.js'
var app = getApp();
let currentYear = new Date().getFullYear();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        detailList: {
            na: "",
            industry: "",
            cty: "",
            city: "",
            provice: "",
            address: "",
            customerRating: "",
            source: "",
            fers: []
        },
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
        areaList: areaList,
        area: "",
        isCalendarShow: false,
        isAddShow: false,
        columns: [],
        isEdit: false,
        loading: false,
        formData: {},
        followers: "",
        minDate: new Date(currentYear - 1, 0, 1).getTime(),
        maxDate: new Date(currentYear + 1, 11, 31).getTime(),
        currDate: new Date().getTime(),
        ferShow: true, // 跟进人选择
        showThis:'',//显示的面板
    },

    // 选择器事件
    selectShow(e) {
        let lable = e.target.dataset.label
        let columns = this.data.columns
        if (lable == '初次接触') {
            this.setData({
                isCalendarShow: true
            })
        } else if (lable == '所在地区') {
            this.setData({
                isAddShow: true
            })
        } else if (lable == '来源') {
            this.setData({
                columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
                isShow: true,
                showThis:'src'
            })
        } else if (lable == '客户评级') {
            columns = ['A (有意向)', 'B (考虑中)', 'C (没意向)', 'D (其他)'];
            this.setData({
                columns,
                isShow: true,
                showThis:'lev'
            })
        } else if (lable == '行业') {
            this.setData({
                columns:['x','f','g'],
                isShow: true,
                showThis:'in'
            })
        }
    },
    // 选择器取消事件
    onCancel() {
        this.setData({
            isCalendarShow: false,
            isAddShow: false,
            isInShow: false,
            isSrcShow: false,
            isLevShow: false
        })
    },
    // 跟进人点击事件
    goSelectFollower() {
        if (this.data.ferShow) {
            wx.navigateTo({
                url: `/pages/menu/followerMultiple/index`
            })
        }
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
    // 删除按钮
    removeRecord(e) {
        let idx = e.target.dataset.idx;
        let list = this.data.contactList;
        list.splice(idx, 1)
        this.setData({
            contactList: list
        })
    },
    // 保存点击事件
    handleSave() {
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
            let erremail = `contactList[${index}].erremail`;
            this.setData({
                [errcontname]: "",
                [errcontphone]: "",
                errna: '',
                errfirstcont: '',
                errarea: '',
                erraddress: '',
                errlev: '',
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
                firstcont: this.data.detailList.firstContactTimefmt,
                area: this.data.detailList.provice,
                address: this.data.detailList.address,
                lev: this.data.detailList.customerRating,
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
    // 表单校验
    initValidate() {
        const rules = {
            na: {
                required: true
            },
            firstcont: {
                required: true
            },
            area: {
                required: true
            },
            address: {
                required: true
            },
            lev: {
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
                email: true
            },
        }
        const messages = {
            na: {
                required: '请填写客户名称'
            },
            firstcont: {
                required: '请选择初次接触时间'
            },
            area: {
                required: '请选择地区'
            },
            address: {
                required: '请填写详细地址'
            },
            lev: {
                required: '请选择客户评级'
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
                email: '请填写正确的邮箱地址'
            }
        }
        this.WxValidate = new WxValidate(rules, messages)
    },
    // 联系人名片上传
    fileUpload(e) {
        const {
            file
        } = e.detail;
        let idx = e.currentTarget.dataset.idx;
        let name = file.url.substring(file.url.lastIndexOf("/") + 1)
        wx.uploadFile({
            url: app.globalData.fileServerUrl,
            filePath: file.url,
            name: 'file',
            formData: {
                'fileKey': 'file',
                'fileName': name
            },
            success: (res) => {
                const data = JSON.parse(res.data)
                console.log(data);
                if (!data.error_code) {
                    let fileList = [],
                        imageDatas = [];
                    fileList.push(file)
                    imageDatas.push({
                        url: data.path,
                        name: data.path.substring(data.path.lastIndexOf("/") + 1)
                    })
                    this.setData({
                        [`contactList[${idx}].fileList`]: fileList,
                        [`contactList[${idx}].imageDatas`]: imageDatas
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
    },
    onConfirm(e) {
        const {value} = e.detail
        if(this.data.showThis ==='src'){
            let str = `detailList.source`
            this.setData({
                [str]:value
            })
        } else if(this.data.showThis ==='in'){
            let str = `detailList.industry`
            this.setData({
                [str]:value
            })
        } else if(this.data.showThis ==='lev'){
            let str = `detailList.customerRating`
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