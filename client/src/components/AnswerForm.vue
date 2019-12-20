<template>
  <div v-if="username" class="mt-5">
    <h1>Your answer</h1>
    <b-form @submit.prevent="addAnswer">
      <b-form-group id="input-group-1" label-for="input-1">
        <b-form-textarea
          id="input-1"
          v-model="description"
          required
          placeholder="Your answer"
        ></b-form-textarea>
      </b-form-group>
      <b-button type="submit" variant="info">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
import axios from '@/utils/axios-instance';

export default {
  name: 'AnswerForm',
  props: ['questionId'],
  data: function() {
    return {
      description: '',
    };
  },
  computed: {
    username() {
      return this.$store.state.username;
    },
  },
  methods: {
    addAnswer() {
      axios
        .post(
          '/answers',
          {
            description: this.description,
            questionId: this.questionId,
          },
          {
            headers: {
              token: localStorage.getItem('token'),
            },
          },
        )
        .then(({data}) => {
          this.$bvToast.toast('Success add your asnwer', {
            title: 'Success',
            variant: 'success',
            autoHideDelay: 1500,
            appendToast: true,
          });
          this.$store.dispatch('fetchSingelQuestion', this.questionId);
        })
        .catch(error => {
          this.$bvToast.toast('Error happen, check console log', {
            title: 'Error',
            variant: 'danger',
            autoHideDelay: 1500,
            appendToast: true,
          });
          console.log(error);
        });
    },
  },
};
</script>
