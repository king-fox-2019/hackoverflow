<template>
  <b-container>
    <h1 class="text-info">Add New Question</h1>
    <b-form class="mt-5 w-75" @submit.prevent="addNewQuestion">
      <b-button
        class="close bg-light"
        variant="outline-light"
        :to="{path: '/'}"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </b-button>
      <b-form-group id="input-group-1" label="Title" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="title"
          type="text"
          required
          placeholder="Title"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Description" label-for="input-2">
        <b-form-textarea
          id="input-2"
          v-model="description"
          required
          placeholder="Description"
        ></b-form-textarea>
      </b-form-group>

      <b-button variant="info" type="submit">Ask!</b-button>
    </b-form>
  </b-container>
</template>

<script>
import axios from '@/utils/axios-instance';

export default {
  name: 'QuestionForm',
  data: function() {
    return {
      title: '',
      description: '',
    };
  },
  methods: {
    addNewQuestion() {
      axios
        .post(
          '/questions',
          {
            title: this.title,
            description: this.description,
          },
          {
            headers: {
              token: localStorage.getItem('token'),
            },
          },
        )
        .then(({data}) => {
          this.$root.$bvToast.toast('Success post question', {
            title: 'Success',
            autoHideDelay: 1500,
            variant: 'success',
            appendToast: true,
          });
          this.$store.dispatch('fetchAllQuestions');
          this.$router.replace({path: `question/${data._id}`});
        })
        .catch(error => {
          this.$bvToast.toast(error.response.data.errors, {
            title: 'Error',
            autoHideDelay: 1500,
            variant: 'danger',
            appendToast: true,
          });
        });
    },
  },
};
</script>
