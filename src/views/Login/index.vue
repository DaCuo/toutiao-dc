<template>
  <div>
    <!-- 登录头部 -->
    <van-nav-bar title="登录" class="nav-bar" />
    <!-- 登录表单 -->
    <van-form @submit="onSubmit" class="from" ref="from">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="delRule"
      >
        <template #label>
          <span class="iconfont icon-shouji"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        name="code"
        placeholder="请输入验证码"
        :rules="codeRule"
      >
        <template #label>
          <span class="iconfont icon-yanzhengma"></span>
        </template>
        <template #button>
          <van-button
            v-if="isShowCodeBtn"
            @click="sendCode"
            block
            type="default"
            size="small"
            round
            native-type="button"
            class="btn"
            >获取验证码</van-button
          >
          <van-count-down
            :time="3 * 1000"
            format="ss秒"
            v-else
            @finish="isShowCodeBtn = true"
          />
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendCodeAPI } from '@/api'
import { delRule, codeRule } from './rules'
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      mobile: '',
      code: '',
      delRule,
      codeRule,
      isShowCodeBtn: true
    }
  },
  methods: {
    ...mapMutations(['GET_TOKEN']),
    async onSubmit() {
      this.loading()
      try {
        const { data } = await login(this.mobile, this.code)
        this.GET_TOKEN(data.data)
        // 路由跳转
        this.$router.push('/profile')
        this.$toast.success('登录成功')
      } catch (error) {
        console.log(error)
        if (error.response && error.request.status) {
          this.$toast.fail(error.response.data.message)
        } else {
          this.$toast.clear()
          throw error
        }
      }
    },
    loading() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
    },
    // 发送验证码逻辑
    async sendCode() {
      await this.$refs.from.validate('mobile')
      this.loading()
      try {
        await sendCodeAPI(this.mobile)
        // 倒计时
        this.isShowCodeBtn = false
        this.$toast.success('验证码发送成功')
      } catch (error) {
        if (
          error.response &&
          (error.response.status === 429 || error.response.status === 404)
        ) {
          this.$toast.fail(error.response.data.message)
        } else {
          this.$toast.clear()
          throw error
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.nav-bar {
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
}
:deep(.from) {
  width: 92%;
  .van-cell__title {
    flex: 1;
  }
  .van-cell__value {
    flex: 20;
  }
  .iconfont {
    font-size: 40px;
  }
  .btn {
    color: skyblue;
    background-color: #eee;
    height: 0.62rem;
  }
}
.van-button--block {
  display: block;
  width: 100%;
}
</style>
