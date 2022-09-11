// 获取文章接口

import request from '@/utils/request'

/**
 *获取文章接口
 * @param {Number} id 频道ID
 * @param {number} timestamp 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
 * @returns Promise
 */
export const getArticlesAPI = (id, timestamp) => {
  return request({
    url: '/v1_0/articles',
    params: {
      channel_id: id,
      timestamp
    }
  })
}
