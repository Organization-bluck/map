const util = require('../../utils/util.js');
const app = getApp();
Page({
  data: {
    hotCity: [],
    cityList: [],
    animationData: {},
    isActiveArr: [],
    arr: [],
    currentIndex:null,
    hiddenLoading:false,
  },
  onReady() {
    //获得dialog组件
    this.dialog = this.selectComponent("#dialog");
  },
  onLoad() {
    wx.request({
      url: 'https://www.yingshangyan.com/api/map/getAllCity',
      success: res => {
        if (res.data.code == 200) {
          console.log(res.data.data.hot_list)
          console.log(res.data.data.list)
          var isActiveArr = new Array(res.data.data.hot_list.length).fill(false)
          this.setData({
            hotCity: res.data.data.hot_list,
            cityList: res.data.data.list,
            isActiveArr,
            hiddenLoading:true
          })
          
        }
      }
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
        util.removeByValue(cityArr,cid)
      } else {
        cityArr.push(cid)
      }
    } else {
      cityArr.push(cid);
    }
    // console.log(arr);
    
    wx.setStorageSync('__cityArr__', cityArr )
  },
  subfn(){
    this.dialog.showDialog();
  },
  //取消事件
  _cancelEvent() {
    console.log('你点击了取消');
    this.dialog.hideDialog();
  },
  //确认事件
  _confirmEvent() {
    console.log('你点击了确定');
    //打印热门城市的选项
    console.log(wx.getStorageSync('__cityArr__'));
    let params = wx.getStorageSync('__cityArr__');
    let userid = app.globalData.userId
    wx.request({
      url: 'https://www.yingshangyan.com/api/Map/updateUserCity',
      data:{
        user_id: app.globalData.userId,
        city_id: params
      },
      success(res){
        console.log(res)
      }
    })
    wx.navigateTo({
      url: `../result/result?user_id=${userid}`,
    })
    //打印其他城市
    // ..
    this.dialog.hideDialog();
  }
})