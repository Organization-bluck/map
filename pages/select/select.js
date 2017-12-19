
Page({
  data: {
    hotCity: [],
    cityList: [],
    animationData: {},
    isActive: false,
    arr: []
  },
  onLoad() {
    wx.request({
      url: 'https://www.yingshangyan.com/api/map/getAllCity',
      success: res => {
        if (res.data.code == 200) {
          console.log(res.data.data.hot_list)
          console.log(res.data.data.list)
          this.setData({
            hotCity: res.data.data.hot_list,
            cityList: res.data.data.list
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
    // console.log(event.currentTarget.dataset.index )
    var cindex = event.currentTarget.dataset.index;
    var arr = this.data.arr;

    arr.forEach(function (item) {
      if (item === cindex) {
        return this._remove(arr,item)
        
      }else{
        console.log(2222)
        arr.push(cindex)
      }
    })
    // arr.push(cindex)

    this.setData({
      arr: arr
    })
    // arr.forEach(function(item){
    //   if (item == cindex){
    //     return
    //   }else{
    //     arr.push(cindex)
    //   }
    // })
    console.log(this.data.arr)
    // this.setData({
    //   isActive: !this.data.isActive
    // })
  },
  _remove(arr, item) {
    var result = [];
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] != item) {
        result.push(arr[i]);
      }
    }
    return result;
  }
})