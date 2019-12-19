<template>
  <div>
        <h1 class="my-3">Question Editor</h1>
        <v-text-field
            v-model="title"
            label="Title"
            required
        ></v-text-field>

        <v-text-field
            v-model="tag"
            label="Tags"
            required
            @keyup.enter="insertTag"
        ></v-text-field>
        <v-chip
        class="ma-2"
        close
        color="primary"
        outlined
        v-for="(tag, i) in tags" :key="i"
        @click:close="removeTag(tag)"
        >
        <v-icon left>mdi-label</v-icon>
            {{tag}}
        </v-chip>

        <Editor @content="submitQuestion"/>
  </div>
</template>

<script>
import Editor from '@/components/Editor'
export default {
    components: {
        Editor
    },
    data: () => ({
        title: '',
        content: '',
        tag: '',
        tags: []
    }),
    methods: {
        insertTag() {
            if (!this.tags.includes(this.tag)) {
                this.tags.push(this.tag);
            }  
            this.tag = ''
        },
        removeTag(tag) {
            let removed = this.tags.filter(item => {
                if (item != tag) {
                    return item;
                }
            })
            this.tags = removed;
        },
        submitQuestion(payload) {
            this.content = payload

            this.$store.dispatch('createQuestion', {
                title: this.title,
                description: this.content,
                tags: this.tags
            })
            .then(data => {
                this.$router.push(`/questions/${data._id}`)
            })
        }
    }
}
</script>

<style>

</style>