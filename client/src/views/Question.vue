<template>
  <b-container class="mt-4" v-if="question">
    <h2>{{ question.title }}</h2>
    <div class="d-flex flex-wrap mb-2">
      <b-badge
        class="mr-2"
        variant="secondary"
        v-for="tag in question.tags"
        :key="tag"
        :to="`/search?search=${tag}`"
        >{{ tag }}</b-badge
      >
    </div>

    <hr class="mb-5 border-primary" />

    <b-media>
      <template v-slot:aside>
        <div
          class="vote-box d-flex flex-column align-items-center justify-content-between"
        >
          <div class="text-center vote" @click="voteQuestion('up')">
            <font-awesome-icon
              :class="{
                'text-danger': question.upvotes.includes($store.state.id),
                'text-accent': !question.upvotes.includes($store.state.id)
              }"
              icon="caret-up"
              size="3x"
            ></font-awesome-icon>
          </div>
          <div>
            <h2 class="m-0 p-0 text-secondary">
              {{ question.upvotes.length - question.downvotes.length }}
            </h2>
          </div>
          <div class="text-center vote" @click="voteQuestion('down')">
            <font-awesome-icon
              :class="{
                'text-danger': question.downvotes.includes($store.state.id),
                'text-accent': !question.downvotes.includes($store.state.id)
              }"
              icon="caret-down"
              size="3x"
            ></font-awesome-icon>
          </div>
        </div>
      </template>
      <div class="question-desc">
        <p v-html="question.description"></p>
      </div>
      <div class="text-right mr-3">
        <small class="text-muted d-block mb-2"
          >Asked by
          {{
            question.author._id == $store.state.id
              ? 'You'
              : question.author.email
          }}</small
        >
        <b-button
          variant="outline-secondary"
          size="sm"
          v-if="question.author._id == $store.state.id"
          :to="`/edit/${question._id}`"
          >Edit Question</b-button
        >
        <b-button
          :id="question._id"
          class="ml-3"
          variant="outline-danger"
          size="sm"
          v-if="question.author._id == $store.state.id"
          ><font-awesome-icon icon="trash-alt"></font-awesome-icon
        ></b-button>

        <b-popover
          :target="question._id"
          triggers="click blur"
          placement="top-right"
        >
          <template v-slot:title>Are you sure?</template>
          <p>All answers for this question will also be deleted</p>
          <b-button
            class="text-center"
            variant="outline-danger"
            @click="removeQuestion"
            >Remove Question</b-button
          >
        </b-popover>
      </div>
    </b-media>

    <ul class="list-unstyled">
      <div v-for="answer in question.answers" :key="answer._id">
        <hr class="border-primary mt-5" />
        <b-media class="my-4" tag="li">
          <template v-slot:aside>
            <div
              class="vote-box d-flex flex-column align-items-center justify-content-between"
            >
              <div
                class="text-center vote"
                @click="voteAnswer('up', answer._id)"
              >
                <font-awesome-icon
                  :class="{
                    'text-danger': answer.upvotes.includes($store.state.id),
                    'text-accent': !answer.upvotes.includes($store.state.id)
                  }"
                  icon="caret-up"
                  size="3x"
                ></font-awesome-icon>
              </div>
              <div>
                <h2 class="m-0 p-0 text-secondary">
                  {{ answer.upvotes.length - answer.downvotes.length }}
                </h2>
              </div>
              <div
                class="text-center vote"
                @click="voteAnswer('down', answer._id)"
              >
                <font-awesome-icon
                  :class="{
                    'text-danger': answer.downvotes.includes($store.state.id),
                    'text-accent': !answer.downvotes.includes($store.state.id)
                  }"
                  icon="caret-down"
                  size="3x"
                ></font-awesome-icon>
              </div>
            </div>
          </template>
          <div class="answer-content">
            <p v-html="answer.content"></p>
          </div>
          <div class="text-right mr-3">
            <small class="text-muted d-block mb-2">
              {{
                answer.author._id == $store.state.id
                  ? 'You'
                  : answer.author.email
              }}</small
            >
            <b-button
              class="text-right"
              variant="outline-secondary"
              size="sm"
              v-if="answer.author._id == $store.state.id"
              :to="`/questions/${$route.params.id}/editanswer/${answer._id}`"
              >Edit Answer</b-button
            >

            <b-button
              :id="answer._id"
              class="ml-3"
              variant="outline-danger"
              size="sm"
              v-if="answer.author._id == $store.state.id"
              ><font-awesome-icon icon="trash-alt"></font-awesome-icon
            ></b-button>

            <b-popover
              :target="answer._id"
              triggers="click blur"
              placement="top-right"
            >
              <template v-slot:title>Are you sure?</template>
              <p>This can't be undone</p>
              <b-button
                class="text-center"
                variant="outline-danger"
                @click="removeAnswer(answer)"
                >Remove Answer</b-button
              >
            </b-popover>
          </div>
        </b-media>
      </div>
    </ul>

    <div class="editor-wrapper">
      <hr class="mt-5 border-primary" />
      <h4 class="d-inline-block mr-5 mb-0">
        {{ $route.params.answerId ? 'Edit Answer' : 'Write your answer' }}
      </h4>
      <b-button
        class="mb-2  mt-2 mt-sm-0"
        variant="primary"
        @click="postAnswer"
        >{{ $route.params.answerId ? 'Save' : 'Post Answer' }}</b-button
      >
      <vue-editor
        class="mt-2 mb-5"
        v-model="content"
        placeholder="Describe your problems..."
        ref="editor"
      ></vue-editor>
    </div>
  </b-container>
</template>

<script>
import { VueEditor } from 'vue2-editor'

export default {
  name: 'QuestionDetail',
  components: {
    VueEditor
  },
  data() {
    return {
      question: null,
      content: ''
    }
  },
  watch: {
    '$route.params.answerId'(val) {
      if (val) {
        for (const answer of this.question.answers) {
          if (answer._id == val) {
            this.content = answer.content
            return window.scrollTo(0, document.body.scrollHeight)
          }
        }
      } else {
        this.content = ''
        this.getQuestionDetail()
      }
    }
  },
  methods: {
    getQuestionDetail() {
      return this.$store
        .dispatch('getQuestionDetail', this.$route.params.id)
        .then(({ data }) => (this.question = data.data))
        .catch(({ response }) => {
          response.data.message.forEach(msg =>
            this.$toasted.show(msg, { type: 'error' })
          )
          this.$router.replace('/')
        })
    },
    voteQuestion(side) {
      this.$store
        .dispatch('onVoteQuestion', { side, id: this.$route.params.id })
        .then(({ data }) => {
          this.$toasted.show(data.message)
          this.question = data.data
        })
        .catch(({ response }) =>
          response.data.message.forEach(msg =>
            this.$toasted.show(msg, { type: 'error' })
          )
        )
    },
    voteAnswer(side, id) {
      this.$store
        .dispatch('onVoteAnswer', { side, id })
        .then(({ data }) => {
          this.$toasted.show(data.message)
          this.getQuestionDetail()
        })
        .catch(({ response }) =>
          response.data.message.forEach(msg =>
            this.$toasted.show(msg, { type: 'error' })
          )
        )
    },
    postAnswer() {
      const { content } = this
      if (this.$refs.editor.quill.getText().length <= 1) {
        this.$toasted.show('Answer content required', { type: 'error' })
        return
      }

      this.$store
        .dispatch(this.$route.params.answerId ? 'editAnswer' : 'postAnswer', {
          content,
          id: this.$route.params.id,
          answerId: this.$route.params.answerId
        })
        .then(({ data }) => {
          this.$toasted.show(data.message)
          if (this.$route.params.answerId)
            this.$router.push(`/questions/${this.$route.params.id}`)
          else this.getQuestionDetail()
          this.content = ''
        })
        .catch(({ response }) =>
          response.data.message.forEach(msg =>
            this.$toasted.show(msg, { type: 'error' })
          )
        )
    },
    removeQuestion() {
      this.$store
        .dispatch('onRemoveQuestion', this.question._id)
        .then(({ data }) => {
          this.$toasted.show(data.message)
          this.$router.replace('/')
        })
        .catch(({ response }) =>
          response.data.message.forEach(msg =>
            this.$toasted.show(msg, { type: 'error' })
          )
        )
    },
    removeAnswer(answer) {
      this.$store
        .dispatch('onRemoveAnswer', answer._id)
        .then(({ data }) => {
          this.$toasted.show(data.message)
          this.getQuestionDetail()
        })
        .catch(({ response }) =>
          response.data.message.forEach(msg =>
            this.$toasted.show(msg, { type: 'error' })
          )
        )
    }
  },
  created() {
    this.getQuestionDetail().then(() => {
      if (this.$route.params.answerId) {
        for (const answer of this.question.answers) {
          if (answer._id == this.$route.params.answerId) {
            this.content = answer.content
            return window.scrollTo(0, document.body.scrollHeight)
          }
        }
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.question-desc,
.answer-content {
  width: 65vw !important;
  overflow-x: scroll;
}

.vote-box {
  width: 4rem;
}

.vote {
  margin: -0.5rem;
  cursor: pointer;
}

.editor-wrapper {
  height: 70vh;
}

.quillWrapper {
  height: 40vh !important;

  #quill-container {
    margin-bottom: 1rem;
    overflow-y: scroll;

    .ql-editor {
      // margin-top: 1rem;
      margin-bottom: 3rem;
      height: auto;
    }
  }

  .ql-toolbar {
    display: flex;
    width: 100%;
    overflow-x: scroll;

    .ql-formats {
      display: block !important;
      flex-shrink: 0;
      width: auto;
      .ql-picker-item {
        color: #444;
      }

      span:hover,
      button:hover,
      svg:hover,
      .ql-active,
      .ql-selected {
        color: var(--primary) !important;
        .ql-stroke {
          stroke: var(--primary) !important;
        }
        .ql-fill {
          fill: var(--primary) !important;
        }
      }
    }
  }
}
</style>
