// const ApiRootUrl = 'http://127.0.0.1:8360/api/';
const ApiRootUrl = 'https://www.yinmudianying.club/nideshop-mul-dev/api/';
const mch = "jiaju";
const title = "";
const shop_type = 2;
module.exports = {
  title,
  shop_type,
  IndexUrl: ApiRootUrl + 'index/index?mch=' + mch, //首页数据接口

  CatalogList: ApiRootUrl + 'catalog/index?mch=' + mch,  //分类目录全部分类数据接口
  CatalogCurrent: ApiRootUrl + 'catalog/current?mch=' + mch,  //分类目录当前分类数据接口

  AuthLoginByWeixin: ApiRootUrl + 'auth/loginByWeixin?mch=' + mch, //微信登录

  GoodsCount: ApiRootUrl + 'goods/count?mch=' + mch,  //统计商品总数
  GoodsList: ApiRootUrl + 'goods/list?mch=' + mch,  //获得商品列表
  GoodsCategory: ApiRootUrl + 'goods/category?mch=' + mch,  //获得分类数据
  GoodsDetail: ApiRootUrl + 'goods/detail?mch=' + mch,  //获得商品的详情
  GoodsNew: ApiRootUrl + 'goods/new?mch=' + mch,  //新品
  GoodsHot: ApiRootUrl + 'goods/hot?mch=' + mch,  //热门
  GoodsRelated: ApiRootUrl + 'goods/related?mch=' + mch,  //商品详情页的关联商品（大家都在看）

  BrandList: ApiRootUrl + 'brand/list?mch=' + mch,  //品牌列表
  BrandDetail: ApiRootUrl + 'brand/detail?mch=' + mch,  //品牌详情

  CartList: ApiRootUrl + 'cart/index?mch=' + mch, //获取购物车的数据
  CartAdd: ApiRootUrl + 'cart/add?mch=' + mch, // 添加商品到购物车
  CartUpdate: ApiRootUrl + 'cart/update?mch=' + mch, // 更新购物车的商品
  CartDelete: ApiRootUrl + 'cart/delete?mch=' + mch, // 删除购物车的商品
  CartChecked: ApiRootUrl + 'cart/checked?mch=' + mch, // 选择或取消选择商品
  CartGoodsCount: ApiRootUrl + 'cart/goodscount?mch=' + mch, // 获取购物车商品件数
  CartCheckout: ApiRootUrl + 'cart/checkout?mch=' + mch, // 下单前信息确认

  OrderSubmit: ApiRootUrl + 'order/submit?mch=' + mch, // 提交订单
  OrderQuickbuy: ApiRootUrl + 'order/quickbuy?mch=' + mch, // 直接购买提交订单

  PayPrepayId: ApiRootUrl + 'pay/prepay?mch=' + mch, //获取微信统一下单prepay_id

  CollectList: ApiRootUrl + 'collect/list?mch=' + mch,  //收藏列表
  CollectAddOrDelete: ApiRootUrl + 'collect/addordelete?mch=' + mch,  //添加或取消收藏

  CommentList: ApiRootUrl + 'comment/list?mch=' + mch,  //评论列表
  CommentCount: ApiRootUrl + 'comment/count?mch=' + mch,  //评论总数
  CommentPost: ApiRootUrl + 'comment/post?mch=' + mch,   //发表评论

  TopicList: ApiRootUrl + 'topic/list?mch=' + mch,  //专题列表
  TopicDetail: ApiRootUrl + 'topic/detail?mch=' + mch,  //专题详情
  TopicRelated: ApiRootUrl + 'topic/related?mch=' + mch,  //相关专题

  SearchIndex: ApiRootUrl + 'search/index?mch=' + mch,  //搜索页面数据
  SearchResult: ApiRootUrl + 'search/result?mch=' + mch,  //搜索数据
  SearchHelper: ApiRootUrl + 'search/helper?mch=' + mch,  //搜索帮助
  SearchClearHistory: ApiRootUrl + 'search/clearhistory?mch=' + mch,  //搜索帮助

  AddressList: ApiRootUrl + 'address/list?mch=' + mch,  //收货地址列表
  AddressDetail: ApiRootUrl + 'address/detail?mch=' + mch,  //收货地址详情
  AddressSave: ApiRootUrl + 'address/save?mch=' + mch,  //保存收货地址
  AddressDelete: ApiRootUrl + 'address/delete?mch=' + mch,  //保存收货地址

  RegionList: ApiRootUrl + 'region/list?mch=' + mch,  //获取区域列表

  OrderList: ApiRootUrl + 'order/list?mch=' + mch,  //订单列表
  OrderDetail: ApiRootUrl + 'order/detail?mch=' + mch,  //订单详情
  OrderCancel: ApiRootUrl + 'order/cancel?mch=' + mch,  //取消订单
  OrderExpress: ApiRootUrl + 'order/express?mch=' + mch, //物流详情
  OrderRefund: ApiRootUrl + 'order/refund?mch=' + mch, //退款
  OrderConfirm: ApiRootUrl + 'order/confirm?mch=' + mch, //确认收货
  
  FootprintList: ApiRootUrl + 'footprint/list?mch=' + mch,  //足迹列表
  FootprintDelete: ApiRootUrl + 'footprint/delete?mch=' + mch,  //删除足迹

  DistributeDetail: ApiRootUrl + 'distribute/detail?mch=' + mch, //详情
  DistributeWithdraw: ApiRootUrl + 'distribute/withdraw?mch=' + mch, //提现操作
  DistributeWithdrawList: ApiRootUrl + 'cash/list?mch=' + mch, //提现记录
  DistributeList: ApiRootUrl + 'distribute/list?mch=' + mch, //我的分销订单

  DistributeApply: ApiRootUrl + 'distribute_apply/apply?mch=' + mch, //申请

  SetReferee: ApiRootUrl + 'user/setreferee?mch=' + mch, //设置推荐人
  Group: ApiRootUrl + 'user/group?mch=' + mch //我的团队
};