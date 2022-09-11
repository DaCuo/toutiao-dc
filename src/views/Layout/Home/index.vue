<template>
  <div>
    <!-- 头部 -->
    <van-nav-bar class="navbar">
      <template #title>
        <van-button block size="small" round icon="search">搜索</van-button>
      </template>
    </van-nav-bar>
    <!-- 文章及内容 -->
    <van-tabs v-model="active" swipeable>
      <van-tab :title="item.name" v-for="item in chennles" :key="item.id">
        <!-- 文章详情 -->
        <ArticleList :id="item.id"></ArticleList>
      </van-tab>
      <span class="iconfont icon-gengduo"></span>
    </van-tabs>
  </div>
</template>

<script>
import { getChennelAPI } from '@/api'
import ArticleList from './components/ArticleList.vue'
export default {
  name: 'home',
  components: {
    ArticleList
  },
  created() {
    this.getChennel()
  },
  data() {
    return {
      active: 0,
      chennles: []
    }
  },
  methods: {
    async getChennel() {
      try {
        const { data } = await getChennelAPI()
        this.chennles = data.data.channels
      } catch (error) {
        // 判断错误的来并做处理
        if (!error.response) {
          throw error
        } else {
          const status = error.response.status
          status === 507 && this.$toast.fail('情书新')
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.navbar {
  background-color: #3296fa;

  // inherit 继承父类的样式
  // unset 不设置次属性
  :deep(.van-nav-bar__title) {
    max-width: unset;
  }
  .van-button--default {
    background-color: #5babfb;
    border: 0;
    color: #fff;
    font-size: 30px;
  }

  .van-icon {
    color: #fff;
  }
  .van-button--block {
    width: 7.4rem;
  }
}
/* tabs导航条样式 */
:deep(.van-tabs__wrap) {
  padding-right: 66px;

  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;

    /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    }

    /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
}

/* 字体图标 */
.icon-gengduo {
  position: absolute;
  z-index: 11;
  top: 0;
  right: 0;
  width: 66px;
  height: 82px;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #eee;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('~@/assets/images/gradient-gray-line.png');
  }
}
</style>
