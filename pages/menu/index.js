var app = getApp();
//Page Object
Page({
    /**
     * 页面的初始数据
     */
    data: {
        img: "/images/xiaoshoujihua.png",
        appList: [{
                name: "客户管理",
                contentList: [{
                        name: "我的客户",
                        imgsrc: "/images/wodekehu.png",
                        url: "/pages/menu/customer/myClients/index"
                    },
                    {
                        name: "潜在客户",
                        imgsrc: "/images/qianzaikehu.png",
                        url: "/pages/menu/customer/latentClient/index"
                    },
                    {
                        name: "客户拜访",
                        imgsrc: "/images/kehubaifang.png",
                        url: "/pages/menu/customer/visitClient/index"
                    },
                    {
                        name: "客户合同",
                        imgsrc: "/images/kehuhetong.png",
                        url: "/pages/menu/customer/contract/index"
                    }
                ]
            },
            {
                name: "销售管理",
                contentList: [{
                        name: "销售计划",
                        imgsrc: "/images/xiaoshoujihua.png",
                        url: "/pages/menu/sales/salesPlan/index"
                    },
                    {
                        name: "报价书",
                        imgsrc: "/images/baojiashu.png",
                        url: "/pages/menu/sales/offerLetter/index"
                    },
                    {
                        name: "我的任务",
                        imgsrc: "/images/woderenwu.png",
                        url: "/pages/menu/sales/task/index"
                    },
                ]
            },
            {
                name: "工程管理",
                contentList: [{
                        name: "工程项目",
                        imgsrc: "/images/gongchengxiangmu.png",
                        url: "/pages/menu/project/projectInfo/index"
                    },
                    {
                        name: "特价申请",
                        imgsrc: "/images/tejiashenqing.png",
                        url: "/pages/menu/project/discountApplication/index"
                    },
                    {
                        name: "特价核销",
                        imgsrc: "/images/tejiahexiao.png",
                        url: "/pages/menu/project/discountVerification/index"
                    }
                ]
            },
            {
                name: "费用管理",
                contentList: [{
                        name: "报销单",
                        imgsrc: "/images/baoxiaodan.png",
                        url: "/pages/menu/costManagement/reimbursement/index"
                    },
                    // {
                    //     name: "费用预算",
                    //     imgsrc: ""
                    // },
                    // {
                    //     name: "费用申请",
                    //     imgsrc: ""
                    // },
                    // {
                    //     name: "发票夹",
                    //     imgsrc: ""
                    // },
                    // {
                    //     name: "账本",
                    //     imgsrc: ""
                    // },
                    // {
                    //     name: "费用统计",
                    //     imgsrc: ""
                    // }
                ]
            }
        ]
    },
    // 函数
    methodsTest() {
        console.log(1)
    },


    //options(Object)
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

    },
    onPageScroll: function () {

    },
    //item(index,pagePath,text)
    onTabItemTap: function (item) {

    }
});