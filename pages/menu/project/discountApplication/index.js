// pages/menu/project/discountApplication/index.js
import constant from "../../../../public/constant"
var app = getApp();
let typeData = [{
        name: '钢塑管，新',
        editUrl: 'editPSP',
        detailUrl: 'detailPSP'
    },
    {
        name: '集成供暖',
        editUrl: 'editInfo2',
        detailUrl: 'detailHeating'
    },
    {
        name: '整体门窗',
        editUrl: 'editInfo2',
        detailUrl: 'detailDoor'
    },
    {
        name: '水暖卫浴、家装',
        editUrl: 'editInfo2',
        detailUrl: 'detailSNJZ'
    },
    {
        name: '领尚电器',
        editUrl: 'editLS',
        detailUrl: 'detailLS'
    },
    {
        name: '塑胶管道，华南区',
        editUrl: 'editPEPipe',
        detailUrl: 'detailPEPipeHN'
    },
    {
        name: '塑胶管道，非华南区',
        editUrl: 'editInfo',
        detailUrl: 'detailPEPipeFHN'
    },
    {
        name: '整体厨房',
        editUrl: 'editInfo',
        detailUrl: 'detailKitchen'
    },
    {
        name: '板材',
        editUrl: 'editInfo',
        detailUrl: 'detailBC'
    },
    {
        name: '燃气',
        editUrl: 'editGas',
        detailUrl: 'detailGas'
    },
    {
        name: '益高产品',
        editUrl: 'editYG',
        detailUrl: 'detailYG'
    },
];
Page({

    /**
     * 页面的初始数据
     */
    data: {
        searchVal: '',
        list: [{
            a: [{
                requestName: 'ces',
                requestId: 1,
                workflowBaseInfo: {
                    workflowName: 'BC',
                },
                status: '无',
                lastOperatorName: 'cess',
                lastOperateTime: '2021-05-27',
            }, {
                requestName: 'ces',
                requestId: 1,
                workflowBaseInfo: {
                    workflowName: 'Door',
                },
                status: '无',
                lastOperatorName: 'cess',
                lastOperateTime: '2021-05-27',
            }]
        }],
        page: 0,
        pageSize: 15,
        isSortShow: false,
        isfilterShow: false,
        // 筛选项
        screen: [{
                title: '状态',
                content: ['不限', '提出申请', '归档']
            },
            {
                title: '类型',
                content: ['不限']
            },
            // {
            //     title: '时间范围',
            //     content: ['近一个月', '近三个月', '近半年', '近一年']
            // },
            // {
            //     title: '自定义时间查询',
            //     content: ['开始时间--结束时间']
            // }
        ],
        selecteds: [
            [1],
            [1],
            // []
        ],
        oldsel: [
            [1],
            [1],
            // []
        ],
        sortlist: ['时间升序', '时间降序'],
        sort: 0,
        status: '',
        type: Number,
        newstatus: '',
        newtype: Number,
        // minDate: new Date(currentYear-1, 0, 1).getTime(),
        // maxDate: new Date(currentYear + 1, 11, 31).getTime(),
        // currDate: [curDate.getTime()],
        // beginTime: beginDate[0],
        // endTime: endTime,
        // isCalendarShow: false,
        isReload: false, // 是否是下拉刷新
        isChanged: false, // 列表新增or删除
        isEdited: false, // 列表项修改
        curpg: 0, // 当前点击项的page
        loadMore: true, // 加载更多
        isRequest: false,
        child: false,
        netStatus: '',
        preventCtrl: false
    },

    filterShow() {
        // if (this.data.isCalendarShow) {
        //     this.setData({
        //         isCalendarShow: false
        //     })
        // } else {
        if (!this.data.preventCtrl) {
            this.setData({
                selecteds: JSON.parse(JSON.stringify(this.data.oldsel)),
                newtype: this.data.type,
                newstatus: this.data.status,
                isfilterShow: !this.data.isfilterShow,
                isSortShow: false
            })
        }
        // }
    },
    handleFilter() {
        this.setData({
            type: this.data.newtype,
            status: this.data.newstatus,
            oldsel: JSON.parse(JSON.stringify(this.data.selecteds)),
            page: 0,
            isfilterShow: false,
            loadMore: true
        })
    },
    btnClick(e) {
        let index = e.target.dataset.index,
            num = e.target.dataset.i,
            str = `selecteds[${index}][${num}]`,
            filter = index ? 'newtype' : 'newstatus'
        this.setData({
            [`selecteds[${index}]`]: [],
            [str]: 1,
            [filter]: num ? (index ? typeList[num - 1].workflowid : e.target.dataset.content) : '',
        })
    },
    handleReset() {
        this.setData({
            selecteds: [
                [1],
                [1],
                // []
            ],
            newstatus: '',
            newtype: Number
        })
    },
    goDetail(e) {
        console.log(e.target.dataset.type);
        // return
        wx.navigateTo({
            url: `./detailPage/${'detail'+ e.target.dataset.type}/index?gid=${e.target.dataset.gid}`
            // url: `./detailPage/${this.getUrl(this.getParenthesesStr(e.target.dataset.type), 'detail')}/index?gid=${e.target.dataset.gid}`
        });
    },
    // 获取对应的url
    getUrl(val, type) {
        let url = '';
        typeData.forEach(ele => {
            if (ele.name == val) {
                url = ele[type + 'Url']
            }
        })
        return url
    },
    // 取括号中间的字符串
    getParenthesesStr(text) {
        let result = ''
        let regex = /\((.+?)\)/g;
        let option = text.match(regex)
        if (option) {
            result = option.substring(1, option.length - 1)
            result = option.substring(1, option.length - 1)
            result = option.substring(1, option.length - 1)
        }
        return result
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