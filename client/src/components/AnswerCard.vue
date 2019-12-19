<template>
  <div>
    <b-card>
      <hr />
      <div style="display:flex; flex-direction: row">
        <div id="left-btn">
          <b-button @click.prevent="upVote">^</b-button>
          <!-- {{data.upVotes.length}} abc -->
          <b-card-text>
            <br />
            {{totalVote}}
          </b-card-text>
          <b-button @click.prevent="downVote">v</b-button>
        </div>
        <div style="width: 100%">
          <!-- {{data}} -->
          <b-card-text>{{data.body}}</b-card-text>
          <br />
          <hr />
          <hr />
          <div style="display: flex; flex-direction: row;justify-content: space-around">
            <b-card-text>{{date}}</b-card-text>
            <b-card-text>{{data.user.username}}</b-card-text>
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
  name: "cardAnswer",
  props: ["data"],
  methods: {
    upVote() {
      axios({
        url: `http://localhost:3000/answers/upvote/${this.data._id}`,
        method: "patch",
        headers: { token: localStorage.getItem("token") }
      })
        .then(result => {
          // this.$store.dispatch("FetchTheAnswer");
          this.$store.dispatch("FetchOneQuestion", this.$route.params.id);
          this.$store.dispatch("FetchTheAnswer", this.$route.params.id);
        })
        .catch(err => {
          swal.fire(err.response.data.message);
        });
    },
    downVote() {
      axios({
        url: `http://localhost:3000/answers/downvote/${this.data._id}`,
        method: "patch",
        headers: { token: localStorage.getItem("token") }
      })
        .then(result => {
          // this.$store.dispatch("FetchTheAnswer");
          this.$store.dispatch("FetchOneQuestion", this.$route.params.id);
          this.$store.dispatch("FetchTheAnswer", this.$route.params.id);
        })
        .catch(err => {
          swal.fire(err.response.data.message);
        });
    }
  },
  mounted() {
    // console.log(this.data);
    // console.log(this.$route.name);
  },
  computed: {
    totalVote() {
      return this.data.upVotes.length - this.data.downVotes.length;
    },
    date(){
      return new Date(this.data.createdAt).toLocaleString()
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