// components/pickerPopup/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        isShow: {
            type: Boolean,
            value: false
        },
        columns: {
            type: Array,
            value: []
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onConfirm(e) {
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