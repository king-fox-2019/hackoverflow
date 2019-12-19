<template>
  <div>
    <TopNavbar />
    <form>
      <div class="form-group">
        <label for="email">Email or username</label>
        <input type="text" class="form-control" id="email" placeholder="Enter email or username">
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" class="form-control" id="password" placeholder="Enter Password">
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
    </form>
  </div>
</template>

<script>
import TopNavbar from '@/components/TopNavbar.vue'
export default {

  name: 'LoginRegister',
  components: {
    TopNavbar
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="css" scoped>
</style>