<template>
  <div>
    <ArticleItem
      v-for="item in articles"
      :key="item.art_id"
      :article="item"
    ></ArticleItem>
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
      articles: []
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
        this.articles = data.data.results
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
    }
  }
}
</script>

<style></style>
