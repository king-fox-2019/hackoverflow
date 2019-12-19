<template>
  <div class="wysiwyg">
    <wysiwyg v-model="myHTML" />
    <div class="btn-section">
      <v-btn @click="submitAnswer" color="primary">Post your answer</v-btn>
    </div>
  </div>
</template>

<script>
import axios from '../../configs/axios'
import toast from '../mixins/toast'

export default {
  data: () => ({
    myHTML: ''
  }),

  methods: {
    submitAnswer () {
      axios({
        method: 'post',
        url: '/answers/' + this.$route.params.id,
        data: {
          description: this.myHTML
        }
      })
        .then(({ data }) => {
          this.toast(data.message)
          this.$store.dispatch('fetchAQuestion', { id: this.$route.params.id })
          this.myHTML = ''
        })
        .catch(err => {
          const errMessages = err.response.data.messages;
          if (errMessages) {
            this.danger(errMessages[0])
          } else {
            this.danger("Couldn't connect to server.");
          }
        })
    }
  },

  mixins: [toast]
};
</script>

<style>
  .btn-section {
  margin-top: 25px;
  }
</style>