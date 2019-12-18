<template>
  <v-container fluid>
    <v-layout 
      row v-for="question in questions" :key="question._id" 
      class="my-2 py-3"
      @click.stop="seeDetail(question._id)">
        <v-flex md1>
            <div class="text-center">
                <p class="ma-0">{{question.upvotes.length}}</p>
                <p class="ma-0">Votes</p>
            </div>
        </v-flex>
        <v-flex md1>
            <div class="text-center">
                <p class="ma-0">{{question.answers.length}}</p>
                <p class="ma-0">Answers</p>
            </div>
        </v-flex>
        <v-flex md10 class="px-4">
            <p>{{ question.title }}</p>
            <v-chip v-for="(tag, i) in question.tags" :key="i" class="mr-1"
            :color="isWatched(tag)">{{tag}}</v-chip>
        </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
    computed: {
        ...mapState(['questions', 'userTags'])
    },
    created() {
        this.$store.dispatch('fetchQuestions')
        this.$store.dispatch('fetchUserTags')
    },
    methods: {
        seeDetail(id) {
            this.$router.push(`/questions/${id}`)
        },
        isWatched(tag) {
            if (this.userTags.includes(tag)) {
                return "primary";
            }
        }
    }
}
</script>

<style scoped>
</style>