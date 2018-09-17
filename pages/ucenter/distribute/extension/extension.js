// pages/ucenter/distribute/extension/extension.js
var util = require('../../../../utils/util.js');
var api = require('../../../../config/api.js');
var user = require('../../../../services/user.js');
const app = getApp();
const { title } = api;

// 获取显示区域长宽
const device = wx.getSystemInfoSync();
const W = device.windowWidth;
const H = device.windowHeight - 50;


const getImageInfo = src => new Promise((resolve, reject) => {
  wx.getImageInfo({
    src,
    success: res => {
      console.log("getImageInfo", res);
      return resolve(res);
    },
    fail: res => {
      console.log("getImageInfo", res);
      return reject(res);
    }
  })
});
const downloadFile = url => new Promise((resolve, reject) => {
  wx.downloadFile({
    url,
    success: res => resolve(res)
  })
});

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    const { code, share_background } = options;
    const data = this.data;
    console.log("app.globalData.userInfo.code", app.globalData.userInfo);
    // this.setData({ 
    //   code: app.globalData.userInfo.code,
    //   share_background: "https://www.yinmudianying.club/nideshop-mul/files/upload/images/826d921b-cdbb-4f93-874a-59acda7cb3c4.jpg"
    // })
    // this.data = Object(this.data, { 
    //   code: app.globalData.userInfo.code,
    //   share_background: "https://www.yinmudianying.club/nideshop-mul/files/upload/images/826d921b-cdbb-4f93-874a-59acda7cb3c4.jpg"
    // });
    this.draw(code, share_background);
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
   * 分享
   */
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '优选客联盟',
      path: '/pages/index/index?referee=' + wx.getStorageSync('userInfo').id
    }
  },
  imgtap: function (e) {
    console.log(e);
    let urls = [this.data.share_img_tmp];
    
    wx.previewImage({
      current: urls[0], // 当前显示图片的http链接
      urls // 需要预览的图片http链接列表
    })

    this.cut();
  },
  cut: function (event) {
    let that = this;
    console.log("event", event);
    wx.saveImageToPhotosAlbum({
      filePath: that.data.share_img_tmp,
      complete: function(res) {
        console.log("save img res: ", res);
      }
    })
  },
  draw: function (code, share_background) {
    const that = this;
    // 获取图片
    // const code = this.data.code;
    // const share_background = this.data.share_background;
    let share_temp_file_path;
    let code_temp_file_path;
    let share_size = {};
    let code_size = {};
    console.log("二维码URL-code", code);
    console.log("二维码背景-share_background", share_background);

    downloadFile(code)
      .then(({ tempFilePath }) => {
        code_temp_file_path = tempFilePath;
        console.log("二维码临时路径", code_temp_file_path);
        return getImageInfo(tempFilePath)
      }).then(size => {
        console.log("二维码尺寸", size);
        code_size = { ...code_size, ...size };
        return downloadFile(share_background);
      })
      .then(({ tempFilePath }) => {
        console.log("背景图临时路径", tempFilePath);
        share_temp_file_path = tempFilePath;
        return getImageInfo(tempFilePath);
      })
      .then(size => {
        console.log("背景图尺寸", size);
        share_size = {...share_size, ...size};
        
        console.log(share_temp_file_path);
        console.log(code_temp_file_path);
        console.log("width，height: ", { code_size, share_size })
        {
          var context = wx.createCanvasContext('canvas');

          // 二维码位置、尺寸（背景图宽的百分比）
          const left = 68;
          const top = 100;
          const width = 25;
          const height = 25;

          // 背景图
          const CW = W;
          const CH = share_size.height * W / share_size.width;
          this.setData({ canvasH: CH });
          context.drawImage(share_temp_file_path, 0, 0, share_size.width, share_size.height, 0, 0, CW, CH);

          console.log('屏宽', W);
          console.log('屏高', '');
          console.log('原图宽', share_size.width);
          console.log('原图高', share_size.height);
          console.log('图宽', CW);
          console.log('图高', CH);

          // 二维码图
          const w = W;
          const h = code_size.height * W / code_size.width;

          context.drawImage(code_temp_file_path, 0, 0, code_size.width, code_size.height, CW*(left/100), CW*(top/100), CW*(width/100), CW*(height/100));

          //二维码上文字
          context.setFontSize(30);
          context.setFillStyle('black');

          //绘制
          context.draw(false, function(){
            wx.canvasToTempFilePath({
              canvasId: 'canvas',
              fileType: 'jpg',
              quality: 1,
              success: function (res) {
                console.log("res", res);
                const { tempFilePath } = res;
                that.setData({
                  share_img_tmp: tempFilePath
                });
              }
            })
          })
        }
      })
      .catch(error => {
        console.log("画图错误error： ", error)
      });

  },
})