<template>
    <section>
        <b-field label="Enter some tags">
            <b-taginput
                v-model="tags"
                :data="filteredTags"
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
        <pre style="max-height: 400px"><b>Tags:</b>{{ tags }}</pre>
    </section>
</template>

<script>
const data = ['javascript', 'java', 'c#', 'php', 'pyhton', 'android', 'jquery', 'html', 'c++', 'ios', 'css', 'mysql', 'sql']

export default {
  data () {
    return {
      filteredTags: data,
      isSelectOnly: false,
      tags: []
    }
  },
  methods: {
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
