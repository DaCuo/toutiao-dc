import request from '@/utils/request'
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
