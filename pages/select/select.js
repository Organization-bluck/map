
Page({
  data: {
    hotCity:[],
    cityList:[],
    animationData:{}
  },
  onLoad(){
    wx.request({
      url: 'https://www.yingshangyan.com/api/map/getAllCity',
      success:res =>{
        if(res.data.code == 200){
          console.log(res.data.data.hot_list)
          this.setData({
            hotCity: res.data.data.hot_list,
            cityList: res.data.data.list
          })
        }
      }
    })
  },
  onShow() {
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })
    this.animation = animation

    
  },
  rotate: function () {
    //顺时针旋转10度
    //
    this.animation.rotate(150).step()
    this.setData({
      //输出动画
      animationData: this.animation.export()
    })
  },
  
})