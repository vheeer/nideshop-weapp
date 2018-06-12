var util = require('./utils/util.js');
var api = require('./config/api.js');
var user = require('./services/user.js');

function goLogin(){
  user.loginByWeixin().then(res => {
    // this.setData({
    //   userInfo: res.data.userInfo
    // });
    app.globalData.userInfo = res.data.userInfo;
    app.globalData.token = res.data.token;
  }).catch((err) => {
    console.log(err);
  });
}
App({
  onLaunch: function (options) {
      
      const { referee: referee_2 } = options.query; //分享好友的推荐人
      let referee_3; //发分享码的推荐人
      const scene = decodeURIComponent(options.scene); 
      console.log("scene: ", scene);
      if(scene.indexOf("vheeer") > -1){
        referee_3 = scene.split("_")[1];
      }else{
        referee_3 = null;
      }

      const referee_inter = referee_2 || referee_3 || 0;

      console.log("referee_2", referee_2);
      console.log("referee_3", referee_3);
      console.log("finally referee_inter", referee_inter);

    user.loginByWeixin().then(res => {
      this.globalData.userInfo = res.data.userInfo;
      this.globalData.token = res.data.token;

      const { id, referee: referee_old } = res.data.userInfo;
      console.log("referee_old", referee_old);
      // 如果是第一次登陆（referee是null）
      if (referee_old === null){
        util.request(api.SetReferee, {
          referee: referee_inter
        }, "POST")
        .then(function (res) {
          console.log("设置第一次登录的referee res: ", res);
        });

        
        wx.showToast({
          title: "第一次登陆"
        })
      }else{

      }

    }).catch((err) => {
      console.log(err);
    });
    Date.prototype.format = function(format) {
      var date = {
          "M+": this.getMonth() + 1,
          "d+": this.getDate(),
          "h+": this.getHours(),
          "m+": this.getMinutes(),
          "s+": this.getSeconds(),
          "q+": Math.floor((this.getMonth() + 3) / 3),
          "S+": this.getMilliseconds()
      };
      if (/(y+)/i.test(format)) {
          format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
      }
      for (var k in date) {
          if (new RegExp("(" + k + ")").test(format)) {
              format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
          }
      }
      return format;
    }
  },
  globalData: {
    userInfo: {
      nickname: 'Hi,游客',
      username: '点击去登录',
      avatar: 'http://yanxuan.nosdn.127.net/8945ae63d940cc42406c3f67019c5cb6.png'
    },
    token: '',
  }
})