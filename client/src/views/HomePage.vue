<template>
  <div class="home">
    <div class="main">
      <div class="columns">
        <div class="column panel is-narrow">
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
  max-width: 1200px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 20px;
}
.panel {
  border-right: solid 1px rgb(201, 201, 201);
}

</style>
