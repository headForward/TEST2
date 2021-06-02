let utils = {
    dateFormat: (fmt, date) => {
        date = new Date(date);
        let o = {
            "M+": date.getMonth() + 1, //月份   
            "d+": date.getDate(), //日   
            "h+": date.getHours(), //小时   
            "m+": date.getMinutes(), //分   
            "s+": date.getSeconds(), //秒   
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
            "S": date.getMilliseconds() //毫秒   
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (let k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    },
    // 将数字转换成金额显示
    currencyFormat: (num) => {
        num = typeof num == 'string' ? parseFloat(num) : num // 判断是否是字符串如果是字符串转成数字,去掉开头的0
        if (isNaN(num)) {
            result = '￥0.00'
            return result;
        }
        // num = num.toFixed(2); // 保留两位
        // console.log(num)
        // num = num.toLocaleString(); // 转成金额显示模式
        var m = num.toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/); //科学计数法转换
        num = num.toFixed(Math.max(0, (m[1] || '').length - m[2]));
        var result = '',
            point = '',
            counter = 0;
        let minus = false;
        num = (num || 0).toString();
        // 判断是否为负数
        if (num.indexOf('-') == 0) {
            num = num.split('-')[1]
            minus = true;
        } else if (num.indexOf('-') > 0) {
            result = '￥0.00'
            return result;
        }
        // 判断是否有小数
        if (num.indexOf('.') === -1) {
            point = '00'
        } else {
            point = num.split('.')[1]
            point = point.length < 2 ? point + '0' : point.slice(0, 2)
            num = num.split('.')[0]
        }
        for (var i = num.length - 1; i >= 0; i--) {
            counter++;
            result = num.charAt(i) + result;
            if (!(counter % 3) && i != 0) {
                result = ',' + result;
            }
        }
        result = minus ? '-￥' + result + '.' + point :'￥' + result + '.' + point
        return result;
    },
    // 生成UUID
    uuid:  () => {
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
          s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "-";
       
        var uuid = s.join("");
        return uuid
       
    },
    // 获取()月前日期
    getMonthTime: (date,interval) => {
        date = new Date(date)
        //  1    2    3    4    5    6    7    8    9   10    11   12月
        var daysInMonth = [0,31,28,31,30,31,30,31,31,30,31,30,31];
        var strYear = date.getFullYear();
        var strDay = date.getDate();
        var strMonth = date.getMonth()+1;
        //一、解决闰年平年的二月份天数   //平年28天、闰年29天//能被4整除且不能被100整除的为闰年,或能被100整除且能被400整除
        if (((strYear % 4) === 0) && ((strYear % 100)!==0) || ((strYear % 400)===0)){
            daysInMonth[2] = 29;
        }
        if(strMonth - interval <= 0) //二、解决跨年问题
        {
            strYear -= 1;
            strMonth = 12 + strMonth - interval;
        }else {
            strMonth -= interval;
        }
    //  strDay = daysInMonth[strMonth] >= strDay ? strDay : daysInMonth[strMonth];
        strDay = Math.min(strDay,daysInMonth[strMonth]);//三、前一个月日期不一定和今天同一号，例如3.31的前一个月日期是2.28；9.30前一个月日期是8.30
    
        if(strMonth<10)//给个位数的月、日补零
        {
            strMonth="0"+strMonth;
        }
        if(strDay<10)
        {
            strDay="0"+strDay;
        }
        var datastr = strYear+"/"+strMonth+"/"+strDay;
        return datastr;
    },
    getDateMinus: (oval, nval) => {
        return parseInt((new Date(nval).getTime()-new Date(oval).getTime())/(1000*24*60*60))+1
    }
}

export default utils