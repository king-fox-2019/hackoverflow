<template>
  <div>
    <div v-if="!$store.state.user">
      <div class="justify-between welcome">
        <div class="welcometitle">
          <h4
            class="text-black"
            style="margin: 150px 0px 20px 0px; font-family: Roboto Slab, serif;"
          >
            <strong>We <3 Hacktiv8 people</strong>
          </h4>
          <p
            style="text-align: center; font-family: 'Source Sans Pro', sans-serif; font-size: 17px;"
            class="fs-title ta-center w90 wmx4 mx-auto mb24"
          >
            <strong>We build products that empower developers and connect them to solutions that enable productivity, growth, and discovery.</strong>
          </p>
          <q-btn color="black" label="get started" to="/" />
        </div>
      </div>
      <div class="row dua"></div>
    </div>
  </div>
</template>

<script>
// import QuestionBar from "./QuestionFromMain.vue";
// import io from "socket.io-client";

export default {
  name: "Welcome",
  components: {
    // QuestionBar
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Roboto+Slab|Source+Sans+Pro&display=swap");
#timeline {
  width: 100vw;
}
#time {
  font-size: 80px;
  color: white;
}
.dua {
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  background-image: url("../assets/bg3.png");
  background-size: auto;
  background-repeat: no-repeat;
  height: 200vh;
}
.welcometitle {
  width: 500px;
  display: flex;
  flex-direction: column !important;
  justify-content: flex-start;
  align-items: center;
}
.welcome {
  display: flex;
  flex-direction: column !important;
  /* justify-content: center; */
  align-items: center;
  background-image: url("../assets/background1.png");
  background-size: auto;
  background-repeat: no-repeat;
  height: 100vh;
}
</style>