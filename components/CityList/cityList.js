// components/CityList/cityList.js
const util = require('../../utils/util.js');
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    listData:{
      type:Object,
      value:{}
    },
  },
  ready(){
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: 'ease',
    })
    this.animation = animation;
   
    if (this.data.listData.city){
      var cityLength = this.data.listData.city;
      var isActiveArr = new Array(cityLength.length).fill(false)
      this.setData({
        isActiveArr
      })
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    animationData:{},
    isShow: true,
    isActiveArr: [],
    arr: [],
    currentIndex: null
  },  

  /**
   * 组件的方法列表
   */
  methods: {
    slideup(){
      this.setData({
        isShow:!this.data.isShow
      })
      // 动画
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
    selectItem(event) {
      var cid = event.currentTarget.dataset.id;
      var cIndex = event.currentTarget.dataset.index;

      this.setData({
        currentIndex: cIndex
      })
      
      this.data.isActiveArr[this.data.currentIndex] = !this.data.isActiveArr[this.data.currentIndex]
      // console.log(this.data.isActiveArr)
      this.setData({
        isActiveArr: this.data.isActiveArr
      })
      var arr = this.data.arr;
      let cityArr = wx.getStorageSync('__cityArr__') || [];
      if (cityArr.length > 0) {
        // 判断是否在该数组中，有则删除，无则添加
        if (util.contains(cityArr, cid)) {
          // 删除当前元素在数组中
          util.removeByValue(cityArr, cid)
        } else {
          cityArr.push(cid)
        }
      } else {
        cityArr.push(cid);
      }
      // console.log(arr);

      wx.setStorageSync('__cityArr__', cityArr)
    },
  }
})
