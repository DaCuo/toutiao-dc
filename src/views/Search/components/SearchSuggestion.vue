<template>
  <div>
    <van-cell
      v-for="(item, index) in highLightSuggestion"
      :key="index"
      icon="search"
      @click="$emit('change-keywords', Suggestion[index])"
    >
      <template #title>
        <span v-html="item"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { debounce } from 'lodash'
import { getSuggestionAPI } from '@/api'
export default {
  props: {
    keywords: {
      type: String
    }
  },
  data() {
    return {
      Suggestion: []
    }
  },
  watch: {
    keywords: {
      immediate: true,
      handler: 'getSuggestion'
    }
  },
  methods: {
    getSuggestion: debounce(async function () {
      try {
        const { data } = await getSuggestionAPI(this.keywords)
        this.Suggestion = data.data.options.filter(Boolean)
      } catch (error) {
        if (error.response) {
          this.$toast.fail('搜索失败')
        } else {
          throw error
        }
      }
    }, 500)
  },
  computed: {
    highLightSuggestion() {
      const reg = new RegExp(this.keywords, 'ig')
      return this.Suggestion.map((str) => {
        return str.replace(
          reg,
          (match) => `<span style="color:red"> ${match}</span>`
        )
      })
    }
  }
}
</script>

<style></style>
