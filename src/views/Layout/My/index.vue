<template>
  <div class="profile">
    <!--  头部 -->
    <header>
      <!-- 登录状态 -->
      <div class="login banner" v-if="isLogin">
        <van-row></van-row>
        <van-row>
          <van-col span="12" style="height: 100%">
            <van-row type="flex" justify="space-around" align="center">
              <van-image
                round
                width="1.5rem"
                height="1.5rem"
                :src="userInfo.photo"
              />
              <span class="mobile">{{ userInfo.name }}</span>
            </van-row>
          </van-col>
          <van-col span="7"></van-col>
          <van-col span="5" style="height: 100%">
            <van-row
              style="height: 100%"
              type="flex"
              justify="center"
              align="center"
            >
              <van-button size="mini" round class="edit-btn"
                >编辑资料</van-button
              >
            </van-row>
          </van-col>
        </van-row>
        <van-row>
          <van-grid class="grid" :border="false">
            <van-grid-item text="头条">
              <template #icon>{{ userInfo.art_count }}</template>
            </van-grid-item>
            <van-grid-item text="粉丝">
              <template #icon>{{ userInfo.fans_count }}</template>
            </van-grid-item>
            <van-grid-item text="关注">
              <template #icon>{{ userInfo.follow_count }}</template>
            </van-grid-item>
            <van-grid-item text="获赞">
              <template #icon>{{ userInfo.like_count }}</template>
            </van-grid-item>
          </van-grid>
        </van-row>
      </div>
      <!-- 未登录 -->
      <div class="logout banner" @click="$router.push('/login')" v-else>
        <img src="../../../assets/images/mobile.png" alt="" />
        <div class="text">登录/注册</div>
      </div>
    </header>
    <!-- 主体 -->
    <main>
      <van-grid column-num="2" clickable>
        <van-grid-item text="收藏">
          <template #icon>
            <span class="iconfont icon-shoucang"></span>
          </template>
        </van-grid-item>
        <van-grid-item text="历史">
          <template #icon>
            <span class="iconfont icon-lishi"></span>
          </template>
        </van-grid-item>
      </van-grid>
      <div class="link">
        <van-cell title="消息通知" is-link />
        <van-cell title="小强同志" is-link />
      </div>
    </main>
    <!-- 退出 -->
    <footer>
      <van-button v-if="isLogin" class="textcolor" block @click="logout">
        退出</van-button
      >
    </footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// 引入用户请求接口
import { getUserInfoAPI } from '@/api'
export default {
  name: 'My',
  data() {
    return {
      userInfo: {}
    }
  },
  created() {
    this.getUserInfo()
  },
  computed: {
    ...mapGetters(['isLogin'])
  },
  methods: {
    async logout() {
      await this.$dialog.confirm({
        title: '黑马头条',
        message: '是否确认退？'
      })
      this.$store.commit('GET_TOKEN', {})
    },
    async getUserInfo() {
      try {
        if (!this.isLogin) return
        const { data } = await getUserInfoAPI()
        this.userInfo = data.data
      } catch (error) {
        // 分析错误是什么原因导致的
        if (error.response && error.response.status === 401) {
          this.$toast.fail('登录超时请诚信登录')
        } else {
          throw error
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.profile {
  background-color: #f5f7f9;
  height: 100vh;
}
.banner {
  width: 100%;
  height: 5.333333rem;
  background: url('../../../assets/images/banner.png') no-repeat 0 0 / cover;
  img {
    width: 1.76rem;
    height: 1.76rem;
  }
}
.logout {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  .text {
    margin-top: 10px;
    font-size: 30px;
    color: #fff;
  }
}
.login {
  display: flex;
  flex-direction: column;
  > .van-row {
    flex: 1;
  }
  .mobile {
    font-size: 30px;
    color: #fff;
  }
  .van-row {
    height: 100%;
  }
  .edit-btn {
    width: 1.6rem;
    height: 0.52667rem;
    color: #666;
  }
  :deep(.grid) {
    color: #fff;
    .van-grid-item__content {
      font-size: 30px;
      background-color: inherit;
    }
    .van-grid-item__text {
      color: #fff;
    }
  }
}

.iconfont {
  font-size: 0.6rem;
}
.icon-shoucang {
  color: red;
}
.icon-lishi {
  color: orange;
}

.textcolor {
  color: red;
}
.link {
  margin: 10px 0;
}
</style>
