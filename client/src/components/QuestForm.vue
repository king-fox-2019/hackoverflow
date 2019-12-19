<template>
  <div>
     <div class="Qform has-background-white">
      <form @submit.prevent="createQuestion">
        <b-field label="Title">
          <b-input v-model="title" placeholder="e.g. Is there an R function for finding the index of an element in a vector?"></b-input>
        </b-field>
        <wysiwyg v-model="description" />
          <b-field label="Enter some tags">
            <b-taginput
                v-model="tags"
                :data="tagFiltered"
                autocomplete
                icon="label"
                placeholder="Add a tag"
                @typing="getFilteredTags">
                <template slot-scope="props">
                  {{props.option}}
                </template>
                <template slot="empty">
                    There are no items
                </template>
            </b-taginput>
        </b-field>
        <button class="button is-info">Post Your Question</button>
      </form>
    </div>
  </div>
</template>

<script>
const data = ['javascript', 'java', 'c#', 'php', 'pyhton', 'android', 'jquery', 'html', 'c++', 'ios', 'css', 'mysql', 'sql']

export default {
  name: 'QuestForm',
  data () {
    return {
      title: '',
      description: '',
      tagFiltered: data,
      isSelectOnly: false,
      tags: [],
      newTag: false,
      openOnFocus: false
    }
  },
  methods: {
    createQuestion () {
      this.$store.dispatch('createQuestion', {
        title: this.title,
        description: this.description,
        tags: this.tags
      })
    },
    getFilteredTags (text) {
      this.filteredTags = data.filter((option) => {
        return option
          .toString()
          .toLowerCase()
          .indexOf(text.toLowerCase()) >= 0
      })
    }
  }
}
</script>

<style scoped>
.Qform {
  margin: 10px;
  text-align: left;
}
</style>
