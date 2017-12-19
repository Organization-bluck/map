const util = require('../../utils/util.js');
Page({
  data: {
    hotCity: [],
    cityList: [],
    animationData: {},
    isActiveArr: [],
    arr: [],
    currentIndex:null
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
            isActiveArr
          })
          
        }
      }
    })
  },
  onMyEvent(e) {
    console.log(e.detail)
    this.setData({
      isShow: !e.detail
    })
  },
  selectItem(event) {
    var cid = event.currentTarget.dataset.id;
    var cIndex = event.currentTarget.dataset.index;
    this.setData({
      currentIndex: cIndex
    })
    this.data.isActiveArr[this.data.currentIndex] = !this.data.isActiveArr[this.data.currentIndex]

    console.log(this.data.isActiveArr)
    this.setData({
      isActiveArr: this.data.isActiveArr
    })
    var arr = this.data.arr;
    if (arr.length > 0) {
      // 判断是否在该数组中，有则删除，无则添加
      if (util.contains(arr, cid)) {
        // 删除当前元素在数组中
        util.removeByValue(arr,cid)
      } else {
        arr.push(cid)
      }
    } else {
      arr.push(cid);
    }
    // console.log(arr);
    wx.setStorageSync('selectdCity',arr)
  },
  // _contains(arr, obj) {
  //   var i = arr.length;
  //   while (i--) {
  //     if (arr[i] === obj) {
  //       return true;
  //     }
  //   }
  //   return false;
  // },
  // _removeByValue(arr, val) {
  //   for (var i = 0; i < arr.length; i++) {
  //     if (arr[i] == val) {
  //       arr.splice(i, 1);
  //       break;
  //     }
  //   }
  // }
})