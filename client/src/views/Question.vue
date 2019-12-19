<template>
<b-container fluid>
  <b-row class="">
    <b-col cols="3">
      <img 
        src="../assets/ill.jpg" 
        style="width: 300px; height: 400px"
      />
    </b-col>
    <b-col cols="8">
      <div class="d-flex align-items-center my-2">
        <h3>{{ question.title }}</h3>
        <b-button
          v-if="question.author && question.author._id == userId"
          @click.prevent="deleteQuestion(question._id)"
          size="sm"
          class="ml-auto"
          variant="danger"
        >Delete This Question
        </b-button>
        <b-button
          v-if="question.author && question.author._id == userId"
          size="sm"
          class="ml-auto"
          variant="info"
          @click.prevent="editForm = !editForm"
        >Edit This Question
        </b-button>
        <b-button
          @click.prevent="answerForm = !answerForm"
          size="sm"
          class="ml-auto"
          variant="primary"
        >Answer This Question
        </b-button>
        <b-button
          size="sm"
          class="ml-auto"
          variant="primary"
          to="/ask"
        >Ask Question
        </b-button>
      </div>
      <QuestionDetails
        v-if="questionLoaded"
        class="my-2 rounded"
        :question="question"
        @fetchQ="fetchQuestion"
      ></QuestionDetails>
      <div v-if="editForm">
        <h4>Edit Question</h4>
        <b-form-input
          v-model="contentEdit.title"
          id="edit-title"
          class="my-2">
        </b-form-input>
        <wysiwyg v-model="contentEdit.description"/>
        <b-button
          @click.prevent="submitEdit"
          block
          class="my-2"
          type="submit"
          variant="primary"
        >Save
        </b-button>
      </div>
      <hr>
      <h4>Answer</h4>
      <div v-if="answerForm">
        <wysiwyg v-model="content.description"/>
        <b-button
          @click.prevent="onSubmit"
          block
          class="my-2"
          type="submit"
          variant="primary"
        >Submit
        </b-button>
      </div>
      <AnswerCard
        class="my-2 rounded"
        v-for="answer in answers"
        :key="answer._id"
        :answer="answer"
      ></AnswerCard>
    </b-col>
  </b-row>
</b-container>
</template>

<script>
import axios from '../api/server'
import QuestionDetails from '../components/QuestionDetails'
import AnswerCard from '../components/AnswerCard'
import { mapState } from 'vuex'

export default {
  name: 'Question',
  components: {
    QuestionDetails,
    AnswerCard
  },
  data () {
    return {
      question: {},
      questionLoaded: false,
      content: {
        description: ''
      },
      answerForm: false,
      editForm: false,
      userId: '',
      contentEdit: {
        title: '',
        description: ''
      }
    }
  },
  methods: {
    fetchQuestion () {
      return axios({
        method: 'get',
        url: `/questions/${this.$route.params.questionId}`
      })
        .then(({ data }) => {
          this.question = data
          this.contentEdit.title = data.title,
          this.contentEdit.description = data.description,
          this.questionLoaded = true
        })
        .catch(err => {
          console.log(err)
        })
    },
    onSubmit () {
      let payload = {
        questionId: this.$route.params.questionId,
        content: this.content
      }
      this.$store.dispatch('submitAnswer', payload)
      this.answerForm = false
      this.content.description = ''
    },
    submitEdit () {
      let payload = {
        questionId: this.$route.params.questionId,
        content: this.contentEdit
      }
      this.$store.dispatch('submitEdit', payload)
        .then(() => {
          this.fetchQuestion()
        })
      this.editForm = false
      this.contentEdit.description = ''
      
    },

    deleteQuestion (questionId) {
      this.$store.dispatch('deleteQuestion', questionId)
    }
  },
  computed: {
    ...mapState(['answers']),
    questionId () {
      return this.$route.params.questionId
    }
  },
  created () {
    this.userId = localStorage.getItem('userId')
    this.fetchQuestion()
    this.$store.dispatch('fetchAnswers', this.questionId)
  }
}
</script>

<style>

</style>
