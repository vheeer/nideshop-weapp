// pages/ucenter/distribute/cash/cash.js
var api = require('../../../../config/api.js');
var util = require('../../../../utils/util.js');
var user = require('../../../../services/user.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}
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
    const that = this;
    user.loginByWeixin().then(res => {
      that.setData({
        userInfo: res.data.userInfo
      });
      app.globalData.token = res.data.token;
    }).catch((err) => {
      console.log(err)
    });
  },

  getUserInfo: function() {

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
  withDraw: function(e) {
    const _this = this;
    console.log('提现form发生了submit事件，携带数据为：', e.detail.value)
    const { real_name, amount } = e.detail.value;
    if (amount % 1 !== 0) {
      wx.showModal({
        title: '提示',
        content: '请输入整数',
        showCancel: false,
        success: function(res) {
          
        }
      })
      return false
    }
    const max_amount = 100;
    if (amount > max_amount) {
      wx.showModal({
        title: '提示',
        content: '单次提现金额应小于' + max_amount + '元', 
        showCancel: false,
        success: function(res) {
          
        }
      })
      return false
    }
    const parseAmount = amount * 100;

    util.request(api.DistributeWithdraw, { real_name, amount: parseAmount }, "POST")
    .then(function (res) {
      console.log("提现res: ", res);
      if (res.errno === 0) {
        wx.showModal({
          title: '提示',
          content: '您已经成功提现' + amount + '元',
          showCancel: false,
          success: function(res) {
            _this.onShow()
          }
        })
      } else {
        wx.showModal({
          title: '提示',
          content: res.errmsg,
          showCancel: false,
          success: function(res) {
            _this.onShow()
          }
        })
      }
    });
  }
})