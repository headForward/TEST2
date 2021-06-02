// components/datePickerPopup/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        isShow:{
            type:Boolean,
            value:false
        },
        currentDate:{
            type:Number,
            value:new Date().getTime()
        },
        minDate:{
            type:Number,
            value:new Date().getTime(),
        },
        maxDate:{
            type:Number,
            value:new Date(2050,11,31).getTime(),
        },
        pickerType:{
            type:String,
            value:'year-month'
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        formatter(type, value) {
            if (type === 'year') {
                return `${value}年`;
            }
            if (type === 'month') {
                return `${value}月`;
            }
            if (type === 'day') {
                return `${value}日`;
            }
            return value;
        },
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onConfirm(e){
            this.triggerEvent('onConfirm',e.detail)
            this.setData({
                isShow: false
            })
        },
        onCancel() {
            this.setData({
                isShow: false
            })
        }
    }
})