<template>
  <div class="home">
    <div class="main">
      <div class="columns">
        <div class="column panel">
          <Panel></Panel>
        </div>
        <div class="column">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Panel from '../components/Panel'

export default {
  name: 'home',
  components: {
    Panel
  }
}
</script>

<style scoped>

.main {
  max-width: 1400px;
  margin-right: 2px;
  margin-left: 15vw;
  margin-top: 20px;
}


</style>
