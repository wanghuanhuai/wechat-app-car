const TOOLS = require('../../utils/tools.js')
const AUTH = require('../../utils/auth.js')
const config = require('../../utils/config')
const baseUrl = config.baseUrl;    //基准路径
import request from '../../utils/request.js';

//获取应用实例
var app = getApp()
Page({
  data: {
    loadingHidden: false, // loading
    parkCount:0,
    myMessageCount:0,
    //开发
    // imageList:[{
    //   imageId:'5ea25200231721299ccd5ac6',
    //   imageMaxId:'5ea2525f231721299ccd5acb'
    // },{
    //   imageId: '5ea2526d231721299ccd5ada',
    //   imageMaxId: '5ea2527a231721299ccd5ae0',
    // }],
    //正式
    imageList: [{
      imageId: 'swipe_1.png',
      imageMaxId: 'swipe_1_max.jpg'
    }, {
        imageId: 'swipe_2.png',
        imageMaxId: 'swipe_2_max.png',
    }],
    imageUrl: baseUrl + '/image/static/swipe/',
  },
  tapBanner: function(e) {
    const url = e.currentTarget.dataset.url
    if (url) {
      wx.navigateTo({
        url
      })
    }
  },
  adClick: function(e) {
    const url = e.currentTarget.dataset.url
    if (url) {
      wx.navigateTo({
        url
      })
    }
  },
  bindTypeTap: function(e) {
    this.setData({
      selectCurrent: e.index
    })
  },
  onShow: function () {
      this.getCount();
  },
  onLoad: function(e) {
    wx.showShareMenu({
      withShareTicket: true
    })    
  },
  onPageScroll(e) {
    let scrollTop = this.data.scrollTop
    this.setData({
      scrollTop: e.scrollTop
    })
  },
  onReachBottom: function() {
  },
  onPullDownRefresh: function() {
    this.getCount();

  },
  bindinput(e) {
    this.setData({
      inputVal: e.detail.value
    })
  },
  bindconfirm(e) {
    this.setData({
      inputVal: e.detail.value
    })
    wx.navigateTo({
      url: '/pages/park/list?searchName=' + this.data.inputVal,
    })
  },
  goSearch() {
    wx.navigateTo({
      url: '/pages/park/list?searchName=' + this.data.inputVal,
    })
  },
  getCount(){
    AUTH.checkHasLogined().then(data => {
      if (data){
        request(null, '/wx/v1/index/count', null, 'GET').then(data=>{
          if(data){
            if (data.result == 'ok') {
              this.setData({
                parkCount: data.data.parkCount,
                myMessageCount: data.data.myMessageCount,
              })

            }
          }
        })
      }
    })

  },
  onNotice(e){
    wx.navigateTo({
      url: '../notice/show',
    })
  }
})