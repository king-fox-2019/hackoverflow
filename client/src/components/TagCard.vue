<template>
  <div>
     <div class="card">
  <header class="card-header">
    <p class="card-header-title ">
      <b-icon
        icon="eye"
        size="is-small"
        style="margin-right: 5px;">
      </b-icon>
      Watched Tags
    </p>
  </header>
  <div class="card-content" style="text-align: center;">
    <div class="content">
      <div v-if="!showForm && tags.length === 0">
        <img src="https://cdn.sstatic.net/Img/ico-binoculars.svg?v=d4dbaac4eec9">
        <p style="font-size: 11px; margin-top: 5px;">Watch tags to curate your list of questions.</p>
        <b-button @click="showForm = true" style="background: #E1ECF4; color: #39739D;">
          <b-icon
          icon="eye"
          size="is-small"
          style="margin-right: 5px;">
          </b-icon>
          Watch a tag
        </b-button>
      </div>
      <div v-if="showForm || tags.length > 0">
        <div style="margin-bottom: 10px">
        <b-tag
        closable
        aria-close-label="Close tag"
         v-for="(tag, i) in tags" :key="i" class="tag clickable"
         @close="removeTag(tag)"><span @click="$router.push(`/questions/tag/${tag}`)">{{ tag }}</span></b-tag>
        </div>
        <TagForm></TagForm>
      </div>
    </div>
  </div>
  </div>
  </div>
</template>

<script>
import TagForm from './TagForm'
import { mapState } from 'vuex'

export default {
  name: 'Tag-Card',
  components: {
    TagForm
  },
  data: function () {
    return {
      showForm: false
    }
  },
  computed: mapState(['tags']),
  methods: {
    removeTag (tag) {
      let payload = { tag }
      this.$store.dispatch('removeTag', payload)
    }
  }
}
</script>

<style scoped>
.tag {
  margin-left: 5px;
  background: #E1ECF4 !important;
  color: #0077CC !important;
}
</style>
