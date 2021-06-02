// pages/menu/project/projectInfo/index.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 顶部菜单栏
        searchVal: '',
        isSortShow: false,
        isfilterShow: false,
        // 排序项
        sortlist: ['最新创建', '最后跟进', '最高造价'],
        num: 0,
        sort: 1,
        // 筛选项
        screen: [{
                title: '工程类型',
                content: []
            },
            {
                title: '工程状态',
                content: []
            }
        ],
        selecteds: [
            [1],
            [1],
        ],
        filter1: [],
        filter2: [],
        type: "不限",
        status: "不限",
        oldsel: [
            [1],
            [1],
        ],
        newfilter1: [],
        newfilter2: [],
        newtype: "不限",
        newstatus: "不限",
        // 数据
        projectList: [{
            a: [{
                prn: 'ces',
                gid: '1',
                projectNo: '01',
                category: 'ces',
                prcfmt: '10',
                startTime: '2021-05-01',
                startTimefmt: '2021-05-01',
                depth: '中'
            }]
        }],
        page: 0,
        pageSize: 15,
        curpg: 0,
        isChanged: false, // 新增删除标记
        isEdited: false, // 编辑标记
        loadMore: true, // 加载更多标记
        isReload: false, // 下拉刷新标记
        isRequest: false,
        child: false,
        netStatus: '',
        preventCtrl: false
    },

    // 跳转详情页
    goDetailProject(e) {
        this.setData({
            curpg: e.target.dataset.idx
        })
        wx.navigateTo({
            url: `./detailProject/index?gid=${e.target.dataset.gid}`
        });
    },
    // 跳转编辑页
    goEditProject() {
        wx.navigateTo({
            url: './editProject/index'
        });
    },
    // 顶部菜单栏--筛选框弹出控制
    sortShow() {
        if (!this.data.preventCtrl) {
            this.setData({
                isSortShow: Boolean(!this.data.isSortShow),
                isfilterShow: false,
                searchVal: '',
            })
        }
    },
    filterShow() {
        if (!this.data.preventCtrl) {
            this.setData({
                selecteds: JSON.parse(JSON.stringify(this.data.oldsel)),
                newfilter1: JSON.parse(JSON.stringify(this.data.filter1)),
                newfilter2: JSON.parse(JSON.stringify(this.data.filter2)),
                newtype: this.data.type,
                newstatus: this.data.status,
                isfilterShow: Boolean(!this.data.isfilterShow),
                isSortShow: false,
                searchVal: '',
            })
        }
    },
    // 顶部菜单栏--筛选项选择
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
    btnClick(e) {
        let index = e.target.dataset.index;
        let num = e.target.dataset.i;
        let content = e.target.dataset.content;
        let str = `selecteds[${index}][${num}]`;
        let filter = index ? this.data.newfilter2 : this.data.newfilter1;
        let filterStr = `newfilter${index+1}`;
        let idx = filter.indexOf(content);
        let zero = `selecteds[${index}][0]`;
        let zeroList = `selecteds[${index}]`;
        let val;
        let title = index ? 'newstatus' : 'newtype'
        if (num == 0) {
            filter = [];
            val = '不限';
            this.setData({
                [zeroList]: [1],
                [filterStr]: filter,
                [title]: val
            })
        } else {
            if (idx < 0) {
                filter.push(content)
            } else {
                filter.splice(idx, 1)
            }
            val = filter.join(',')
            this.setData({
                [zero]: filter.length ? 0 : 1,
                [str]: !this.data.selecteds[index][num],
                [filterStr]: filter,
                [title]: filter.length ? val : '不限'
            })
        }
    },
    // 顶部菜单栏--筛选确认
    handleFilter() {
        this.setData({
            filter1: JSON.parse(JSON.stringify(this.data.newfilter1)),
            filter2: JSON.parse(JSON.stringify(this.data.newfilter2)),
            type: this.data.newtype,
            status: this.data.newstatus,
            oldsel: JSON.parse(JSON.stringify(this.data.selecteds)),
            page: 0,
            isfilterShow: false,
            loadMore: true
        })
    },
    // 顶部菜单栏--筛选项重置
    handleReset() {
        this.setData({
            selecteds: [
                [1],
                [1],
            ],
            newfilter1: [],
            newfilter2: [],
            newtype: "不限",
            newstatus: "不限",
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