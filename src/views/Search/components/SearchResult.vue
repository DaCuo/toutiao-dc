<template>
  <div class="result">
    <van-list
      v-model="loading"
      @load="getResult"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
    >
      <van-cell
        v-for="item in pageResult"
        :key="item.art_id"
        :title="item.title"
        @click="
          $router.push({
            path: '/detail',
            query: { articleId: item.art_id }
          })
        "
      >
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { getResultAPI } from '@/api'
export default {
  props: {
    keywords: String
  },
  data() {
    return {
      loading: false,
      page: 1,
      prePage: 10,
      pageResult: [],
      finished: false,
      error: false
    }
  },
  methods: {
    async getResult() {
      try {
        const { data } = await getResultAPI(
          this.page++,
          this.prePage,
          this.keywords
        )
        const result = data.data.results
        if (result.length === 0) {
          this.finished = true
        }
        this.pageResult.push(...result)
      } catch (error) {
        this.error = true
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="less">
.result {
  height: calc(100vh - 107px);
  overflow: auto;
}
</style>
