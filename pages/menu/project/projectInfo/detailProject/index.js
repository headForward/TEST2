// pages/menu/project/projectInfo/detailProject/index.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        netStatus: '',
        detailList: {
            prn: 'ces',
            ex: '无',
            projectNo: '01',
            cn: '小黄',
            pro: '广东省',
            cy: '佛山市',
            dis: '顺德区',
            add: '龙江',
            acreage: '200',
            category: 'ces',
            startTimefmt: '2021-05-01',
            prt: 'ces',
            prg: '20%',
            prs: '进行中',
            depth: '中',
            prcfmt: '100',
            shipmentsfmt: '100',
            supplied: '50%',
            ba: 'ces',
            productDes: 'ces',
            occupancyRate: '50%',
            follower: 'ces',
            pra: {
                org: 'cs',
                contact: 'ccc',
                tel: '无',
            },
            prb: {
                org: 'cs',
                contact: 'ccc',
                tel: '无',
            },
            sup: {
                org: 'cs',
                contact: 'ccc',
                tel: '无',
            },
            des: {
                org: 'cs',
                contact: 'ccc',
                tel: '无',
            },
            supplier: {
                org: 'cs',
                contact: 'ccc',
                tel: '无',
            },
            pu: [{
                amount: '100',
                pricefmt: '1000',
                cycle: '4',
                remark: '无',
            }]
        },
        isReload: false,
        followList: [{
            cont: 'ces',
            ct: '2021-05-01',
            fer: 'ces'
        }],
        projectName: "",
        paramslist: [],
        gid: "1",
        isChanged: false,
        isRequest: false,
        child: false,
        urls: ['/images/wodekehu.png']
    },

    //添加跟进记录
    addFollowInfo() {
        wx.navigateTo({
            url: `./addDetail/index?gid=${this.data.gid}`
        })
    },
    //列表项详情
    getFollowDetail(e) {
        let i = e.currentTarget.dataset.index
        wx.navigateTo({
            url: `./projectDetail/index?idx=${i}`
        })
    },
    //删除
    handleDelete() {
        wx.showModal({
            title: '提示',
            content: '确认删除此工程信息？',
            success: (res) => {
                if (res.confirm) {
                    wx.showModal({
                        title: '提示',
                        content: '删除成功',
                        showCancel: false,
                        success: (res) => {
                            if (res.confirm) {
                                wx.navigateBack()
                            }
                        }
                    })
                } else {}
            }
        })
    },
    //编辑
    goEditProject() {
        wx.navigateTo({
            url: `../editProject/index?type=edit`,
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