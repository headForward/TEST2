// pages/menu/customer/visitClient/index.js
import utils from "../../../../utils/index";

var app = getApp();
let currentYear = new Date().getFullYear();
let date = new Date();
// let curDate = new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1);
let month = date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
let datestr = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
let curDate = new Date(date.getFullYear() + '-' + month + '-' + datestr + 'T23:59:59');
let lastMonth = utils.getMonthTime(curDate, 1)
Page({

    /**
     * 页面的初始数据
     */
    data: {
        keyword: '',
        visitList: [{
            a: [{
                title: '1',
                desc: '1',
                gid: '1',
                createdfmt:'1',
                follower:'1'
            }],
        }],
        loading: false,
        isSortShow1: false,
        isSortShow2: false,
        isCalendarShow: false,
        screen: [{
                title: '客户类型',
                content: ['不限', '正式客户', '潜在客户']
            },
            {
                title: '时间范围',
                content: [`${lastMonth}-${utils.dateFormat("yyyy/MM/dd", curDate)}`]
            }
        ],
        selecteds: [
            [1],
            [1],
        ],
        oldsel: [
            [1],
            [1],
        ],
        sortlist: ['按时间升序', '按时间降序'],
        num: 0,
        sort: '1', // 时间排序
        customerType: '', // 客户类型
        newcustomerType: '', // 客户类型
        page: 0,
        pageSize: 15,
        loadMore: true,
        isReload: false,
        isChange: false,
        minDate: new Date(currentYear - 1, 0, 1).getTime(),
        maxDate: new Date(currentYear + 1, 11, 31).getTime(),
        currDate: [new Date(lastMonth).getTime(), curDate.getTime()],
        beginTime: parseInt(new Date(lastMonth).getTime() / 1000),
        endTime: parseInt(curDate.getTime() / 1000),
        netStatus: '',
        preventCtrl: false
    },
    goVisitDetail() {
        wx.navigateTo({
            url: "./detailVisit/index"
        })
    },
    sortShow1() {
        if (!this.data.preventCtrl) {
            this.setData({
                isCalendarShow: false,
                isSortShow1: Boolean(!this.data.isSortShow1),
                isSortShow2: false
            })
        }
    },
    sortShow2() {
        if (!this.data.preventCtrl) {
            if (this.data.isCalendarShow) {
                this.setData({
                    isCalendarShow: false
                })
            } else {
                this.setData({
                    selecteds: JSON.parse(JSON.stringify(this.data.oldsel)),
                    isSortShow2: Boolean(!this.data.isSortShow2),
                    isSortShow1: false
                })
            }
        }
    },
    sortClick(e) {
        let index = e.currentTarget.dataset.index;
        this.setData({
            num: index,
            sort: (index + 1).toString(),
            page: 0,
            loadMore: true,
            isSortShow1: false
        })
    },
    btnClick(e) {
        console.log(e)
        let index = e.target.dataset.index;
        let num = e.target.dataset.i;
        if (index == 1) {
            this.setData({
                isCalendarShow: true
            })
        } else {
            let str = `selecteds[0][${num}]`
            this.setData({
                'selecteds[0]': [],
                [str]: 1,
                newcustomerType: num ? (num - 1).toString() : ''
            })
        }
    },
    // 筛选确定
    handleFilter() {
        this.setData({
            customerType: this.data.newcustomerType,
            oldsel: JSON.parse(JSON.stringify(this.data.selecteds)),
            page: 0,
            isSortShow2: false,
            loadMore: true
        })
    },
    onConfirm(e) {
        const [start, end] = e.detail;
        console.log(start + '' + end)
        this.setData({
            'screen[1].content[0]': `${utils.dateFormat("yyyy/MM/dd", start)}-${utils.dateFormat("yyyy/MM/dd", end)}`,
            beginTime: start / 1000,
            endTime: end / 1000 + 24 * 60 * 60 - 1,
            isCalendarShow: false
        })
    },
    handleReset() {
        this.setData({
            selecteds: [
                [1],
                [1],
            ],
            newcustomerType: '',
            'screen[1].content[0]': `${lastMonth}-${utils.dateFormat("yyyy/MM/dd", curDate)}`,
            beginTime: parseInt(new Date(lastMonth).getTime() / 1000),
            endTime: parseInt(curDate.getTime() / 1000)
        })
    },
        /**
     * 跳转添加页面
     */
    goAddRecord() {
        wx.navigateTo({
            url: '/pages/menu/customer/visitClient/addRecord/index',
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