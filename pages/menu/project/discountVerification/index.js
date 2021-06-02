// pages/menu/project/discountVerification/index.js
import constant from "../../../../public/constant"

var app = getApp();
let currentYear = new Date().getFullYear();
let date = new Date();
let month = date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
let datestr = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
let curDate = new Date(date.getFullYear() + '-' + month + '-' + datestr + 'T23:59:59');
let beginDate = [];
[1, 3, 6, 12].forEach(val => {
    beginDate.push(global.utils.getMonthTime(curDate, val).replace(/[/]/g, ''))
})
let endTime = global.utils.dateFormat('yyyyMMdd', curDate)
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: [{
            clientName: 'cewc',
            zmoney: 'dafa',
            sapSpecialProjects: [{
                projectName: 'dwedw',
                zmoney: 'efqwfcvw',
                project: 'wdwedc'
            }]
        }],
        dvList: [],
        activeName: '',
        isfilterShow: false,
        screen: [{
                title: '查询条件',
                content: ['近一个月', '近三个月', '近半年', '近一年']
            },
            {
                title: '自定义查询',
                content: ['开始时间--结束时间']
            }
        ],
        selecteds: [
            [1],
            []
        ],
        oldsel: [
            [1],
            []
        ],
        minDate: new Date(currentYear - 1, 0, 1).getTime(),
        maxDate: new Date(currentYear + 1, 11, 31).getTime(),
        currDate: [curDate.getTime()],
        beginTime: beginDate[0],
        endTime: endTime,
        newbeginTime: beginDate[0],
        newendTime: endTime,
        isCalendarShow: false,
        isReload: false,
        searchVal: '',
        netStatus: '',
        preventCtrl: false
    },

    onChange(e) {
        this.setData({
            activeName: e.detail
        })
    },
    filterShow() {
        if (!this.data.preventCtrl) {
            if (this.data.isCalendarShow) {
                this.setData({
                    isCalendarShow: false
                })
            } else {
                this.setData({
                    selecteds: JSON.parse(JSON.stringify(this.data.oldsel)),
                    newbeginTime: this.data.beginTime,
                    newendTime: this.data.endTime,
                    isfilterShow: !this.data.isfilterShow
                })
            }
        }
    },
    btnClick(e) {
        let index = e.target.dataset.index;
        let num = e.target.dataset.i;
        if (index == 1) {
            this.setData({
                isCalendarShow: true
            })
        } else {
            let str = `selecteds[0][${num}]`
            this.setData({
                'selecteds': [
                    [],
                    []
                ],
                [str]: 1,
                newbeginTime: beginDate[num]
            })
        }
    },
    handleFilter() {
        this.setData({
            isfilterShow: false,
            beginTime: this.data.newbeginTime,
            endTime: this.data.newendTime,
            oldsel: JSON.parse(JSON.stringify(this.data.selecteds)),
        })
    },
    handleReset() {
        this.setData({
            selecteds: [
                [1],
                []
            ],
            newbeginTime: beginDate[0],
            newendTime: endTime,
        })
    },
    goDetail(e) {
        wx.navigateTo({
            url: `/pages/menu/project/discountVerification/detailInfo/index?projectNum=${e.target.dataset.id}`,
        });
    },
    onConfirm(e) {
        const [start, end] = e.detail;
        this.setData({
            'screen[1].content[0]': `${global.utils.dateFormat("yyyy/MM/dd", start)}--${global.utils.dateFormat("yyyy/MM/dd", end)}`,
            selecteds: [
                [],
                [1]
            ],
            newbeginTime: global.utils.dateFormat("yyyyMMdd", start),
            newendTime: global.utils.dateFormat("yyyyMMdd", end),
            isCalendarShow: false
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