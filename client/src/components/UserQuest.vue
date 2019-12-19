<template>
    <div class="banner">
    <strong class="has-text-info">YOUR OWN QUESTIONS</strong>
    <div v-for="question in userQuestions" :key="question._id">
      <div class="columns">
        <div class="column">
          {{ question.title }}
        </div>
        <div class="column">
          <a @click="$router.push(`/users/edit/question/${question._id}`)">edit</a>
          <a @click="removeQuestion(question._id)" style="margin-left: 10px;">delete</a>
        </div>
      </div>
    </div>
    <div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'userQuestions',
  computed: {
    ...mapState(['userQuestions'])
  },
  methods: {
    getUserQuestions () {
      this.$store.dispatch('getUserQuestions')
    },
    removeQuestion (id) {
      this.$store.dispatch('removeQuestion')
    }
  },
  created () {
    this.getUserQuestions()
  }
}
</script>

<style scoped>
.columns {
  display: flex;
  flex-direction: column;
}
.column {
  text-align: left;
  margin: 10px;
}
.banner {
  margin-left: 0%;
}
</style>
