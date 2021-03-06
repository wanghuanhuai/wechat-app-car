const WXAPI = require('apifm-wxapi')

// 显示购物车tabBar的Badge
function showTabBarBadge(){
  const token = wx.getStorageSync('token')
  if (!token) {
    return
  }
  WXAPI.shippingCarInfo(token).then(res => {
    if (res.code == 700) {
      wx.removeTabBarBadge({
        index: 2
      });
    }
    if (res.code == 0) {
      if (res.data.number == 0) {
        wx.removeTabBarBadge({
          index: 2
        });
      } else {
        wx.setTabBarBadge({
          index: 2,
          text: `${res.data.number}`
        });
      }
    }
  })
}

function diaplayTime(time) {
  var result;
  var minute = 1000 * 60;
  var hour = minute * 60;
  var day = hour * 24;
  var halfamonth = day * 15;
  var month = day * 30;
  var now = getDate();
  console.log('now', now);
  var curTime = getDate(parseInt(dateTimeStamp) * 1000); //后端返回的是秒数
  //console.log('curTime',curTime);
  var diffValue = now - curTime;
  //console.log('dateTimeStamp',dateTimeStamp);
  //console.log('diffValue',diffValue);
  if (diffValue < 0) {
    return;
  }
  var monthC = diffValue / month;
  var weekC = diffValue / (7 * day);
  var dayC = diffValue / day;
  var hourC = diffValue / hour;
  var minC = diffValue / minute;
  if (monthC >= 1) {
    if (monthC <= 12)
      result = "" + parseInt(monthC) + "月前";
    else {
      result = "" + parseInt(monthC / 12) + "年前";
    }
  }
  else if (weekC >= 1) {
    result = "" + parseInt(weekC) + "周前";
  }
  else if (dayC >= 1) {
    result = "" + parseInt(dayC) + "天前";
  }
  else if (hourC >= 1) {
    result = "" + parseInt(hourC) + "小时前";
  }
  else if (minC >= 1) {
    result = "" + parseInt(minC) + "分钟前";
  } else {
    result = "刚刚";
  }

  return result;
}

module.exports = {
  showTabBarBadge: showTabBarBadge,
  diaplayTime: diaplayTime
}