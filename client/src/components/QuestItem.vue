<template>
  <div class="question-item">
    <div class="row">
      <div class="col-sm-1 text-right" v-if="$store.state.isLogin">
        <span @click="upvote"><i class="fa fa-arrow-up"></i></span>
        <span @click="downvote"><i class="fa fa-arrow-down"></i></span>
      </div>
      <div class="col-sm-1 status">
        <div class="number">{{question.votes.length - question.downvotes.length}}</div>
        Vote
      </div>
      <div class="col-sm-1 status">
        <div class="number">{{question.answers.length}}</div>
        Answer
      </div>
      <div class="col-sm-9 p-2">
        <h4>{{question.title}}</h4>
        <div>
          {{question.content}}
        </div>
        <div class="text-right">
          <button class="btn btn-warning btn-sm m-2" @click="viewAnswer">View Answer</button>
          <button type="button" class="btn btn-warning btn-sm m-2" v-if="$store.state.isLogin" @click="popModal"> Add Answer </button>
          <a href="#" @click.prevent="deleteQuestion" v-if="$store.state.isLogin"><i class="fa fa-trash"></i></a>
        </div>
      </div>
    </div>
    <AnswerList v-if="showAnswer" :question="question._id" @refresh="refresh"/>
    <b-modal :id="`modal-${question._id}`" title="Add answer" hide-footer>
      <div class="box">
        <form action="" @submit.prevent="addAnswer" method="post">
          <div class="form-group">
            <label for="answer">answer</label>
            <input required id="answer" type="text" class="form-control" v-model="answer"/>
          </div>
          <div class="form-group justify-content-center d-flex">
            <button type="submit" class="btn btn-primary">Post answer</button>
          </div>
        </form>
      </div>
    </b-modal>
  </div>
</template>

<script>
import AnswerList from './AnswerList'
import axios from '../config/api'
export default {
  name: 'QuestItem',
  components: {
    AnswerList
  },
  data: function () {
    return {
      answer: '',
      showAnswer: false
    }
  },
  props: {
    question: Object
  },
  methods: {
    deleteQuestion () {
      axios({
        method: 'delete',
        url: `/question/${this.question._id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          this.$store.dispatch('fetchData')
        })
        .catch(() => {
          this.$swal.fire(
            'sumting wong',
            'unAuthorized!',
            'error'
          )
        })
    },
    refresh () {
      this.viewAnswer()
      setTimeout(() => {
        this.viewAnswer()
      }, 1000)
    },
    upvote () {
      axios({
        method: 'PATCH',
        url: `/question`,
        data: {
          question: this.question._id
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          this.$store.dispatch('fetchData')
        })
        .catch(() => {
          this.$swal.fire(
            'sumting wong',
            'alredy voted',
            'error'
          )
        })
    },
    downvote () {
      axios({
        method: 'PATCH',
        url: `/question/downvote`,
        data: {
          question: this.question._id
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          this.$store.dispatch('fetchData')
        })
        .catch(() => {
          this.$swal.fire(
            'sumting wong',
            'alredy voted',
            'error'
          )
        })
    },
    viewAnswer () {
      this.showAnswer = !this.showAnswer
    },
    popModal () {
      this.$bvModal.show(`modal-${this.question._id}`)
    },
    addAnswer () {
      let payload = {
        content: this.answer,
        question: this.question._id
      }
      this.viewAnswer()
      this.$store.dispatch('addAnswer', payload)
        .then(() => {
          this.viewAnswer()
          this.answer = ''
        })
      this.$bvModal.hide(`modal-${this.question._id}`)
    }
  }
}
</script>

<style scoped>
.question-item {
  padding: 1em
}
.status {
  border: 1px solid orange;
  font-size: 0.6em;
  height: 3.5rem;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
}
.number {
  color: aqua;
  font-size: 1.6rem
}
</style>
