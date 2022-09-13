<template>
  <div class="chenneledit">
    <!-- 我的频道 -->
    <van-cell title="我的频道" :border="false">
      <van-button
        class="btn"
        size="mini"
        round
        @click="isEdit = !isEdit"
        style="color: red; border-color: red"
        >{{ isEdit ? '完成' : '编辑' }}</van-button
      >
    </van-cell>
    <div class="my-pannel">
      <van-grid gutter="10" :border="false">
        <van-grid-item
          v-for="(item, index) in myChannelEdit"
          :key="item.id"
          :text="item.name"
          :class="{ active: item.name === '推荐' }"
          :icon="isEdit && item.name !== '推荐' ? 'cross' : ''"
          @click="handelMyChannel(item, index)"
        />
      </van-grid>
    </div>
    <!-- 推荐频道 -->
    <van-cell title="推荐频道" border />
    <div class="recommend-pannel">
      <van-grid gutter="10" :border="false">
        <van-grid-item
          v-for="item in recommendChannels"
          :key="item.di"
          :text="item.name"
          icon="plus"
        />
      </van-grid>
    </div>
  </div>
</template>

<script>
import { gatAllChannelsAPI } from '@/api'
export default {
  props: {
    myChannelEdit: Array
  },
  created() {
    this.getAllChannels()
  },
  data() {
    return {
      isEdit: false,
      allChannels: []
    }
  },
  methods: {
    async getAllChannels() {
      const { data } = await gatAllChannelsAPI()
      this.allChannels = data.data.channels
    },
    handelMyChannel({ name }, index) {
      if (this.isEdit && name !== '推荐') {
        /* 删除频道 */
      } else {
        /* 跳转 */
        this.$emit('change-active', index)
      }
    }
  },
  computed: {
    recommendChannels() {
      return this.allChannels.filter((allChannelsItem) => {
        return !this.myChannelEdit.find(
          (myChannelEditItem) => myChannelEditItem.id === allChannelsItem.id
        )
      })
    }
  }
}
</script>

<style scoped lang="less">
:deep(.active) {
  .van-grid-item__text {
    color: red;
  }
}
.chenneledit {
  padding-top: 92px;
}
:deep(.btn) {
  width: 100px;
  font-size: 25px;
}
:deep(.van-grid-item__content) {
  background-color: #f4f5f6;
}
// 我的频道
.my-pannel {
  // 编辑按钮居中
  .van-cell__value {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  // 关闭按钮样式
  :deep(.van-grid-item__content) {
    position: relative;
    .van-grid-item__content {
      position: absolute;
      top: 0;
      right: 0;
    }
  }
}
:deep(.van-icon-cross) {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 25px;
  transform: translate(20%, -35%);
  border: 0.02667rem solid #000;
  border-radius: 50%;
  text-align: center;
  line-height: 0.32rem;
}
// 推荐频道
.recommend-pannel {
  // 推荐频道加号样式
  :deep(.van-grid-item__content) {
    flex-direction: row;

    .van-grid-item__icon {
      font-size: 0.5rem;
    }

    .van-grid-item__text {
      margin-top: 0;
    }
  }
}
</style>
