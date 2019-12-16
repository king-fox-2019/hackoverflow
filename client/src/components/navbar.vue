<template>
  <div>
    <b-navbar type="dark" variant="warning">
      <b-navbar-nav>
        <b-nav-item class="animated infinite heartBeat" to="/">
          <strong style="color: black;">hackoverflow</strong>
        </b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown text="User" right>
          <div v-if="$store.state.isLogged">
            <b-dropdown-item href="#">Account</b-dropdown-item>
            <b-dropdown-item href="#">Settings</b-dropdown-item>
          </div>
          <div v-else>
            <b-dropdown-item href="#">Login or Register</b-dropdown-item>
          </div>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
};
</script>

<style scoped>
</style>
