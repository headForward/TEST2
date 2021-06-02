// pages/menu/customer/myClients/index.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        searchVal: '',
        clientList: [{
            a: [{
                title: '1',
                desc: '1',
                gid: '1'
            }],

        }], //客户列表，二维数组
        isSortShow: false,
        isfilterShow: false,
        // 筛选项
        screen: [{
                title: '来源',
                content: []
            },
            {
                title: '客户级别',
                content: []
            },
        ],
        selecteds: [
            [1],
            [1],
        ],
        oldsel: [
            [1],
            [1],
        ],
        sortlist: ['最新创建', '最后跟进'],
        sort: 1,
        filter1: [],
        filter2: [],
        src: "不限",
        lev: "不限",
        newfilter1: [],
        newfilter2: [],
        newsrc: "不限",
        newlev: "不限",
        num: 0,
        page: 0,
        pageSize: 15,
        isReload: false, // 是否是下拉刷新
        isChanged: false, // 列表新增or删除
        isEdited: false, // 列表项修改
        curpg: 0, // 当前点击项的page
        loadMore: true, // 加载更多
        isRequest: false, //是否在请求数据
        child: false, // 是否是编辑页面调用请求
        netStatus: '',
        preventCtrl: false,
        errImg: 'errNone'
    },
     /**
     * 函数
     */
    goDetailClient(e) {
        this.setData({
            curpg: e.target.dataset.idx
        })
        wx.navigateTo({
            url: `./detailClient/index`
        })
    },
    goEditClient() {
        wx.navigateTo({
            url: `./editClient/index`
        })
    },
    sortShow() {
        if (!this.data.preventCtrl) {
            this.setData({
                isSortShow: Boolean(!this.data.isSortShow),
                isfilterShow: false,
                searchVal: '',
            })
        }
    },
    sortClick(e) {
        let index = e.currentTarget.dataset.index;
        this.setData({
            num: index,
            sort: index + 1,
            isSortShow: false,
            page: 0,
            loadMore: true
        })
    },
    filterShow() {
        if (!this.data.preventCtrl) {
            this.setData({
                selecteds: JSON.parse(JSON.stringify(this.data.oldsel)),
                newfilter1: JSON.parse(JSON.stringify(this.data.filter1)),
                newfilter2: JSON.parse(JSON.stringify(this.data.filter2)),
                newsrc: this.data.src,
                newlev: this.data.lev,
                isfilterShow: Boolean(!this.data.isfilterShow),
                isSortShow: false,
                searchVal: '',
            })
        }
    },
    handleReset() {
        this.setData({
            selecteds: [
                [1],
                [1],
            ],
            newfilter1: [],
            newfilter2: [],
            newsrc: "不限",
            newlev: "不限",
        })
    },
    handleFilter() {
        this.setData({
            filter1: JSON.parse(JSON.stringify(this.data.newfilter1)),
            filter2: JSON.parse(JSON.stringify(this.data.newfilter2)),
            src: this.data.newsrc,
            lev: this.data.newlev,
            oldsel: JSON.parse(JSON.stringify(this.data.selecteds)),
            page: 0,
            isfilterShow: false,
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