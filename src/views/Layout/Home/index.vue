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
      <van-tab
        :title="item.name"
        v-for="item in chennles"
        :key="item.id"
        class="article"
      >
        <!-- 文章详情 -->
        <ArticleList :id="item.id"></ArticleList>
      </van-tab>
      <span class="iconfont icon-gengduo" @click="isShow = true"></span>
    </van-tabs>
    <!-- 弹出层 -->
    <van-popup
      v-model="isShow"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <ChannelEdit
        v-if="isShow"
        @change-active=";[(isShow = false), (active = $event)]"
        :myChannelEdit="chennles"
        @del-Channel="delChannel"
        @add-Channel="addChannel"
      ></ChannelEdit>
    </van-popup>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { getChennelAPI, delChannelAPI, addChannelAPI } from '@/api'
import ArticleList from './components/ArticleList.vue'
import ChannelEdit from './components/ChannelEdit.vue'
export default {
  name: 'home',
  components: {
    ArticleList,
    ChannelEdit
  },
  created() {
    this.infoChennel()
  },
  data() {
    return {
      active: 0,
      chennles: [],
      isShow: false
    }
  },
  computed: {
    ...mapGetters(['isLogin'])
  },
  methods: {
    ...mapMutations(['GET_MY_CHANNELS']),
    infoChennel() {
      if (this.isLogin) {
        this.getChennel()
      } else {
        const myChannels = this.$store.state.myChannels
        if (myChannels.length === 0) {
          this.getChennel()
        } else {
          this.chennles = myChannels
        }
      }
    },
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
    },
    async delChannel(id) {
      try {
        const newChannels = this.chennles.filter((item) => item.id !== id)
        if (this.isLogin) {
          await delChannelAPI(id)
        } else {
          // 存储本地
          this.GET_MY_CHANNELS(newChannels)
        }
        this.chennles = newChannels
        this.$toast.success('删除成功')
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.$toast.fail('请重新登录后删除')
        } else {
          throw error
        }
      }
    },
    async addChannel(item) {
      try {
        if (this.isLogin) {
          await addChannelAPI(item.id, this.chennles.length)
        } else {
          // 存储到本地
          this.GET_MY_CHANNELS([...this.chennles, item])
        }
        this.chennles.push(item)
        this.$toast.success('添加成功')
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.$toast.fail('请重新登录后')
        } else {
          throw error
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.article {
  height: calc(100vh - 82px - 93px - 100px);
  overflow: auto;
  &::-webkit-scrollbar {
    width: 10px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #3296fa;
    border-radius: 10px;
  }
}
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
