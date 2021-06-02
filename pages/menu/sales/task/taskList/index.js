// pages/menu/sales/task/taskList/index.js
let app = getApp();
let navstr = '';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 排序项
        sorttype: 1,
        sortList: [{
                text: '最新创建',
                value: 1
            },
            {
                text: '截止日期',
                value: 2
            },
        ],
        // 筛选项
        screen: [{
                title: '优先级',
                content: ['不限', '普通', '重要', '紧急']
            },
            {
                title: '任务状态',
                content: ['不限', '未完成', '已完成', '已过期']
            }
        ],
        selecteds: [
            [1],
            [, 1]
        ],
        filter1: [],
        sp: '不限',
        st: 1,
        page: 0,
        pageSize: 15,
        type: '',
        curpg: 0,
        isChanged: false,
        isEdited: false,
        taskList: [{
            a: [{
                    tn: 'ces',
                    gid: 1,
                    etfmt: '2021-05-23',
                    aer: 'ces',
                    et: 23,
                    pr: 'cess'
                },
                {
                    tn: 'ces',
                    gid: 2,
                    etfmt: '2021-05-23',
                    aer: 'ces',
                    et: 12222222110,
                    pr: 'cess'
                }
            ]
        }],
        currDate: new Date().getTime(),
        isRequest: false,
        child: false,
        netStatus: ''
    },

    // 跳转详情页
    goDetailTask(e) {
        this.setData({
            curpg: e.target.dataset.idx
        })
        wx.navigateTo({
            url: `../detailTask/index?gid=${e.target.dataset.gid}&type=${this.data.type}`
        });
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
                st: num
            })
        } else { // 优先级项
            let content = e.target.dataset.content; // 文字内容
            let str = `selecteds[0][${num}]` //取当前点击索引值
            let filter = this.data.filter1
            let idx = filter.indexOf(content)
            let val;
            if (num == 0) {
                this.setData({
                    'selecteds[0]': [1],
                    filter1: [],
                    sp: '不限'
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
                    filter1: filter,
                    sp: filter.length ? val : '不限'
                })
            }
        }
    },
    // 筛选确定
    handleFilter() {
        this.setData({
            page: 0,
            loadMore: true
        })
        this.selectComponent('#filter').toggle(false)
    },
    // 下拉刷新
    onRefresh() {
        this.setData({
            page: 0,
            isReload: true,
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
            filter1: [],
            sp: "不限",
            st: 1,
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