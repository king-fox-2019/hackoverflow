<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-light shadow fixed-top">
      <div class="container">
        <router-link to="/" class="navbar-brand text-info">Hackoverflow</router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <b-link class="nav-link text-info" :to="{ path: '/login' }">Login</b-link>
            </li>
            <li class="nav-item">
              <b-link class="nav-link text-info" :to="{ path: '/register' }"
                >Register</b-link
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Header'
}
</script>
