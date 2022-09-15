import request from '@/utils/request'

/**
 *
 * @param {String} q  搜索的关键字
 * @returns
 */
export const getSuggestionAPI = (q) => {
  return request({
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}

/**
 *  搜索结果
 * @param {Number} page  页数
 * @param {Number} per_page  每页数据的数量
 * @param {Number | string } q 搜索的关键字
 * @returns
 */
export const getResultAPI = (/* eslint-disable-line */ page, per_page, q) => {
  return request({
    url: '/v1_0/search',
    params: {
      page,
      per_page,
      q
    }
  })
}
