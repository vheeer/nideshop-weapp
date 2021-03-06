var app = getApp();
var WxParse = require('../../lib/wxParse/wxParse.js');
var util = require('../../utils/util.js');
var api = require('../../config/api.js');
const pay = require('../../services/pay.js');
const { title } = require('../../config/api.js');

Page({
  data: {
    id: 0,
    goods: {},
    gallery: [],
    attribute: [],
    issueList: [],
    comment: [],
    brand: {},
    specificationList: [],
    productList: [],
    relatedGoods: [],
    cartGoodsCount: 0,
    userHasCollect: 0,
    number: 1,
    checkedSpecText: '请选择规格数量',
    openAttr: false,
    noCollectImage: "/static/images/icon_collect.png",
    hasCollectImage: "/static/images/icon_collect_checked.png",
    collectBackImage: "/static/images/icon_collect.png",
    others: app.globalData.others,
    postscript: "",
    swiperAutoPlay: true
  },
  getGoodsInfo: function () {
    let that = this;
    util.request(api.GoodsDetail, { id: that.data.id }).then(function (res) {
      if (res.errno === 0) {
        // 获取、添加轮播图格式
        res.data.gallery = res.data.gallery.map(item => {
          const type = item.img_url.split('.').pop();
          return { type, ...item }
        });

        that.setData({
          goods: res.data.info,
          gallery: res.data.gallery,
          attribute: res.data.attribute,
          issueList: res.data.issue,
          comment: res.data.comment,
          brand: res.data.brand,
          specificationList: res.data.specificationList,
          productList: res.data.productList,
          userHasCollect: res.data.userHasCollect,
          others: app.globalData.others
        });
        
        // 运费
        const { is_free_delivery, freight: goods_freight, retail_price } = res.data.info;
        let freightPrice;
        if(is_free_delivery === 1){
          freightPrice = 0;
        }else{
          const { freight } = app.globalData.others[0];
          if(typeof goods_freight === "number"){
            freightPrice = goods_freight;
          }else{
            freightPrice = freight;
          }
        }
        // 默认商品价格
        const default_price_text = parseFloat((retail_price + freightPrice).toFixed(2));

        that.setData({
          freightPrice,
          default_price_text
        });

        if (res.data.userHasCollect == 1) {
          that.setData({
            'collectBackImage': that.data.hasCollectImage
          });
        } else {
          that.setData({
            'collectBackImage': that.data.noCollectImage
          });
        }

        WxParse.wxParse('goodsDetail', 'html', res.data.info.goods_desc, that);

        that.getGoodsRelated();
      }
    });

  },
  getGoodsRelated: function () {
    let that = this;
    util.request(api.GoodsRelated, { id: that.data.id }).then(function (res) {
      if (res.errno === 0) {
        that.setData({
          relatedGoods: res.data.goodsList,
        });
      }
    });

  },
  clickSkuValue: function (event) {
    let that = this;
    let specNameId = event.currentTarget.dataset.nameId;
    let specValueId = event.currentTarget.dataset.valueId;

    //判断是否可以点击

    //TODO 性能优化，可在wx:for中添加index，可以直接获取点击的属性名和属性值，不用循环
    let _specificationList = this.data.specificationList;
    for (let i = 0; i < _specificationList.length; i++) {
      if (_specificationList[i].specification_id == specNameId) {
        for (let j = 0; j < _specificationList[i].valueList.length; j++) {
          if (_specificationList[i].valueList[j].id == specValueId) {
            //如果已经选中，则反选
            if (_specificationList[i].valueList[j].checked) {
              _specificationList[i].valueList[j].checked = false;
            } else {
              _specificationList[i].valueList[j].checked = true;
            }
          } else {
            _specificationList[i].valueList[j].checked = false;
          }
        }
      }
    }
    this.setData({
      'specificationList': _specificationList
    },this.changeSpecInfo());//重新计算spec改变后的信息
    
    

    //重新计算哪些值不可以点击
  },

  //获取选中的规格信息
  getCheckedSpecValue: function () {
    let checkedValues = [];
    let _specificationList = this.data.specificationList;
    for (let i = 0; i < _specificationList.length; i++) {
      let _checkedObj = {
        nameId: _specificationList[i].specification_id,
        valueId: 0,
        valueText: ''
      };
      for (let j = 0; j < _specificationList[i].valueList.length; j++) {
        if (_specificationList[i].valueList[j].checked) {
          _checkedObj.valueId = _specificationList[i].valueList[j].id;
          _checkedObj.valueText = _specificationList[i].valueList[j].value;
        }
      }
      checkedValues.push(_checkedObj);
    }

    return checkedValues;

  },
  //根据已选的值，计算其它值的状态
  setSpecValueStatus: function () {

  },
  //判断规格是否选择完整
  isCheckedAllSpec: function () {
    return !this.getCheckedSpecValue().some(function (v) {
      if (v.valueId == 0) {
        return true;
      }
    });
  },
  getCheckedSpecKey: function () {
    let checkedValue = this.getCheckedSpecValue().map(function (v) {
      return v.valueId;
    });

    return checkedValue.join('_');
  },
  changeSpecInfo: function () {
    let checkedNameValue = this.getCheckedSpecValue();
    console.log("修改规格信息： ", checkedNameValue);
    const valueIds = [];
    const valueTexts = [];
    //设置选择的信息
    checkedNameValue.filter(function (v) {
      if (v.valueId != 0) {
        return true;
      } else {
        return false;
      }
    }).forEach(function (v) {
      valueIds.push(v.valueId);
      valueTexts.push(v.valueText);
    });

    //根据选中的规格，判断是否有对应的sku信息
    const checkedSpecKey = this.getCheckedSpecKey();
    console.log("选中的key", checkedSpecKey);
    let checkedProduct = this.getCheckedProductItem(checkedSpecKey);
    console.log("选中的产品", checkedProduct);
    //计算价格
    let product_price;
    if(checkedProduct.length > 0)
      product_price = parseFloat((this.data.freightPrice + checkedProduct[0].retail_price).toFixed(2));
    else
      product_price = null;
    if (valueTexts.length > 0) {
      this.setData({
        checkedProduct,
        product_price,
        checkedSpecText: valueTexts.join('　'),
        checkedSpecIds: valueIds
      });
    } else {
      this.setData({
        checkedProduct,
        product_price,
        checkedSpecText: '请选择规格数量'
      });
    }

  },
  getCheckedProductItem: function (key) {
    return this.data.productList.filter(function (v) {
      if (v.goods_specification_ids == key) {
        return true;
      } else {
        return false;
      }
    });
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.data.id = parseInt(options.id);
    this.data.quickPayAdressId = parseInt(options.quickPayAdressId);
    var that = this;
    this.getGoodsInfo();
    util.request(api.CartGoodsCount).then(function (res) {
      if (res.errno === 0) {
        that.setData({
          cartGoodsCount: res.data.cartTotal.goodsCount
        });

      }
    });
  },
  onReady: function () {
    // 页面渲染完成

  },
  onShow: function () {
    // 页面显示

  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭

  },
  switchAttrPop: function () {
    if (this.data.openAttr == false) {
      this.setData({
        openAttr: !this.data.openAttr,
        collectBackImage: "/static/images/detail_back.png"
      });
    }
  },
  closeAttrOrCollect: function () {
    let that = this;
    if (this.data.openAttr) {
      this.setData({
        openAttr: false,
      });
      if (that.data.userHasCollect == 1) {
        that.setData({
          'collectBackImage': that.data.hasCollectImage
        });
      } else {
        that.setData({
          'collectBackImage': that.data.noCollectImage
        });
      }
    } else {
      //添加或是取消收藏
      util.request(api.CollectAddOrDelete, { typeId: 0, valueId: this.data.id }, "POST")
        .then(function (res) {
          let _res = res;
          if (_res.errno == 0) {
            if ( _res.data.type == 'add') {
              that.setData({
                'collectBackImage': that.data.hasCollectImage
              });
            } else {
              that.setData({
                'collectBackImage': that.data.noCollectImage
              });
            }

          } else {
            wx.showToast({
              image: '/static/images/icon_error.png',
              title: _res.errmsg,
              mask: true
            });
          }

        });
    }

  },
  openCartPage: function () {
    wx.switchTab({
      url: '/pages/cart/cart',
    });
  },
  buyNow: function() {
    var that = this;
    if (this.data.openAttr == false) {
      //打开规格选择窗口
      this.setData({
        openAttr: !this.data.openAttr,
        collectBackImage: "/static/images/detail_back.png"
      });
    } else {
      function wxShowModal(content){
        wx.showModal({
          title: "提示",
          content,
          showCancel: false
        });
      }
      //提示选择完整规格
      if (!this.isCheckedAllSpec()) {
        console.log("请选择完整规格");
        wxShowModal("请选择完整规格");
        return false;
      }

      //根据选中的规格，判断是否有对应的sku信息
      const checkedSpecKey = this.getCheckedSpecKey();
      console.log("选中的key", checkedSpecKey);
      let checkedProduct = this.getCheckedProductItem(checkedSpecKey);
      console.log("选中的产品", checkedProduct);
      if (!checkedProduct || checkedProduct.length <= 0) {
        //找不到对应的product信息，提示没有库存
        wxShowModal("没有相应产品信息");
        return false;
      }

      //验证库存
      if (checkedProduct.goods_number < this.data.number) {
        //找不到对应的product信息，提示没有库存
        wxShowModal("没有库存");
        return false;
      }

      console.log("this.data.number", this.data.number)
      wx.redirectTo({
        url: '/pages/shopping/address/address?quickPayGoodsId=' + that.data.id + "&quickPayProductId=" + checkedProduct[0].id + "&quickPaynumber=" + this.data.number + "&quickPayPostscript=" + this.data.postscript
      });
    }
  },
  addToCart: function () {
    var that = this;
    if (this.data.openAttr == false) {
      //打开规格选择窗口
      this.setData({
        openAttr: !this.data.openAttr,
        collectBackImage: "/static/images/detail_back.png"
      });
    } else {

      //提示选择完整规格
      if (!this.isCheckedAllSpec()) {
        return false;
      }

      //根据选中的规格，判断是否有对应的sku信息
      let checkedProduct = this.getCheckedProductItem(this.getCheckedSpecKey());
      if (!checkedProduct || checkedProduct.length <= 0) {
        //找不到对应的product信息，提示没有库存
        return false;
      }

      //验证库存
      if (checkedProduct.goods_number < this.data.number) {
        //找不到对应的product信息，提示没有库存
        return false;
      }

      //添加到购物车
      util.request(api.CartAdd, { goodsId: this.data.goods.id, number: this.data.number, productId: checkedProduct[0].id }, "POST")
        .then(function (res) {
          let _res = res;
          if (_res.errno == 0) {
            wx.showModal({
              title: '提示',
              content: '已加入购物车',
              showCancel: false,
              success: function(res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
            that.setData({
              openAttr: !that.data.openAttr,
              cartGoodsCount: _res.data.cartTotal.goodsCount
            });
            if (that.data.userHasCollect == 1) {
              that.setData({
                'collectBackImage': that.data.hasCollectImage
              });
            } else {
              that.setData({
                'collectBackImage': that.data.noCollectImage
              });
            }
          } else {
            wx.showToast({
              image: '/static/images/icon_error.png',
              title: _res.errmsg,
              mask: true
            });
          }

        });
    }

  },
  selectAddress() {
    wx.navigateTo({
      url: '/pages/shopping/address/address',
    })
  },
  addAddress() {
    wx.navigateTo({
      url: '/pages/shopping/addressAdd/addressAdd',
    })
  },
  cutNumber: function () {
    this.setData({
      number: (this.data.number - 1 > 1) ? this.data.number - 1 : 1
    });
  },
  addNumber: function () {
    this.setData({
      number: this.data.number + 1
    });
  },
  postchange: function(e) {
    console.log(e);
    const { value: postscript } = e.detail;
    this.setData({
      postscript
    });
  },
  vplay: function(e) {
    this.setData({
      swiperAutoPlay: false
    });
  },
  onShareAppMessage: function (res) {
    const { goods } = this.data;
    return {
      path: "/pages/index/index"
    }
  }
})