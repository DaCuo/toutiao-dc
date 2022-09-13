<template>
  <div>
    <van-pull-refresh v-model="refreshingLoading" @refresh="getNextPageArticle">
      <van-list
        @load="getNextPageArticle"
        offset="100"
        :immediate-check="false"
        v-model="loading"
        :finished="finished"
        finished-text="出门右转"
        :error.sync="error"
        error-text="没有更多了,点击加载"
      >
        <ArticleItem
          v-for="item in articles"
          :key="item.art_id"
          :article="item"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticlesAPI } from '@/api'
import ArticleItem from './ArticleItem.vue'
export default {
  name: 'Article',
  components: {
    ArticleItem
  },
  data() {
    return {
      articles: [],
      preTimestamp: '',
      loading: false,
      finished: false,
      error: false,
      refreshingLoading: false
    }
  },
  props: {
    id: [Number, String]
  },
  created() {
    this.getFirstPageArticle()
  },
  methods: {
    async getFirstPageArticle() {
      try {
        const { data } = await getArticlesAPI(this.id, +new Date())
        console.log(data)
        this.articles = data.data.results
        this.preTimestamp = data.data.pre_timestamp
      } catch (error) {
        const status = error.response?.status
        if (!error.response || status === 507) {
          throw error
        } else {
          if (status === 4000) {
            throw new Error(error.response.data.message)
          }
        }
      }
    },
    async getNextPageArticle() {
      try {
        // if (Math.random() > 0.5) {
        //   this.error = true
        // }
        const { data } = await getArticlesAPI(this.id, this.preTimestamp)
        if (!data.data.pre_timestamp) {
          this.finished = true
        }
        if (this.loading) {
          this.articles.push(...data.data.results)
        } else {
          this.articles.unshift(...data.data.results)
        }

        this.preTimestamp = data.data.pre_timestamp
      } catch (error) {
        this.error = true
      } finally {
        this.loading = false
        this.refreshingLoading = false
      }
    }
  }
}
</script>

<style></style>
