<template>
  <b-container id="home" style="display:flex; flex-direction:row">
    <div>
      <b-card title="Questions" class="shadow bg-white" style="border-radius: 5px"></b-card>
      <Question v-for="question in questions" :key="question._id" :question="question" />
    </div>
    <div class="ml-3">
      <b-card>
          <p>
            <button class="btn btn-warning" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
              Watched Tags
            </button>
          </p>
          <div class="collapse" id="collapseExample">
              <b-form @submit.prevent="addTag">
                <b-form-input id="watchedTag" class="my-2" v-model="tag" type="text" placeholder="Input a tag" required></b-form-input>
              </b-form>
          </div>
          <div id="tags" class="mt-2">
            <b-button v-for="(tag, i) in $store.state.tags" :key="i" variant="outline-secondary" size="sm" pill style="font-size: 0.8em; margin-left: 5px" @click="fetchTagQuestions(tag)">{{ tag }}</b-button>
          </div>
      </b-card>
    </div>
  </b-container>
</template>

<script>
// @ is an alias to /src
import Question from '@/components/Question'
import { mapState } from 'vuex'

export default {
  name: 'home',
  components: { Question },
  computed: mapState(['questions']),
  data(){
    return {
      tag: ''
    }
  },
  methods: {
    goToDetail (id) {
      this.$router.push(`/questions/${id}`)
    },
    addTag () {
      this.$store.dispatch('addTag', {tag: this.tag})
      this.tag = ''
    },
    fetchTagQuestions (tag) {
      this.$store.dispatch('fetchTagQuestions',{tag})
    }
  },
  created () {
    this.$store.dispatch('fetchQuestions')
    this.$store.dispatch('fetchTags')
  }
}
</script>
