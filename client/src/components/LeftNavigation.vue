<template>
  <div class="d-flex flex-column justify-content-center">
      <a href="" @click.prevent="">Home</a>
      <a href="" @click.prevent="">Profile</a>
      <a href="" @click.prevent="">Bookmark</a>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.left-nav{
    text-decoration: none;
}

a{
    text-decoration: none;
    color: black;
    padding: 5px;
}

a:hover{
    border-right: 3px solid orangered;
    background-color: rgb(241, 239, 239);
}

a:visited{
    background-color: rgb(233, 231, 231);
    border-right: 3px solid orangered;
}
</style>
