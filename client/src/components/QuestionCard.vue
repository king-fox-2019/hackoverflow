<template>
  <v-flex>
    <v-card  color="white" flat>
      <v-layout row>
        <v-flex xs1>
          <v-btn @click="upVote(q.userId)" flat icon color="pink">
            <v-icon>expand_less</v-icon>
          </v-btn>
          <h4 v-if="q">{{totalvote}}</h4>
          <v-btn @click="downVote(q.userId)" flat icon color="pink">
            <v-icon>expand_more</v-icon>
          </v-btn>
        </v-flex>

        <v-flex xs12>
          <v-layout row>
            <h3 class="mt-4 text-align-left">{{q.title}}</h3>
          </v-layout>
          <v-layout row>
            <span class="mt-2 text-align-left" v-html="q.description"></span>
          </v-layout>
        </v-flex>
      </v-layout>

      <v-layout row>
        <v-card-actions>
          <h4 class="body-1 font-italic ml-4">Asked by : {{q.userId.email.split('@')[0]}}</h4>
          <div v-if="q.tags.length == 0">
          <h4 class="body-1 font-italic ml-4">Tags : None</h4>
          </div>
          <div v-else>
          <h4 class="body-1 font-italic ml-4">Tags : {{q.tags.join(', ')}}</h4>
          </div>

          <router-link :to="{ name: 'question-detail', params: { id: q._id}}"><v-btn class="ml-3" flat color="black" >View Thread</v-btn></router-link>
            <router-link :to="{ name: 'edit-question', params: { id: q._id}}"><v-btn class="ml-3" flat color="black"  v-if="this.$store.state.userId ==  q.userId._id " >Edit          </v-btn>
          </router-link>
          <v-btn
            @click="deleteQuestion(q._id)"
            class="ml-3"
            flat
            color="black"
             v-if="this.$store.state.userId ==  q.userId._id"
          >Delete</v-btn>
        </v-card-actions>
      </v-layout>
    </v-card>
  </v-flex>
</template>

<script>
import Swal from 'sweetalert2'
import { mapState } from 'vuex'
export default {
  props: ['q'],
  data () {
    return {
      totalvote: null
    }
  },
  created () {
    this.calculate()
  },
  methods: {
    calculate () {
      this.totalvote = +this.q.upVotes.length - +this.q.downVotes.length
    },
    deleteQuestion (id) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      })
        .then((result) => {
          if (result.value) {
            this.axios.delete(`/questions/delete/${id}`, {
              headers: {
                token: localStorage.getItem('token')
              }
            })
              .then((deleted) => {
                Swal.fire(
                  'Deleted!',
                  'Your question has been deleted.',
                  'success'
                )
                this.$store.dispatch('getMyQuestions')
              })
          }
        })
        .catch(err => {
          console.log('err => ', err)
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Something went wrong!'
          })
        })
      this.$store.dispatch('getQuestions')
    },
    upVote (userId) {
      this.axios
        .patch(
          `questions/upvote/${this.q._id}/`,
          { userId },
          { headers: { token: localStorage.getItem('token') } }
        )
        .then(({ data }) => {
          this.totalvote = data.upVotes.length - data.downVotes.length
        })
        .catch(err => {
          console.log('err => ', err)
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: err.response.data.message
          })
        })
    },
    downVote (userId) {
      this.axios
        .patch(
          `questions/downvote/${this.q._id}/`,
          { userId },
          { headers: { token: localStorage.getItem('token') } }
        )
        .then(({ data }) => {
          this.totalvote = data.upVotes.length - data.downVotes.length
        })
        .catch(err => {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: err.response.data.message
          })
        })
    }
  },
  computed: {
    ...mapState(['oneQuestionDetails', 'answersOnThisQuestion'])
  }
}
</script>

<style scoped>

</style>
