<template>
    <div>
        <div v-if="editQuestion">
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
        </div>

        <vue-editor id="editor"
            useCustomImageHandler
            @image-added="handleImageAdded"
            v-model="content">
        </vue-editor>
        <v-btn class="my-2 float-right"
            v-if="!editQuestion"
            @click.prevent="submit">
            Submit
        </v-btn>
    </div>

</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
    props: ['editQuestion', 'submitEditQuestion'],
    data: () =>({
        title: '',
        content: '',
        tag: '',
        tags: []
    }),
    methods: {
        handleImageAdded(file, Editor, cursorLocation, resetUploader) {
            let formData = new FormData();
            formData.append("image", file);

            this.$store.dispatch('uploadImage', formData)
                .then(data => {
                    let url = data.image;

                    Editor.insertEmbed(cursorLocation, "image", url);
                    resetUploader();
                })
        },
        submit() {
            let isAddingQuestion = true;

            if (this.$route.matched[0].path == '/questions/:id') {
                isAddingQuestion = false;
            }

            if (isAddingQuestion) {
                this.$emit('content', this.content)
            } else {
                this.$emit('answer', this.content)
            }
            this.resetForm()
        },
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
        setEditorContent() {
            if (this.editQuestion) {
                this.title = this.editQuestion.title;
                this.content = this.editQuestion.description;
                this.tags = this.editQuestion.tags;
            } 
        },
        submitEditedQuestion() {
            this.$store.dispatch('editQuestion', {
                title: this.title,
                description: this.content,
                tags: this.tags,
                id: this.editQuestion._id
            })
            .then(data => {
                this.$emit('newData', data)
            })
        },
        resetForm() {
            this.title = '',
            this.description = ''
            this.content = ''
            this.tags = ''
        }
    },
    watch: {
        submitEditQuestion: function(submit) {
            if (submit == true) {
                this.submitEditedQuestion()
            }
        }
    },
    created() {
        this.setEditorContent()
    },
    components: {
      VueEditor
    }
}
</script>

<style>

</style>