<template>
  <div>
    <van-cell title="搜索历史">
      <template>
        <van-icon name="delete-o" v-if="!isEdit" @click="isEdit = true" />
        <div v-else>
          <span @click="$store.commit('GET_HISTORY', [])">全部删除</span> &nbsp;
          <span @click="isEdit = false">完成</span>
        </div>
      </template>
    </van-cell>
    <van-cell
      v-for="item in histories"
      :key="item"
      :title="item"
      @click="!isEdit && $emit('change-keywords', item)"
    >
      <template>
        <van-icon
          name="close"
          v-if="isEdit"
          @click="
            $store.commit(
              'GET_HISTORY',
              histories.filter((i) => item !== i)
            )
          "
        />
      </template>
    </van-cell>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      isEdit: false
    }
  },
  computed: {
    ...mapState(['histories'])
  }
}
</script>

<style></style>
