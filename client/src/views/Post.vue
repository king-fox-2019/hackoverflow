<template>
  <b-container>
    <b-col class="text-center my-5" cols="12">
      <h1>Post a Question</h1>
    </b-col>
    <b-form @submit.prevent="postQuestion" novalidate>
      <b-row align-v="center">
        <b-col cols="12" md="8">
          <b-form-input
            v-model="title"
            :state.sync="validateTitle"
            @focus="validateTitle = null"
            required
            placeholder="Add Title"
            autocomplete="off"
            autofocus
          ></b-form-input>
        </b-col>
        <b-col class="mt-2 mt-md-0" order="2" order-md="0" cols="12" sm="4">
          <b-button type="submit" variant="primary">Post Question</b-button>
        </b-col>
        <b-col class="mt-2" cols="12" sm="8" md="6" lg="4">
          <b-form-input
            v-model="tags"
            required
            placeholder="Add Tags"
            autocomplete="off"
          ></b-form-input>
        </b-col>
        <b-col order="1" order-sm="0" class="mt-sm-2" cols="12" sm="auto">
          <small class="text-muted">Separate each tags using comma</small>
        </b-col>
      </b-row>
    </b-form>

    <!-- <tags-input
      :wrapper-class="{ 'tags-input-wrapper-default': onTagsFocus }"
      v-model="tags"
      @focus="onTagsFocus = true"
    ></tags-input>-->

    <vue-editor
      class="mt-2"
      v-model="description"
      placeholder="Describe your problems..."
      ref="editor"
    ></vue-editor>
  </b-container>
</template>

<script>
import { VueEditor } from 'vue2-editor'

export default {
  name: 'WritePage',
  components: {
    VueEditor
  },
  props: ['articleid'],
  data() {
    return {
      title: '',
      description: '',
      // tags: [],
      tags: '',
      onTagsFocus: false,
      validateTitle: null
    }
  },
  methods: {
    postQuestion() {
      const { title, description, tags } = this
      if (!title) {
        this.$toasted.show('Question title required', { type: 'error' })
        this.validateTitle = false
        return
      }
      if (this.$refs.editor.quill.getText().length <= 1) {
        this.$toasted.show('Question description required', { type: 'error' })
        return
      }

      this.$store
        .dispatch('postQuestion', { title, description, tags })
        .then(({ data }) => {
          this.$toasted.show(data.message)
          this.$router.push(`/questions/${data.data._id}`)
        })
        .catch(({ response }) =>
          response.data.message.forEach(msg =>
            this.$toasted.show(msg, { type: 'error' })
          )
        )
    }
  }
}
</script>

<style lang="scss">
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
