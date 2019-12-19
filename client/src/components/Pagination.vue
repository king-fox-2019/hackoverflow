<template>
  <div class="overflow-auto">
    <div v-for="(item, index) in allQuestion" :key="index" id="my-table">
      <!-- {{allQuestion}} -->
      <router-link :to="'/detail/'+item._id">
        <Card :data="item" />
      </router-link>
    </div>
  </div>
</template>

<script>
import Card from "./Card";
export default {
  name: "Pagination",
  components: {
    Card
  },
  data() {
    return {};
  },
  computed: {
    allQuestion() {
      console.log("masuk");
      return this.$store.state.allQuestion;
    }
  },
  created() {
    this.$store.dispatch("FetchAllQuestion");
    console.log(this.$route.name, "nama route");
  },
  mounted() {
    // this.items = this.allQuestion
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#my-table {
  margin: 10px 0px;
}
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
a,
a:visited {
  color: #000000;
}
a:hover,
a:active {
  text-decoration: none;
  color: rgb(12, 72, 236);
}
</style>
