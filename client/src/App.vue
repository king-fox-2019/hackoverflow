<template>
  <div id="app">
    <div class="container">
      <div class="row py-4 text-left">
        <div class="col-12">
          <div id="nav">
          <router-link to="/" class="btn btn-primary font-weight-bold">Home</router-link>
          <router-link to="/about" class="btn btn-success ml-3 font-weight-bold">Profil</router-link>
        </div>
        </div>
      </div>

    </div>
    
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
