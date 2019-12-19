<template>
  <div class="row bg-home">
    <div class="col-12">
      <div class="padding-top-text">
        <img src="../assets/stunOverflow.png" class="img-fluid ${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}" style="margin-bottom:-40px;" alt="">
        <br>
        <span class="text-home" style="color:#212325"><i>Code</i> is <b style="color:orangered">World,</b> <u>World</u> is <strong><u style="color:orangered">you</u></strong></span>
        <br>
        <button type="button" class="btn mt-3 btn-letsgo">C'mon Let`s Go</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style scoped>
*{
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
.bg-home{
  background: url('../assets/globemapset.png');
  background-attachment: fixed;
  display: block;
  background-repeat: no-repeat;
  background-size: 100%;
  height: 94vh;
}

.btn-letsgo{
  background-color: orangered;
  color: white;
  transition: 0.5s;
}
.btn-letsgo:hover{
  background-color: #212325;
  color: orangered;
}

.padding-top-text{
  padding-top: 130px;
}

.text-home{
  font-size: 70px;
}
</style>
