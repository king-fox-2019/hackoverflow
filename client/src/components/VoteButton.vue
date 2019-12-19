<template>
  <div>
    <b-button variant="primary" class="vote-button">+</b-button>
    <div class="vote">
      <h4></h4>
    </div>
    <b-button variant="danger" class="vote-button">-</b-button>
  </div>
</template>

<script>
export default {

}
</script>

<style>
  .vote {
    height: 40px;
    line-height: 40px;
  }
  .vote-button {
    width: 40px;
    height: 40px;
    line-height: 40px;
  }
</style>