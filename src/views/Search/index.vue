<template>
  <div>
    <!-- 搜索框 -->
    <form action="/">
      <van-search
        class="search"
        show-action
        v-model.trim="keywords"
        background="#3296fa"
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @focus="isShowSearchResult = false"
        @cancel="$router.push('/ ')"
      />
    </form>
    <!-- 搜索/历史/结果/建议 -->
    <!-- <search-history></search-history>
    <search-result></search-result>
    <search-suggestion></search-suggestion> -->
    <component
      :keywords="keywords"
      @change-keywords="onSearch"
      :is="componentName"
    ></component>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import SearchHistory from './components/SearchHistory.vue'
import SearchResult from './components/SearchResult.vue'
import SearchSuggestion from './components/SearchSuggestion.vue'
export default {
  components: {
    SearchHistory,
    SearchResult,
    SearchSuggestion
  },
  data() {
    return {
      keywords: '',
      isShowSearchResult: false
    }
  },
  computed: {
    ...mapState(['histories']),
    componentName() {
      if (this.keywords === '') {
        return 'SearchHistory'
      }
      if (this.isShowSearchResult) {
        return 'SearchResult'
      }
      return 'SearchSuggestion'
    }
  },
  methods: {
    ...mapMutations(['GET_HISTORY']),
    onSearch(keywords) {
      console.log(keywords)
      const distinctHistories = [...new Set([keywords, ...this.histories])]
      this.GET_HISTORY(distinctHistories)
      this.keywords = keywords
      this.isShowSearchResult = true
    }
  }
}
</script>

<style scoped lang="less">
.search {
  [role='button'] {
    color: #fff;
  }
}
</style>
