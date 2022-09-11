import request from '@/utils/request'
// import store from '@/store'
/**
 * 用户登录接口
 * @param {String} mobile
 * @param {Number} code
 * @returns promise对象
 */
export const login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: {
      mobile,
      code
    }
  })
}
/**
 *  手机号验证码
 * @param {Number} mobile
 * @returns  promise对象
 */
export const sendCodeAPI = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`
  })
}

/**
 *获取当前用户个人信息
 * @returns promise对象
 */
export const getUserInfoAPI = () => {
  return request({
    url: '/v1_0/user'
    // headers: { Authorization: `Bearer ${store.state.tokenObj.token}` }
  })
}
