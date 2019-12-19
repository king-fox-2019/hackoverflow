<template>
  <div>
    <section>
    <form @submit.prevent="createTag">
      <b-field>
        <b-autocomplete
          v-model="tag"
          :data="dataFilter"
          @select="opts => selected = option">
          <template slot="empty">No results found</template>
        </b-autocomplete>
        <p class="control">
          <button class="button is-info">Add</button>
        </p>
    </b-field>
    </form>
  </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: ['html', 'css', 'c++', 'c#', 'javascript', 'jquery', 'java', 'php', 'pyhton', 'mysql', 'sql', 'android', 'ios'],
      tag: '',
      selected: null
    }
  },
  computed: {
    dataFilter () {
      return this.data.filter((opts) => {
        return opts.toString().toLowerCase().indexOf(this.tag.toLowerCase()) >= 0
      })
    }
  },
  methods: {
    createTag () {
      console.log('create taggggg')
      let payload = {
        tag: this.tag
      }
      this.$store.dispatch('createTag', payload)
    }
  }
}
</script>

<style>

</style>
