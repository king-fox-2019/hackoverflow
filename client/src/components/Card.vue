<template>
  <div>
    <b-card :title="data.title">
      <hr />
      <div style="display:flex; flex-direction: row">
        <div id="left-btn">
          <b-button v-if="this.$route.name != 'home'" @click.prevent="upVote">^</b-button>

          <b-card-text>
            <br />
            {{totalVote}}
          </b-card-text>
          <small v-if="this.$route.name == 'home'">votes</small>
          <b-button v-if="this.$route.name != 'home'" @click.prevent="downVote">v</b-button>
        </div>
        <div style="width: 100%">
          <b-card-text>{{data.body}}</b-card-text>
          <br />
          <hr />
          <b-card-text>{{data.about}}</b-card-text>
          <hr />
          <div style="display: flex; flex-direction: row;justify-content: space-around">
            <b-card-text>{{date}}</b-card-text>
            <b-card-text>{{asker.username}}</b-card-text>
          </div>
        </div>
      </div>
    </b-card>
  </div>
</template>

<script>
import axios from "axios";
import swal from "sweetalert2";

export default {
  name: "card",
  props: ["data"],
  methods: {
    upVote() {
      axios({
        url: `http://localhost:3000/questions/upvote/${this.data._id}`,
        method: "patch",
        headers: { token: localStorage.getItem("token") }
      })
        .then(result => {
          // this.$store.dispatch("FetchAllQuestion");
          this.$store.dispatch("FetchOneQuestion", this.$route.params.id);
          this.$store.dispatch("FetchTheAnswer", this.$route.params.id);
        })
        .catch(err => {
          swal.fire(err.response.data.message);
        });
    },
    downVote() {
      axios({
        url: `http://localhost:3000/questions/downvote/${this.data._id}`,
        method: "patch",
        headers: { token: localStorage.getItem("token") }
      })
        .then(result => {
          // this.$store.dispatch("FetchAllQuestion");
          this.$store.dispatch("FetchOneQuestion", this.$route.params.id);
          this.$store.dispatch("FetchTheAnswer", this.$route.params.id);
          console.log("dislikes", result);
        })
        .catch(err => {
          swal.fire(err.response.data.message);
        });
    }
  },
  mounted() {
  },
  computed: {
    totalVote() {
      return this.data.upVotes ? (this.data.upVotes.length - this.data.downVotes.length): "" ;
    },
    date() {
      return new Date(this.data.createdAt).toLocaleString();
    },
    asker(){
      return this.data.asker ? (this.data.asker): ""
    }
  }
};
</script>

<style scoped>
#left-btn {
  display: flex;
  flex-direction: column;
  width: 50px;
  border-right: 1px solid black;
  margin-right: 10px;
  padding-right: 5px;
  justify-content: center;
  align-items: center;
}
</style>