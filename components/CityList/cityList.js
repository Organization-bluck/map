// components/CityList/cityList.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    dataList:{
      type:Array,
      value:[]
    }
  },
  ready(){
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: 'ease',
    })
    this.animation = animation;
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShow:true,
    animationData:{}
  },  

  /**
   * 组件的方法列表
   */
  methods: {
    slideup(){
      this.setData({
        isShow:!this.data.isShow
      })
      if (!this.data.isShow){
        this.animation.rotate(0).step()
      }else{
        this.animation.rotate(90).step()
      }
      this.setData({
        //输出动画
        animationData: this.animation.export()
      })
    },
  }
})
