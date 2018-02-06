import axios from 'axios'
axios.defaults.baseURL = '/baseInter'
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.transformRequest = [data => {
  return JSON.stringify(data)
}]
axios.defaults.timeout = 5000

// 登录
export const requestLogin = data => { return axios.post('/login', data) }
// 登出
export const requestExit = () => { return axios.get('/logout') }
// 注册
export const requestRegister = data => { return axios.post('/register', data) }

// wapDomain
export const findStoreByPcDoMain = data => { return axios.post('/portal/api/merchantstore/findStoreByPcDoMain', data) }
// findmerchantStoreBystoreId
export const findmerchantStoreBystoreId = data => { return axios.post('/portal/api/merchantstore/findmerchantStoreBystoreId', data) }
// 首页轮播
export const bannerList = data => { return axios.post('/portal/api/home/bannerlist', data) }
// 目的地城市
export const dstCity = data => { return axios.post('/portal/api/home/dstcity', data) }
// mv列表
export const movieList = data => { return axios.post('/portal/api/home/movielist', data) }
// 推荐商品
export const recommendWare = data => { return axios.post('/portal/api/home/recommendware', data) }
// 商品列表(参数kindCode: trip-T代表旅游, tripphoto-TP代表旅拍)
export const wareList = data => { return axios.post('/portal/api/home/warelist', data) }

// 目的地城市(参数：continent 区域特征码)
export const dstCityByContinent = params => { return axios.get('/portal/api/home/dstcityByContinent', {params: params}) }
// 根据地区获取商品列表
export const warelistByContinent = params => { return axios.get('/portal/api/home/warelistByContinent', {params: params}) }

// 商品分类列表
export const kindlist = data => { return axios.post('/portal/mobile/home/kindlist', data) }

// getOrderInfoByPayId
export const getOrderInfoByPayId = data => { return axios.post('/portal/api/customerorderpay/getOrderInfoByPayId', data)}

//yueInstalment
export const yueInstalment = data => { return axios.get('/portal/api/customerorderpay/yueInstalment', data)}

//payUrl
export const payUrl = data => { return axios.get('/portal/api/customerorderpay/getpaymentcodeurl', data)}

// 登录
export const login = data => { return axios.post('/portal/api/user/member/login', data)}

export const forgetpassword = data => { return axios.post('/portal/api/communication/smsverificode/forgetpassword', data)}

// 注册
export const create = data => { return axios.post('/portal/api/user/member/create', data)}

// 发送动态码
export const createuser = data => { return axios.post('/portal/api/communication/smsverificode/createuser', data)}