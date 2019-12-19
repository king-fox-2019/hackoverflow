<template>
  <div>
     <div class="header">
      <div>
        <h1>{{ question.title }}</h1>
      </div>
      <div>
        <router-link to="/questions/ask"><button class="button is-info">Ask Question</button></router-link>
      </div>
    </div>
    <hr>
        <div class="columns">
    <div class="column q-maths">
      <div class="question-counts-item" @click="upVote">
          <b-icon class="vote"
            pack="fas"
            icon="caret-up">
          </b-icon>
        </div>
      <div class="q-math num" >
        {{ totalVote }}
      </div>
      <div class="question-counts-item" @click="downVote">
          <b-icon class="vote"
            pack="fas"
            icon="caret-down">
          </b-icon>
        </div>
      </div>
      <div class="column question-details is-two-thirds">
        <div class="question-details-item" v-html="question.description">
        </div>
        <b-tag
        v-for="(tag, i) in question.tags" :key="i"
        class="tag-question clickable"
        ><span @click="$router.push(`/questions/tagged/${tag}`)">{{ tag }}</span></b-tag>
      </div>
      <div class="column question-poster has-text-grey">
        <div class="question-poster-item">
        {{ period }}
        </div>
        <div class="question-poster-item">
          <button class="button is-dark">{{ userInitial }}</button>
          <div>
          {{ question.user.username }}
          </div>
        </div>

      </div>
    </div>
    <div class="answer-count">{{question.answers.length}} Answers</div>
    <div>
      <Ans></Ans>
    </div>
  </div>

</template>

<script>
import period from '../helpers/period'
import { mapState } from 'vuex'
import Ans from '../components/Ans'

export default {
  name: 'QuestContent',
  components: {
    Ans
  },
  computed: {
    ...mapState(['question']),
    period () {
      return period.format(new Date(this.question.created_at))
    },
    userInitial () {
      return this.question.user.email.split('@')[0].charAt(0).toUpperCase()
    },
    totalVote () {
      return this.question.upVotes.length - this.question.downVotes.length
    }
  },
  methods: {
    getQuestion (id) {
      this.$store.dispatch('getQuestion', id)
    },
    upVote () {
      this.$store.dispatch('vote', {
        collection: 'questions',
        type: 'upvote',
        id: this.question._id,
        questionId: this.question._id
      })
    },
    downVote () {
      this.$store.dispatch('vote', {
        collection: 'questions',
        type: 'downvote',
        id: this.question._id,
        questionId: this.question._id
      })
    }
  },
  created () {
    this.getQuestion(this.$route.params.id)
  }
}
</script>

<style scoped>
.questions{
  text-align: left;
}
.question-counts {
  text-align: center;
}
.question-details {
  text-align: left;
  flex-grow: 1;
}
.question-poster {
  text-align: left;
  font-size: 12px;
}
.num {
  font-size: 25px;
}
.q-title {
  font-size: 22px;
  cursor: pointer;
}
.columns {
  padding: 5px;
}
h1 {
  font-size: 28px;
}
.header {
  display: flex;
  justify-content: space-between;
  margin: 15px;
}
.vote {
  cursor: pointer;
}
.answer-count {
  font-size: 20px;
  margin-left: 10px;
}
@media (max-width: 600px) {
  .question-counts {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
}
</style>
