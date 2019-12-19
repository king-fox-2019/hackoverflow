<template>
  <div id="container">
    <h1>Question</h1>
    <div style="display: flex; flex-direction: row;">
      <b-button
        v-if="userId == item.asker._id"
        variant="danger"
        @click.prevent="deleteThis(item._id)"
      >Delete</b-button>
      <Edit
        style="margin: 0px 15px"
        :data="item"
        v-if="userId == item.asker._id"
        variant="outline-info"
        @click.prevent="updateThis(item._id)"
      />
    </div>
    <hr />
    <br />
    <div id="card" style="width:70%">
      <Card :data="item" />
      <hr />
    </div>
    <h1>Answer</h1>
    <br />
    <hr />
    <br />
    <div id="card" style="width:70%" v-for="(answer, index) in answers" :key="index">
      <AnswerCard :data="answer" />
      <hr />
    </div>
    <h1 v-if="!answers.length">No one give response to this post yet</h1>
    <br />
    <br />
    <hr />
    <br />
    <AddAnswer />
  </div>
</template>

<script>
import Card from "../components/Card";
import AnswerCard from "../components/AnswerCard";
import AddAnswer from "../components/AddAnswer";
import axios from "axios";
import swal from "sweetalert2";
import Edit from "../components/updateQuestion";

export default {
  name: "detail",
  components: {
    Card,
    AnswerCard,
    AddAnswer,
    Edit
  },
  data(){
    return{
      userId: localStorage.getItem('id')
    }
  },
  created() {
    this.$store.dispatch("FetchOneQuestion", this.$route.params.id);
    this.$store.dispatch("FetchTheAnswer", this.$route.params.id);
  },
  computed: {
    item() {
      return this.$store.state.oneQuestion;
    },
    answers() {
      return this.$store.state.answerToOne;
    }
  },
  mounted() {
  },
  methods: {
    deleteThis(id) {
      axios({
        url: `http://localhost:3000/questions/${id}`,
        method: "delete",
        headers: { token: localStorage.getItem("token") }
      })
        .then(result => {
          this.$router.push("/");
          swal.fire("Deleted");
        })
        .catch(err => {
          swal.fire('Its not yours');
        });
    }
  }
};
</script>

<style scoped>
#container {
  width: 100vw;
  margin-top: 5vh;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
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
a {
  color: #0e9915;
}
</style>