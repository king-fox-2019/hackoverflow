<template>
  <div class="container QPage">
        <div class="header">
      <div>
        <h1 v-if="!tag">All Questions</h1>
        <h1 v-if="tag">Questions tagged [{{ tag }}]</h1>
      </div>
      <div>
        <router-link to="/questions/ask"><button class="button is-info">Ask Question</button></router-link>
      </div>
    </div>
    <hr>
     <div class="columns">
      <div class="column">
        <Quest v-for="question in questions" :key="question._id" :question="question">
        </Quest>
      </div>
      <div class="column is-narrow">
        <TagCard></TagCard>
      </div>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import Quest from '../components/Quest'
import TagCard from '../components/TagCard'

export default {
  name: 'Questions',
  components: {
    Quest,
    TagCard
  },
  methods : {
  
  },
  computed: {
    tag () {
      return this.$route.params.tag
    },
    ...mapState(['questions', 'tags', 'loggedUser'])
  },
  created () {
    if (this.questions.length === 0) {
      this.$store.dispatch('getQuestions', this.tag)
    }
    this.$store.dispatch('getTags')

   
  },
  watch: {
    tag () {
      this.$store.dispatch('getQuestions', this.tag)
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 30px;
}
.header {
  margin: 14px;
  display: flex;
  justify-content: space-between;
}
.QPage {
  width: 60vw;
}
</style>
