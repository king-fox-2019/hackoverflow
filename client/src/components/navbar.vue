<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand to="/">Hackoverflow</b-navbar-brand>
        <b-navbar-nav class="ml-auto">
          <!-- <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form> -->
          <b-nav-item-dropdown right>
            <template v-slot:button-content>
              User
            </template>
            <section v-if="$store.state.logged">
              <b-dropdown-item href="#">Profile</b-dropdown-item>
              <b-dropdown-item href="#">Sign Out</b-dropdown-item>
            </section>
            <section v-else>
              <b-dropdown-item href="#">LOGIN / REGISTER</b-dropdown-item>
            </section>
          </b-nav-item-dropdown>
        </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: 'Hello world',
    };
  },
};
</script>

<style scoped>
</style>
