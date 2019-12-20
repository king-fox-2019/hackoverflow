<template>
  <div class="container">
    <aside style="text-align: left;" class="menu">
    <ul class="menu-list">
      <li><a @click="$router.push('/home/questions')">Home</a></li>
    </ul>
    <p class="menu-label">
      PUBLIC
    </p>
    <ul class="menu-list">
      <li><a @click="$router.push('/home/questions')">
        <b-icon
          icon="earth"
          size="is-small"
          style="margin-right: 5px;">
        </b-icon>Stack Overflow</a></li>
    </ul>
  </aside>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.container {
  margin-left: 5px !important;
}
</style>
