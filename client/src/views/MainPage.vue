<template>
  <div>
    <div v-if="$route.path === '/'" class="container-fluid mt-2">
      <div class="w-100 d-flex">
        <div class="left">
          <LeftNavigation></LeftNavigation>
        </div>
        <div class="center">
          <ListQuestion></ListQuestion>
        </div>
        <div class="right">
          <RightNavigation></RightNavigation>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>

import LeftNavigation from '@/components/LeftNavigation.vue'
import ListQuestion from '@/components/ListQuestion.vue'
import RightNavigation from '@/components/RightNavigation.vue'

export default {
  components: {
    LeftNavigation,
    ListQuestion,
    RightNavigation
  }
}
</script>

<style scoped>
.left{
  height: calc(100vh - 60px);
  width: 17%;
  border-right: 1px solid rgb(228, 228, 228);
  padding: 10px;
}

.center{
  height: calc(100vh - 58px);
  width: 55%;
  padding: 10px;
  overflow: auto;
}

.right{
  height: calc(100vh - 60px);
  width: 28%;
  border-left: 1px solid rgb(211, 209, 209);
  padding: 10px;
  overflow: auto;
}
</style>
