<template>
  <div class="wysiwyg"> 
    <v-text-field 
      v-model="title" 
      label="Title" 
      name="title" 
      prepend-icon="" 
      type="text" />
    <VueEditor v-model="myHTML"/>
    <div class="btn-section">
      <v-btn @click="updateQuestion" color="primary">Update</v-btn>
    </div>
  </div>
</template>

<script>
import axios from '../../configs/axios'
import toast from '../mixins/toast'
import { mapState } from 'vuex'
import { VueEditor } from 'vue2-editor'

export default {
  data: () => ({
    title: '',
    myHTML: ''
  }),

  mounted () {
    this.$store.dispatch('fetchAQuestion', this.$route.params)
    this.title = this.question.title
    this.myHTML = this.question.description
  },

  methods: {
    updateQuestion () {
      console.log('ini route params', this.$route.params.id);
      axios({
        method: 'put',
        url: '/questions/' + this.$route.params.id,
        headers: { access_token: localStorage.getItem('access_token') },
        data: {
          title: this.title,
          description: this.myHTML
        }
      })
        .then(({ data }) => {
          this.toast(data.message)
          this.$router.push('/questions/' + this.$route.params.id)
          // console.log('ini submit question', data);
        })
        .catch(err => {
          const errMessages = err.response.data.messages;
          if (errMessages) {
            errMessages.forEach(errMessage => {
              this.danger(errMessage);
            });
          } else {
            this.danger("Couldn't connect to server.");
          }
        })
    }
  },

  computed: {
    ...mapState(['question'])
  },

  components: { VueEditor },

  mixins: [toast]
};
</script>

<style scoped>
.wysiwyg {
  margin: 20% 10%;
}

.btn-section {
  margin-top: 25px;
}
</style>