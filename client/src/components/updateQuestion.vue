<template>
  <div>
    <b-button v-b-modal.modal-2 variant="outline-dark" @click.prevent="fetch">Edit</b-button>

    <b-modal id="modal-2" title="Your Question" hide-footer>
      <b-form @submit.prevent="updateThis(payload._id)">
        <b-form-group id="input-group-1" label="Title:" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="form.title"
            type="text"
            required
            placeholder="title..."
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Description:" label-for="input-2">
          <b-form-textarea
            id="textarea"
            v-model="form.body"
            placeholder="Describe your problemo..."
            required
            rows="3"
            max-rows="6"
          ></b-form-textarea>
        </b-form-group>

        <b-form-group id="input-group-3" label="About:" label-for="input-3">
          <b-form-input
            id="input-3"
            v-model="form.about"
            type="text"
            required
            placeholder="What skill will help this problemo?.."
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
import swal from "sweetalert2";

export default {
  name: "updateQuestion",
  props:['data'],
  data() {
    return {
      form: {
        title: "",
        body: "",
        about: ""
      },
      show: true
    };
  },
  methods: {
    fetch() {
        this.$store.dispatch("FetchOneQuestion", this.$route.params.id)
        .then(data => {
            this.form.title = this.$store.state.oneQuestion.title
            this.form.body = this.$store.state.oneQuestion.body
            this.form.about  = this.$store.state.oneQuestion.about
        })
    },
    updateThis(id) {
      axios({
        url: `http://localhost:3000/questions/${id}`,
        method: "patch",
        headers: { token: localStorage.getItem("token") },
        data: this.form
      })
        .then(({ data }) => {
          swal.fire(`${data.title} has been update`);
          this.$bvModal.hide("modal-2");
          this.$store.dispatch("FetchOneQuestion", this.$route.params.id);
          this.$store.dispatch("FetchTheAnswer", this.$route.params.id);
        })
        .catch(err => {
          swal.fire(err.response.data.message);
        });
    }
  },
  computed: {
      questionData(){
          return this.$store.state.oneQuestion
      }
  }
};
</script>

<style>
</style>