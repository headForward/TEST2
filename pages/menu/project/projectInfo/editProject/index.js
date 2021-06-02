// pages/menu/project/projectInfo/editProject/index.js
import areaList from "../../../../../utils/area"
import WxValidate from '../../../../../utils/WxValidate.js'

var app = getApp();
let currentYear = new Date().getFullYear();
let curDate = new Date();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        prn: '',
        projectNo: '',
        ex: '',
        acreage: '',
        ba: '',
        productDes: '',
        occupancyRate: '',
        prg: '',
        remark: '',
        addr: '',
        detailList: {
            pra: {
                org: "",
                contact: "",
                tel: ''
            },
            prb: {
                org: "",
                contact: "",
                tel: ""
            },
            sup: {
                org: "",
                contact: "",
                tel: ""
            },
            des: {
                org: "",
                contact: "",
                tel: ""
            },
            supplier: {
                org: "",
                contact: "",
                tel: ""
            },
            fers: {},
            follower: '',
            pu: [],
            dis: '',
            cy: '',
            pro: '',
            prc: 0,
            prcfmt: '￥0.00',
            prt: '',
            prs: '',
            cid: '',
            cn: '',
            category: '',
            startTime: 0,
            projectPic: []
        },
        ex: '',
        isEdit: false,
        minDate: new Date(currentYear - 1, 0, 1).getTime(),
        maxDate: new Date(currentYear + 1, 11, 31).getTime(),
        currDate: curDate.getTime(),
        isCalendarShow: false,
        isAddrShow: false,
        isShow: false,
        sellabel: '',
        columnList: [],
        columns: [],
        areaList: areaList,
        area: "",
        rules: {
            prn: {
                required: true
            },
            prcfmt: {
                range: [0, 1000000000]
            },
            follower: {
                required: true
            },
            tel: {
                tel: true
            },
            praTel: {
                rangelength: [11, 11]
            },
            prbTel: {
                rangelength: [11, 11]
            },
            supTel: {
                rangelength: [11, 11]
            },
            desTel: {
                rangelength: [11, 11]
            },
            supplierTel: {
                rangelength: [11, 11]
            },
            price: {
                range: [0, 1000000000]
            }
        },
        fileList: []
    },

    // 跳转选择客户页
    goSelectClient() {
        wx.navigateTo({
            url: `/pages/menu/customer/basicClients/index?cid=${this.data.detailList.cid}`
        });
    },
    // 选择框弹出控制
    selectShow(e) {
        switch (e.currentTarget.dataset.label) {
            case 'startTime':
                this.setData({
                    isCalendarShow: true,
                    isAddrShow: false,
                    isShow: false
                })
                break
            case 'area':
                this.setData({
                    isAddrShow: true,
                    isCalendarShow: false,
                    isShow: false
                })
                break
            default:
                let columns;
                let columnList = this.data.columnList;
                for (var i = 0; i < columnList.length; i++) {
                    if (e.currentTarget.dataset.label == columnList[i].label) {
                        columns = columnList[i].columns
                    }
                }
                this.setData({
                    isShow: true,
                    isCalendarShow: false,
                    isAddrShow: false,
                    columns
                })
                break
        }
        this.setData({
            sellabel: e.currentTarget.dataset.label
        })
    },
    // 选择框取消选择
    onClose() {
        this.setData({
            isCalendarShow: false,
            isAddrShow: false,
            isShow: false
        })
    },
    // 选择框确认选择
    onConfirm(e) {
        if (this.data.sellabel == 'area') {
            this.setData({
                'detailList.dis': e.detail.values[2].name,
                'detailList.cy': e.detail.values[1].name,
                'detailList.pro': e.detail.values[0].name,
                area: e.detail.values[2].code
            })
            this.initValidate()
        } else if (this.data.sellabel == 'startTime') {
            this.setData({
                'detailList.startTime': parseInt(new Date(e.detail).getTime() / 1000),
                'detailList.startTimefmt': global.utils.dateFormat("yyyy-MM-dd", e.detail),
                calendarShow: false,
            })
        } else {
            let str = `detailList.${this.data.sellabel}`
            this.setData({
                [str]: e.detail.value
            })
        }
        this.onClose()
    },
    // 跳转跟进人选择页
    goSelectFer() {
        wx.navigateTo({
            url: `/pages/menu/followerMultiple/index?fers=${JSON.stringify(this.data.detailList.fers)}&type=project`
        });
    },
    // 新增产品信息
    addProduct() {
        let list = this.data.detailList.pu;
        list.push({
            name: '',
            amount: '',
            pricefmt: '',
            price: '',
            cycle: '',
            remark: ''
        })
        this.setData({
            'detailList.pu': list
        })
        // 不存在校验规则则添加
        if (!this.data.rules.name) {
            this.initValidate()
        }
    },
    // 删除产品信息
    removeRecord(e) {
        let idx = e.currentTarget.dataset.idx;
        let list = this.data.detailList.pu;
        list.splice(idx, 1)
        this.setData({
            'detailList.pu': list
        })
        // 长度为0则移除验证规则
        if (list.length == 0) {
            let rules = this.data.rules;
            delete rules.name
            this.setData({
                rules
            })
            this.initValidate()
        }
    },
        /**
     * 验证规则函数
     */
    initValidate() {
        let rules = this.data.rules;
        if (this.data.detailList.dis) {
            rules.addr = {required: true}
        }
        if (this.data.detailList.pu.length) {
            rules.name = {required: true}
        }
        this.setData({
            rules
        })
        const messages = {
            prn: {
                required: '请填写工程名称'
            },
            prcfmt: {
                range: '请输入0~1,000,000,000之间(不含)的数值'
            },
            follower: {
                required: '请选择跟进人'
            },
            addr: {
                required: '请填写详细地址',
            },
            name: {
                required: '请填写产品名称'
            },
            praTel: {
                rangelength: '请输入11位数的手机号码'
            },
            prbTel: {
                rangelength: '请输入11位数的手机号码'
            },
            supTel: {
                rangelength: '请输入11位数的手机号码'
            },
            desTel: {
                rangelength: '请输入11位数的手机号码'
            },
            supplierTel: {
                rangelength: '请输入11位数的手机号码'
            },
            price: {
                range: '请输入0~1,000,000,000之间(不含)的数值'
            },
        }
        this.WxValidate = new WxValidate(this.data.rules, messages)
    },
        // 新增修改
        handleSave() {
            let list = [];
            // 校验表单
            let flagArr = [];
            let val1 = {
                prn: this.data.prn,
                follower: this.data.detailList.follower,
                addr: this.data.addr,
                praTel: this.data.detailList.pra.tel,
                prbTel: this.data.detailList.prb.tel,
                supTel: this.data.detailList.sup.tel,
                desTel: this.data.detailList.des.tel,
                supplierTel: this.data.detailList.supplier.tel,
                prcfmt: this.data.detailList.prc
            }
            if (this.data.detailList.pu.length) {
                this.data.detailList.pu.forEach((val, index) => {
                    let obj = {};
                    obj.name = val.name;
                    obj.amount = val.amount;
                    obj.price = val.price;
                    obj.cycle = val.cycle;
                    obj.remark = val.remark;
                    list.push(obj)
                    // 清空处理
                    let errname = `detailList.pu[${index}].errname`;
                    let errprice = `detailList.pu[${index}].errprice`;
                    this.setData({
                        [errname]: "",
                        [errprice]: "",
                        errprn: '',
                        errfollower: '',
                        erraddr: '',
                        errpraTel: '',
                        errprbTel: '',
                        errsupTel: '',
                        errdesTel: '',
                        errsupplierTel: '',
                        errprcfmt: ''
                    });
                    const errMsg = (val) => {
                        let flag = true;
                        return flag
                    }
                    val = Object.assign(val, val1)
                    flagArr.push(errMsg(val))
                });
            } else {
                this.setData({
                    errprn: '',
                    errfollower: '',
                    erraddr: '',
                    errpraTel: '',
                    errprbTel: '',
                    errsupTel: '',
                    errdesTel: '',
                    errsupplierTel: '',
                    errprcfmt: ''
                });
                const errMsg = (val) => {
                    console.log(val);
                    let flag = true;
                    return flag
                }
                flagArr.push(errMsg(val1))
            }
            let flag = flagArr.every(val => {
                return val;
            });
            // return
            if (flag) {
                // 处理图片
                let fileList = this.data.fileList;
                let pic = [];
                for (var i = 0; i < fileList.length; i++) {
                    let obj = {}
                    obj.url = fileList[i].path
                    obj.name = fileList[i].path.substring(fileList[i].path.lastIndexOf("/") + 1)
                    pic.push(obj);
                }
                if (this.data.isEdit) {
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
                        content: '新增成功',
                        showCancel: false,
                        success: (res) => {
                            if (res.confirm) {
                                wx.navigateBack();
                            }
                        }
                    })
                }
            }
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