// pages/menu/followerSingle/index.js
let app = getApp();
let navstr = ''
Page({

    /**
     * 页面的初始数据
     */
    data: {
        searchVal: '', // 关键词
        val: [], //选中值
        ferList: [], //原数组
        tm: [], 
        tmn: [],
        cm: [],
        fers: [],
        list: [{
            userid:'1',
            name:'ces'
        }], //过滤数组
        selectOwner: false, //销售计划编辑页选择归属人
        selectFollower: false, //销售计划列表页选择下属
        selectManager: false, //任务选择负责人
    },

    onChange(e) {
        let ferList = this.data.ferList;
        let fer = {};
        let name;
        let id = e.detail;
        for (var i = 0; i < ferList.length; i++) {
            if (id == ferList[i].userid) {
                name = ferList[i].name;
                if (this.data.type == 'selectFollower') {
                    fer.follower = name;
                    fer.followerId= id
                }
            }
        }
        this.setData({
            val: e.detail
        })
        let pages = getCurrentPages(),
            thispage = pages[pages.length - 1],//子页面
            parpage = pages[pages.length - 2]//父页面
        if (this.data.type == 'selectOwner') {
            parpage.setData({
                'detailList.ower': name,
                'detailList.owid': id
            })
        } else if(this.data.type == 'selectFollower') {
            parpage.setData({
                num: 3,
                owner: name,
                fer,
                page: 0,
                planList: [],
                isChanged: true
            })
            parpage.loadData()
        } else if(this.data.type == 'selectManager') {
            parpage.setData({
                ma: name,
                maid: id
            })
        }
        wx.navigateBack({
            delta: 1
        });
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