// pages/menu/sales/salesPlan/index.js
import utils from "../../../../utils/index";
var app = getApp();
let currentYear = new Date().getFullYear();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        year: currentYear,
        owner: '全部成员',
        fer: {},
        num: 1,
        yearList: [],
        typeList: [{
                text: '计划类型',
                value: 'all'
            },
            {
                text: '年度计划',
                value: 'Y'
            },
            {
                text: '季度计划',
                value: 'Q'
            },
            {
                text: '月度计划',
                value: 'M'
            },
        ],
        planType: 'all',
        page: 0,
        pageSize: 15,
        planList: [{
            a: [{
                year: '1',
                cycle: '1',
                gid: '1',
                area: '1',
                ower: '1',
                updateTime: '1',
                rate: '1',
                finishtotal: '1',
                plantotal: '1'
            }]
        }],
        loading: false,
        loadMore: true,
        isReload: false,
        isChanged: false,
        isEdited: false,
        curpg: 0,
        addPermission: true, //销售计划创建权限
        isRequest: false,
        netStatus: '',
        preventCtrl: true
    },

    goEditPlan() {
        wx.navigateTo({
            url: './editPlan/index',
        });
    },
    goDetailPlan(e) {
        this.setData({
            curpg: e.target.dataset.idx
        })
        wx.navigateTo({
            url: `./detailPlan/index`,
        });
    },
    /**
     * 下拉刷新
     */
    onRefresh() {
        this.setData({
            page: 0,
            isReload: true,
            loadMore: true
        })
    },
    ownerClick() {
        wx.navigateTo({
            url: `/pages/menu/followerSingle/index?type=selectFollower&val=${this.data.fer.followerId}`,
        });
        this.selectComponent('#owner').toggle(false)
    },
    sortClick(e) {
        let index = Number(e.currentTarget.dataset.index);
        let owner;
        if (index == 2) {
            owner = '我的'
        } else {
            owner = '全部成员'
        }
        this.setData({
            num: index,
            owner,
            page: 0,
            loadMore: true,
            fer: {} // 清空选择下属选项
        })
        this.selectComponent('#owner').toggle(false)
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            yearList: [{
                    text: `${currentYear-2}年`,
                    value: currentYear - 2
                },
                {
                    text: `${currentYear-1}年`,
                    value: currentYear - 1
                },
                {
                    text: `${currentYear}年`,
                    value: currentYear
                },
                {
                    text: `${currentYear+1}年`,
                    value: currentYear + 1
                },
                {
                    text: `${currentYear+2}年`,
                    value: currentYear + 2
                },
            ]
        })
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