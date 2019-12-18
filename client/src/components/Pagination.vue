<template>
  <div class="overflow-auto">
    <div v-for="(item, index) in allQuestion" :key="index" id="my-table">
      <!-- {{allQuestion}} -->
      <router-link :to="'/detail/'+item._id">
        <Card :data="item" />
      </router-link>
    </div>
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table"
    ></b-pagination>
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
    return {
      perPage: 1,
      currentPage: 1
    };
  },
  computed: {
    rows() {
      return this.allQuestion.length;
    },
    allQuestion() {
      console.log("masuk");
      return this.$store.state.allQuestion;
    }
  },
  created() {
    this.$store.dispatch("FetchAllQuestion");
    console.log(this.$route.name, 'nama route');
  },
  mounted() {
    // this.items = this.allQuestion
  }
};
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
