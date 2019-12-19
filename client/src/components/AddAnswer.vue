<template>
  <div>
    <h3>Your Answer</h3>
    <b-form @submit.prevent="onSubmit">
      <b-form-textarea
        id="textarea"
        v-model="form.body"
        placeholder="Enter something..."
        rows="6"
        max-rows="10"
        no-resize
      ></b-form-textarea>
      <b-button type="submit" variant="primary">Post your Answer</b-button>
    </b-form>
    {{form.body}}
  </div>
</template>

<script>
import axios from "axios";
import swal from "sweetalert2";

export default {
  name: "AddAnswer",
  data() {
    return {
      form: {
        body: ""
      }
    };
  },
  methods: {
    onSubmit() {
      axios({
        method: "post",
        url: `http://localhost:3000/answers/${this.$route.params.id}`,
        data: this.form,
        headers: { token: localStorage.getItem("token") }
      })
        .then(({ data }) => {
          this.$store.dispatch("FetchOneQuestion", this.$route.params.id);
          this.$store.dispatch("FetchTheAnswer", this.$route.params.id);
          swal.fire('Thanks for contributions')
        })
        .catch(err => {
          swal.fire(err.response.data.message[0]);
          console.log(err.response.data.message[0]);
        });
    }
  }
};
</script>

<style scoped>
#textarea {
  width: 70vw;
  margin: 15px;
}
</style>