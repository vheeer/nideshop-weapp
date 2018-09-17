// pages/ucenter/distribute/index/index.js
var util = require('../../../../utils/util.js');
var api = require('../../../../config/api.js');
var user = require('../../../../services/user.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    const that = this;
    this.setData(app.globalData);
    this.getDistributeDetail()
    .then(function (res) {
      if (res.errno === 0) {
        that.setData(res.data);
        if (!res.data.is_distributor) {
          wx.navigateTo({
            url: '../join/join'
          })
        }
        // return that.getCode(res.data.access_token)
      }
    })
    .then(res => {
      // console.log("二维码: ", res);
      
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onLoad: function () {
  
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

  bindgetuserinfo: function(res){
    const that = this;
    console.log("res: ", res);
    const { userInfo } = res.detail;
    app.globalData.userInfo = userInfo;
    user.loginByWeixin().then(res => {
      that.setData({
        userInfo: res.data.userInfo
      });
      app.globalData.token = res.data.token;
    }).catch((err) => {
      console.log(err)
    });
  },
  getDistributeDetail() {
    let that = this;
    util.request(api.DistributeList, {}, "GET")
    .then(res => {
      console.log("获取我的分销订单res ", res)
    });
    return util.request(api.DistributeDetail, {
      
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  tapItem(e) {
    console.log('type: ', e);
    wx.navigateTo({ url: e.currentTarget.dataset.page });
  },
  formSubmit: function (e) {
    console.log('申请分销商form发生了submit事件，携带数据为：', e.detail.value)
    const { real_name } = e.detail.value;
    if(real_name.length < 2)
      return wx.showToast({ title: "请输入名称" });
    util.request(api.DistributeApply, { real_name }, "POST")
    .then(function (res) {
      console.log("申请分销商 res: ", res);
      if(res.errno === 1){
        wx.showToast({ title: "申请中.." });
      }else{
        wx.showToast({ 
          title: "已提交", 
          success: res => {
            setTimeout(() => 
              wx.navigateBack({
                delta: 1
              }),1500)
          } 
        })
      }
    });
  },
})