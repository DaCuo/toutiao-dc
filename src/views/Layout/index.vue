<template>
  <div>
    <!-- 展示区域 -->
    <router-view></router-view>
    <!-- 底部按钮 -->
    <van-tabbar class="van-tabbar" route>
      <van-tabbar-item to="/ ">
        <template #icon>
          <span class="iconfont icon-shouye"></span>
        </template>
        <div>首页</div>
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <template #icon>
          <span class="iconfont icon-shipin"></span>
        </template>
        <div>视频</div>
      </van-tabbar-item>
      <van-tabbar-item to="/qa">
        <template #icon>
          <span class="iconfont icon-wenda"></span>
        </template>
        <div>问答</div>
      </van-tabbar-item>
      <van-tabbar-item to="/profile">
        <template #icon>
          <span class="iconfont icon-wode"></span>
        </template>
        <div>{{ isLogin ? '我的' : '未登录' }}</div>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['isLogin'])
  }
}
</script>

<style scoped lang="less">
.van-tabbar {
  .iconfont {
    font-size: 40px;
  }
  div {
    font-size: 30px;
  }
}
</style>
