<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <div id="paging">
    <Pagination/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Pagination from '@/components/Pagination.vue'


export default {
  name: 'home',
  components: {
    Pagination
  }
}
</script>

<style scoped>
.home{
  display: flex;
  width: 100vw;
  justify-content: center;
  align-items: center;
  flex-flow: column wrap;
}
.overflow-auto{
  width: 50vw;
}
</style>