<template>
<div>
  <section class="container">
			<div class="columns">
				<div class="column is-4">
					<aside class="menu">
						<div class="box content">
            <span><h2>QUESTION</h2></span>
            <span><h3>{{question.title}}</h3></span>
            <span class="tag is-dark">{{question.category}}</span>
            <span><h5>{{question.description}}</h5></span>
            <p><strong>{{question.UserId.username}}</strong></p><br>
            <button class="button is-link" @click="openModal">Update</button>&nbsp;
            <button class="button is-danger" @click="removeQuestion">Delete</button>
            
<div class="field is-grouped is-grouped-multiline">
            <div class="control">
              <div class="tags has-addons" @click.prevent="upvote">
                <span class="tag is-dark">{{ question.upvotes.length }}</span>
                <span class="tag is-success">Upvote</span>
              </div>
          
              <div class="control">
          <div class="tags has-addons" @click.prevent="downvote">
            <span class="tag is-dark">{{ question.downvotes.length }}</span>
            <span class="tag is-danger">Downvote</span>
          </div>
        </div>
            </div>
          
          </div>
          </div>
        <div class="box content">
            <span><h2>ADD ANSWER</h2></span>
            <div class="field">
        <label class="label">Title</label>
        <div class="control">
          <input class="input" type="text" placeholder="Answer title" v-model="title">
        </div>
      </div>
      <div class="field">
        <p class="control">
          <textarea class="textarea" placeholder="Description" v-model="description"></textarea>
        </p>
      </div>
      <div class="field">
        <p class="control">
          <button class="button" @click.prevent="checkAnswer">Post answer</button>
        </p>
      </div>
        </div>
					</aside>
				</div>
				<div class="column is-8">
					<div class="box content">
						<answer-card v-for="(answer, i) in answers"
              :key="i" :answer="answer"
              @loadAnswers="loadAnswers"
              @retrieveAnswer="retrieveAnswer"
            ></answer-card>
					</div>
				</div>
			</div>
		</section>
    <div :class="modalClass">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Edit Question</p>
          <button class="delete" aria-label="close" @click="closeModal"></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label class="label">Title</label>
            <div class="control">
              <input class="input" type="text" placeholder="Question title" v-model="questionTitle">
            </div>
          </div>
          <div class="field">
            <label class="label">Content</label>
            <div class="control">
              <textarea class="textarea" placeholder="Description" v-model="questionDescription"></textarea>
            </div>
          </div>
          <div class="field">
            <label class="label">Category</label>
            <div class="control">
              <div class="select">
                <select v-model="questionCategory">
                  <option>Javascript</option>
                  <option>Java</option>
                  <option>C#</option>
                  <option>C</option>
                  <option>Python</option>
                  <option>PHP</option>
                  <option>Jquery</option>
                  <option>HTML</option>
                  <option>C++</option>
                  <option>CSS</option>
                  <option>SQL</option>
                  <option>Ruby-on-rails</option>
                </select>
              </div>
            </div>
          </div>
          <div class="field is-grouped">
            <div class="control">
              <button class="button is-link" @click.prevent="updateQuestion">Submit</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import AnswerCard from '@/components/AnswerCard.vue'

export default {
  name: 'Question',
  data: function () {
    return {
      modalClass: 'modal',
      question: '',
      id: '',
      title: '',
      description: '',
      questionTitle: '',
      questionDescription: '',
      questionCategory: ''
    }
  },
  methods: {
    openModal: function () {
      this.modalClass = 'modal is-active'
    },
    closeModal: function () {
      this.modalClass = 'modal'
    },
    updateQuestion: function () {
      console.log('masuk updateq ')
      let obj = {
        title: this.questionTitle,
        description: this.questionDescription,
        category: this.questionCategory,
        id: this.question._id
      }
      this.modalClass = 'modal'
      return this.$store.dispatch('updateQuestion', obj)
    },
    removeQuestion: function () {
      axios({
      method: 'DELETE',
      url: `${this.$store.state.base_url}/questions/${this.$route.params.id}`,
      headers: {
        access_token: this.$store.state.access_token
      }
    })
      .then(question => {
        console.log(question.data)
        this.$router.push('/')
      })
      .catch(err => {
        console.log(err)
      })
    },
    upvote: function () {
      let obj = {
        type: 'upvotes',
        QuestionId: this.question._id 
      }
      return this.$store.dispatch('voteQuestion', obj)
    },
    downvote: function () {
      let obj = {
        type: 'downvotes',
        QuestionId: this.question._id 
      }
      return this.$store.dispatch('voteQuestion', obj)
    },
    loadAnswers: function () {
      return this.$store.dispatch('fetchAnswers', this.question._id)
    },
    checkAnswer: function () {
      if(!this.id) {
        return this.addAnswer()
      } else {
        return this.updateAnswer()
      }
    },
    updateAnswer: function () {
      let obj = {
        title: this.title,
        description: this.description,
        id: this.id
      }
      this.id = ''
      this.title = ''
      this.description = ''
      return this.$store.dispatch('updateAnswer', obj)
    },
    addAnswer: function () {
      let obj = {
        title: this.title,
        description: this.description,
        QuestionId: this.question._id
      }
      this.title = ''
      this.description = ''
      return this.$store.dispatch('addAnswer', obj)
    },
    retrieveAnswer: function (id) {
      console.log('masuk emit')
      axios({
        method: 'GET',
        url: `${this.$store.state.base_url}/answers/answer/${id}`,
        headers: {
          access_token: this.$store.state.access_token
        }
      })
        .then(answer => {
          this.id = answer.data._id
          this.title = answer.data.title
          this.description = answer.data.description
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  components: {
    AnswerCard
  },
  computed: {
    answers () {
      return this.$store.state.answers
    }
    // modalClass () {
    //   return this.$store.state.modalClass
    // },
    // questionTitle () {
    //   return this.$store.state.questionTitle
    // },
    // questionDescription () {
    //   return this.$store.state.questionDescription
    // },
    // questionCategory () {
    //   return this.$store.state.questionCategory
    // },
    // questionId () {
    //   return this.$store.state.questionId
    // }
  },
  created: function () {
    axios({
      method: 'GET',
      url: `${this.$store.state.base_url}/questions/${this.$route.params.id}`,
      headers: {
        access_token: this.$store.state.access_token
      }
    })
      .then(question => {
        console.log(this.question.data)
        this.question = question.data
        this.questionTitle = question.data.title
        this.questionDescription = question.data.description
        this.questionCategory = question.data.category
        return this.$store.dispatch('fetchAnswers', this.question._id)
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style scoped>
.container {
  /* margin-top: 1%; */
  margin-left: 3%
}
</style>