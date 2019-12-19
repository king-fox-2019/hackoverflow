<template>
    <div>
        <v-chip
        class="ma-2"
        v-for="(tag, i) in tags" :key="i"
        close
        @click="addToSelected(tag)"
        :color="isSelected(tag)"
        @click:close="removeTag(tag)"
        >
        {{tag}}
        </v-chip>
        <v-layout 
        row v-for="question in filteredQuestions" :key="question._id" 
        class="my-2 py-3"
        @click.stop="seeDetail(question._id)">
            <v-flex class="px-4">
                <h3>{{ question.title }}</h3>
                <v-chip v-for="(tag, i) in question.tags" :key="i">{{tag}}</v-chip>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data: () => ({
        selectedTags: []
    }),
    methods: {
        addToSelected(tag) {
            this.selectedTags.unshift(tag)
        },
        isSelected(tag) {
            if (this.selectedTags.includes(tag)) {
                return "primary"
            }
        },
        removeTag(tag) {
            let removed = this.selectedTags.filter(item => {
                if (item != tag) {
                    return item;
                }
            })
            this.selectedTags = removed;
        },
        seeDetail(id) {
            this.$router.push(`/questions/${id}`)
        }
    },
    created() {
        this.$store.dispatch('fetchQuestions')
    },
    computed: {
        ...mapState({
            tags: state => state.tags,
            filteredQuestions(state) {
                let result = [];
                
                state.questions.forEach(item => {
                    this.selectedTags.forEach(tag => {
                        if (item.tags.includes(tag) && !result.includes(item)) {
                            result.push(item);
                        }
                    })
                })
                return result;
            }
        })
    }
}
</script>

<style>

</style>