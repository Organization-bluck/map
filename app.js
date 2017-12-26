//app.js
App({
  onLaunch: function () {

    // 登录
    var that = this;
    wx.checkSession({
      success: function () {
        //session 未过期，并且在本生命周期一直有效
      },
      fail: function () {
        //登录态过期
        //重新登录
        wx.login({
          success: res => {
            wx.request({
              url: 'https://www.yingshangyan.com/wxapi/login',
              header: {
                'content-type': 'application/json'
              },
              data: {
                code: res.code
              },
              success(res) {
                // wx.setStorageSync('__userid__', userid)
                console.log(res.data)
              }
            })
            // wx.getUserInfo({
            //     success: function (userResult) {
            //         // 发送 res.code 到后台换取 openId, sessionKey, unionId
            //         if (res.code) {
            //             //发起网络请求
            //             var header = {};

            //             header['X-WX-Code'] = res.code;
            //             header['X-WX-Encrypted-Data'] = userResult.encryptedData;
            //             header['X-WX-IV'] = userResult.iv;
            //             wx.request({
            //                 url: 'https://www.yingshangyan.com/wxapi/login',
            //                 header: header,
            //                 data: {
            //                     code: res.code
            //                 },
            //                 success(res){
            //                   var userid = res.data.data.userinfo
            //                   wx.setStorageSync('__userid__', userid)
            //                   //console.log(res.data.data.userinfo)
            //                 }
            //             })
            //         } else {
            //             console.log('获取用户登录态失败！' + res.errMsg)
            //         }
            //     },

            //     fail: function (userError) {
            //         console.log('ERR_WX_GET_USER_INFO', '获取微信用户信息失败，请检查网络状态');
            //     },
            // });

          }
        })
      }
    })
   
  },
  globalData: {
    userInfo: null
  }
})