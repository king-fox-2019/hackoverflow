<template>
  <div class="container">
    <div class="row">
      <div class="col-md-9">
        <h1>{{ msg }}</h1>
        <p>
          For a guide and recipes on how to configure / customize this project,<br>
          check out the
        </p>
        <QuestItem/>
      </div>
      <div class="col-md-3">
        <h3>Iklans</h3>
      </div>
    </div>
  </div>
</template>

<script>
import QuestItem from './QuestItem'
export default {
  name: 'HelloWorld',
  components: {
    QuestItem
  },
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
