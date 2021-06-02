// pages/menu/sales/salesPlan/editPlan/index.js
import utils from "../../../../../utils/index";
import WxValidate from '../../../../../utils/WxValidate.js'
let app = getApp();
let currentYear = new Date().getFullYear();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        detailList: {
            year: currentYear,
            area: '',
            planType: '',
            detail: [],
            yearname: currentYear + '年',
            cycle: '',
            finishtotal: 0,
            ower: '',
            plantotalfmt: '', // 计划总额格式化
        },
        isSelectShow: false,
        select: '',
        columns: [],
        isYear: true,
        isEdit: false,
        idx: 0, // 计划周期项索引
        rules: {
            area: {
                required: true
            },
            planType: {
                required: true
            },
            cycle: {
                required: true
            },
            plantotalfmt: {
                required: true,
                range: [0.01, 1000000000]
            },
            ower: {
                required: true
            },
            fin: {
                range: [0.01, 1000000000]
            },
        },
        numLen: 9
    },

    selectShow(e) {
        if (!this.data.isEdit) {
            let columns;
            if (e.target.dataset.label == "yearname") {
                columns = [currentYear + '年', currentYear + 1 + '年', currentYear + 2 + '年', currentYear + 3 + '年', currentYear + 4 + '年', currentYear + 5 + '年'];
            } else if (e.target.dataset.label == "planType") {
                columns = ['年度计划', '季度计划', '月度计划'];
            } else if (e.target.dataset.label == "cycle") {
                if (this.data.detailList.planType == '季度计划') {
                    columns = ['一季度', '二季度', '三季度', '四季度'];
                } else if (this.data.detailList.planType == '月度计划') {
                    columns = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
                }
            }
            this.setData({
                columns,
                isSelectShow: true,
                select: e.target.dataset.label
            })
        }
    },
    onCancel() {
        this.setData({
            isSelectShow: false
        })
    },
    onConfirm(e) {
        const {
            picker,
            value,
            index
        } = e.detail;
        let str = `detailList.${this.data.select}`;
        if (this.data.select == 'planType') {
            if (value == '年度计划') {
                this.setData({
                    isYear: true,
                    'detailList.cycle': '全年',
                    idx: 0
                })
            } else {
                // 显示计划周期项
                this.setData({
                    isYear: false,
                    // 选择时清空计划周期项
                    'detailList.cycle': '',
                    idx: 0
                })
            }
        }
        if (this.data.select == 'cycle') {
            this.setData({
                idx: index
            })
        }
        this.setData({
            [str]: value,
            isSelectShow: false
        })
    },
    /**
     * 选择归属人
     */
    goSelectFollower() {
        if (!this.data.isEdit) {
            wx.navigateTo({
                url: `/pages/menu/followerSingle/index`
            });
        }
    },
    /**
     * 添加分类信息
     */
    addRecord() {
        let list = this.data.detailList.detail;
        list.push({
            fin: '',
            isNew: true,
            plannumLen: 9,
            finnumLen: 9,
        })
        this.setData({
            'detailList.detail': list
        })
        // 不存在校验规则则添加
        if (!this.data.rules.name) {
            this.setData({
                'rules.name': {
                    required: true
                },
                'rules.plan': {
                    required: true,
                    range: [0.01, 1000000000]
                },
            })
            this.initValidate()
        }
    },
    handleSave() {
        this.setData({
            'detailList.year': Number(this.data.detailList.yearname.slice(0, 4))
        })
        let obj;
        switch (this.data.detailList.planType) {
            case '年度计划':
                this.setData({
                    'detailList.type': 'Y',
                    'detailList.st': new Date(this.data.detailList.year + '-01-01T00:00:00').getTime() / 1000,
                    'detailList.et': new Date(this.data.detailList.year + '-12-31T23:59:59').getTime() / 1000,
                    'detailList.cycle': '全年'
                })
                break;
            case '季度计划':
                obj = this.getTimestamp()
                this.setData({
                    'detailList.type': 'Q',
                    'detailList.st': obj.st,
                    'detailList.et': obj.et,
                })
                break;
            case '月度计划':
                obj = this.getTimestamp()
                this.setData({
                    'detailList.type': 'M',
                    'detailList.st': obj.st,
                    'detailList.et': obj.et,
                })
                break;
        }
        // 过滤分类数组
        let list = [];
        // 校验表单
        let flagArr = [];
        let val1 = {
            area: this.data.detailList.area,
            planType: this.data.detailList.planType,
            cycle: this.data.detailList.cycle,
            plantotalfmt: this.data.detailList.plantotal,
            ower: this.data.detailList.ower
        }
        if (this.data.detailList.detail.length) {
            this.data.detailList.detail.forEach((val, index) => {
                let obj = {};
                obj.name = val.name;
                obj.fin = val.fin;
                obj.plan = val.plan;
                list.push(obj)
                // 清空处理
                let errname = `detailList.detail[${index}].errname`;
                let errplanfmt = `detailList.detail[${index}].errplanfmt`;
                let errfinfmt = `detailList.detail[${index}].errfinfmt`;
                this.setData({
                    [errname]: "",
                    [errplanfmt]: '',
                    [errfinfmt]: '',
                    errarea: '',
                    errplanType: '',
                    errcycle: '',
                    errplantotalfmt: '',
                    errower: ''
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
                                    [errname]: item.msg
                                })
                            } else if (item.param == "plan") {
                                this.setData({
                                    [errplanfmt]: item.msg
                                })
                            } else if (item.param == "fin") {
                                this.setData({
                                    [errfinfmt]: item.msg
                                })
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
                val = Object.assign(val, val1)
                flagArr.push(errMsg(val))
            });
        } else {
            this.setData({
                errarea: '',
                errplanType: '',
                errcycle: '',
                errplantotalfmt: '',
                errower: ''
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
            flagArr.push(errMsg(val1))
        }
        let flag = flagArr.every(val => {
            return val;
        });
        if (flag) {
            // 比较计划总额与分类信息计划金额总和
            let planmoney = 0;
            this.data.detailList.detail.forEach((val, index) => {
                return planmoney += Number(val.plan)
            })
            if (this.data.detailList.plantotal < planmoney) {
                wx.showModal({
                    title: '提示',
                    content: '计划金额总和不能大于计划总额',
                    showCancel: false,
                    success: (res) => {
                        if (res.confirm) {

                        }
                    }
                })
                return
            }
            // 比较完成总额与分类信息完成金额总和
            let finishmoney = 0;
            this.data.detailList.detail.forEach((val, index) => {
                return finishmoney += Number(val.fin)
            })
            if (this.data.detailList.finishtotal < finishmoney) {
                wx.showModal({
                    title: '提示',
                    content: '完成金额总和不能大于完成总额',
                    showCancel: false,
                    success: (res) => {
                        if (res.confirm) {

                        }
                    }
                })
                return
            }
            if (this.data.isEdit) {
                wx.showModal({
                    title: '提示',
                    content: '修改成功',
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
    /**
     * 验证规则函数
     */
    initValidate() {
        const messages = {
            area: {
                required: '请填写区域'
            },
            planType: {
                required: '请选择计划类型'
            },
            cycle: {
                required: '请选择计划周期'
            },
            plantotalfmt: {
                required: '请填写计划总额',
                range: '请输入0~1,000,000,000之间(不含)的数值'
            },
            ower: {
                required: '请选择归属人'
            },
            name: {
                required: '请填写分类名称'
            },
            plan: {
                required: '请填写分类计划金额',
                range: '请输入0~1,000,000,000之间(不含)的数值'
            },
            fin: {
                range: '请输入0~1,000,000,000之间(不含)的数值'
            },
        }
        this.WxValidate = new WxValidate(this.data.rules, messages)
    },
    /**
     * 移除分类信息
     */
    removeRecord(e) {
        let idx = e.currentTarget.dataset.idx;
        let list = this.data.detailList.detail;
        list.splice(idx, 1)
        this.setData({
            'detailList.detail': list
        })
        // 长度为0则移除验证规则
        if (list.length == 0) {
            this.setData({
                rules: {
                    area: {
                        required: true
                    },
                    planType: {
                        required: true
                    },
                    cycle: {
                        required: true
                    },
                    plantotalfmt: {
                        required: true,
                        range: [0.01, 1000000000]
                    },
                    ower: {
                        required: true
                    },
                }
            })
            this.initValidate()
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.initValidate() // 初始化验证
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