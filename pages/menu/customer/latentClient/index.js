// pages/menu/customer/latentClient/index.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        page: 0,
        pageSize: 15,
        clientList: [{
            a: [{
                title: '1',
                desc: '1',
                gid: '1'
            }],
        }],
        searchVal: '',
        curpg: 0, // 当前表单选中的索引值
        loading: false,
        isSortShow1: false,
        isSortShow2: false,
        screen: [{
                title: '来源',
                content: []
            },
            {
                title: '状态',
                content: ['不限', '未转化', '已转化']
            }
        ],
        selecteds: [
            [1],
            [, 1],
        ],
        filter1: [],
        src: "不限",
        customerstatus: 2,
        oldsel: [
            [1],
            [, 1],
        ],
        newfilter1: [],
        newsrc: "不限",
        newcustomerstatus: 2,
        sortlist: ['最新创建', '最后跟进'],
        sorttype: 1,
        num: 0,
        loadMore: true,
        isReload: false, // 是否是下拉刷新
        isChanged: false, // 列表新增or删除
        isEdited: false, // 列表项修改
        isRequest: false,
        child: false,
        netStatus: '',
        preventCtrl: false,
        errImg: 'errNone'
    },

    // 表单详情
    goDetailClient(e) {
        this.setData({
            curpg: e.target.dataset.idx
        })
        wx.navigateTo({
            url: `./detailClient/index`
        })
    },
    // 关闭排序弹出层
    sortShow1(e) {
        if (!this.data.preventCtrl) {
            this.setData({
                isSortShow1: Boolean(!this.data.isSortShow1),
                isSortShow2: false,
                searchVal: ''
            })
        }
    },
    // 关闭筛选弹出层
    sortShow2() {
        if (!this.data.preventCtrl) {
            this.setData({
                selecteds: JSON.parse(JSON.stringify(this.data.oldsel)),
                newfilter1: JSON.parse(JSON.stringify(this.data.filter1)),
                newsrc: this.data.src,
                newcustomerstatus: this.data.customerstatus,
                isSortShow2: Boolean(!this.data.isSortShow2),
                isSortShow1: false,
                searchVal: ''
            })
        }
    },
    //排序项点击事件
    sortClick(e) {
        let index = e.currentTarget.dataset.index;
        this.setData({
            num: index,
            isSortShow1: false,
            loadMore: true,
            sorttype: index + 1,
            page: 0
        })
    },
    // 筛选项点击事件
    btnClick(e) {
        let index = e.target.dataset.index; // 点击项
        let num = e.target.dataset.i; // 点击索引
        if (index) { //状态项
            let str = `selecteds[1][${num}]`
            this.setData({
                'selecteds[1]': [],
                [str]: 1,
                newcustomerstatus: num + 1
            })
        } else { // 来源项
            let content = e.target.dataset.content; // 文字内容
            let str = `selecteds[0][${num}]` //取当前点击索引值
            let filter = this.data.newfilter1
            let idx = filter.indexOf(content)
            let val;
            if (num == 0) {
                this.setData({
                    'selecteds[0]': [1],
                    newfilter1: [],
                    newsrc: '不限'
                })
            } else {
                if (idx < 0) {
                    filter.push(content)
                } else {
                    filter.splice(idx, 1)
                }
                val = filter.join(',')
                this.setData({
                    'selecteds[0][0]': filter.length ? 0 : 1,
                    [str]: !this.data.selecteds[0][num],
                    newfilter1: filter,
                    newsrc: filter.length ? val : '不限'
                })
            }
        }
    },
    // 筛选确定
    handleFilter() {
        this.setData({
            filter1: JSON.parse(JSON.stringify(this.data.newfilter1)),
            src: this.data.newsrc,
            customerstatus: this.data.newcustomerstatus,
            oldsel: JSON.parse(JSON.stringify(this.data.selecteds)),
            page: 0,
            isSortShow2: false,
            loadMore: true
        })
    },
    // 筛选重置
    handleReset() {
        this.setData({
            selecteds: [
                [1],
                [, 1],
            ],
            newfilter1: [],
            newsrc: "不限",
            newcustomerstatus: 2,
        })
    },
    // 添加按钮
    goEditClient() {
        wx.navigateTo({
            url: "./editClient/index"
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