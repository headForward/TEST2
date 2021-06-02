// pages/menu/costManagement/reimbursement/index.js
import constant from "../../../../public/constant"

var app = getApp();
let currentYear = new Date().getFullYear();
let curDate = new Date();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        saveStatusCount:1,
        inApprovalStatusCount:1,
        approvedStatusCount:1,
        goBackStatusCount:1,
        searchVal: '',
        isfilterShow: false,
        screen: [{
            title: '单据日期',
            content: ['开始时间--结束时间']
        }, {
            title: '申请单类型',
            content: ['不限']
        }],
        selecteds: [
            [],
            [1]
        ],
        idList: [],
        oldsel: [
            [],
            [1]
        ],
        newidList: [],
        sp: '',
        isCalendarShow: false,
        minDate: new Date(currentYear - 1, 0, 1).getTime(),
        maxDate: new Date(currentYear + 1, 11, 31).getTime(),
        currDate: [curDate.getTime()],
        costList: [
            [{
            billTypeName:'差旅付款（商务）',
            userName:'dew',
            payDate:'dewf',
            id:'1',
            groupText:'无',
            currency:'23',
            costAmount:'w'
        },{
            billTypeName:'业务付款（商务）',
            userName:'dew',
            payDate:'dewf',
            id:'1',
            groupText:'无',
            currency:'23',
            costAmount:'w'
        }
        ,{
            billTypeName:'其他付款',
            userName:'dew',
            payDate:'dewf',
            id:'1',
            groupText:'无',
            currency:'23',
            costAmount:'w'
        }]
    ],
        page: 1,
        pageSize: 15,
        status: 0,
        isReload: false,
        loadMore: true,
        active: 0,
        netStatus: ''
    },

    filterShow() {
        if (this.data.isCalendarShow) {
            this.setData({
                isCalendarShow: false
            })
        } else {
            this.setData({
                newidList: this.data.idList,
                selecteds: JSON.parse(JSON.stringify(this.data.oldsel)),
                isCalendarShow: false,
                isfilterShow: !this.data.isfilterShow
            })
        }
    },
    // 筛选项点击事件
    btnClick(e) {
        let index = e.target.dataset.index; // 点击项
        let num = e.target.dataset.i; // 点击索引
        if (index) {
            let content = e.target.dataset.content, // 文字内容
                str = `selecteds[1][${num}]`, //取当前点击索引值
                newidList = []
            this.data.typeList.forEach(ele => {
                if (ele.typeName == e.target.dataset.content) {
                    newidList.push(ele.id)
                }
            })
            this.setData({
                'selecteds[1]': [],
                [str]: 1,
                newidList
            })
        } else {
            this.setData({
                isCalendarShow: true
            })
        }
    },
    // 筛选确定
    handleFilter() {
        this.setData({
            idList: this.data.newidList,
            oldsel: JSON.parse(JSON.stringify(this.data.selecteds)),
            page: 1,
            loadMore: true,
            isfilterShow: false
        })
    },
    // 筛选重置
    handleReset() {
        this.setData({
            selecteds: [
                [],
                [1],
            ],
            newidList: [],
            st: '',
            et: '',
            searchVal: ''
        })
    },
    onClose() {
        this.setData({
            isCalendarShow: false
        })
    },
    onConfirm(e) {
        const [start, end] = e.detail;
        this.setData({
            'screen[0].content[0]': `${global.utils.dateFormat("yyyy/MM/dd", start)}-${global.utils.dateFormat("yyyy/MM/dd", end)}`,
            'selecteds[0]': [1],
            st: global.utils.dateFormat("yyyy-MM-dd", start),
            et: global.utils.dateFormat("yyyy-MM-dd", end),
            isCalendarShow: false
        })
    },
    goDetail(e) {
        switch (e.currentTarget.dataset.type) {
            case '差旅付款（商务）':
                wx.navigateTo({
                    url: `/pages/menu/costManagement/reimbursement/travelExpense/index?id=${e.currentTarget.dataset.id}`
                });
                break
            case '业务付款（商务）':
                wx.navigateTo({
                    url: `/pages/menu/costManagement/reimbursement/commercialExpense/index?id=${e.currentTarget.dataset.id}`
                });
                break
            case '其他付款':
                wx.navigateTo({
                    url: `/pages/menu/costManagement/reimbursement/othersExpense/index?id=${e.currentTarget.dataset.id}`
                });
        }
    },
    onTabChange(e) {
        this.setData({
            isCalendarShow: false,
            isfilterShow: false,
            status: e.detail.name,
            page: 1,
            loadMore: true
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