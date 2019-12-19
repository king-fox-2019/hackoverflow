<template>
  <div>
    <b-button v-b-modal.modal-1 variant="outline-light">Ask Question</b-button>

    <b-modal id="modal-1" title="Your Question" hide-footer>
      <b-form @submit.prevent="onSubmit" v-show="show">
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
import swal from 'sweetalert2';

export default {
  name: "AddQuestion",
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
    onSubmit() {
      axios({
        method: "post",
        url: "http://localhost:3000/questions/",
        data: this.form,
        headers: {token: localStorage.getItem('token')}
      })
        .then(({ data }) => {
          this.$store.dispatch("FetchAllQuestion");
          this.$bvModal.hide('modal-1');
          swal.fire("Your question is ready");
        })
        .catch(err => {
          swal.fire(err.response.data.message);
          console.log(err.response.data.message );
        });
    }
  }
};
</script>

<style>
</style>