<template>
    <v-container>
        <div class="d-flex justify-space-between">
            <h2 class="py-4">{{question.title}}</h2>
            <div>
                <v-dialog v-model="editDialog" fullscreen hide-overlay transition="dialog-bottom-transition">
                    <template v-slot:activator="{ on }">
                        <v-btn color="primary" dark v-on="on" class="mx-4" v-if="userEmail">Edit</v-btn>
                    </template>
                    <v-card>
                        <v-toolbar dark color="primary">
                        <v-btn icon dark @click="editDialog = false">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                        <v-toolbar-title>Edit Question</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-toolbar-items>
                            <v-btn dark text @click="submitQuestion">Save</v-btn>
                        </v-toolbar-items>
                        </v-toolbar>
                        <Editor :editQuestion="question" :submitEditQuestion="submitEditQuestion" @newData="setNewData" />     
                    </v-card>
                </v-dialog>
                <v-dialog
                    v-model="dialog"
                    width="500"
                    >
                    <template v-slot:activator="{ on }">
                        <v-btn
                        v-if="userEmail"
                        color="red lighten-2"
                        dark
                        v-on="on"
                        >
                        Delete
                        </v-btn>
                    </template>

                    <v-card>
                        <v-card-title
                        class="headline grey lighten-2"
                        primary-title
                        >
                        Delete
                        </v-card-title>

                        <v-card-text class="mt-5">
                            Are you sure you want to delete this question?
                        </v-card-text>

                        <v-divider></v-divider>

                        <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="primary"
                            text
                            @click="dialog = false"
                        >
                            CANCEL
                        </v-btn>
                        <v-btn
                            color="red"
                            text
                            @click="deleteQuestion"
                        >
                            DELETE
                        </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </div>    
        </div>
        
        <v-divider></v-divider>
      
        <v-layout row class="my-2 py-3">
            <v-flex md2>
                <div class="text-center">
                    <v-icon @click.prevent="upvoteQuestion">mdi-chevron-up</v-icon>
                    <p class="ma-0">
                        {{question.upvotes.length - question.downvotes.length}}
                    </p>
                    <v-icon @click.prevent="downvoteQuestion">mdi-chevron-down</v-icon>
                </div>
            </v-flex>
            <v-flex md10 class="px-4">
                <p v-html="question.description"></p>

            </v-flex>
        </v-layout>

        <v-layout row>
            <v-chip
                class="ma-2"
                color="primary"
                outlined
                v-for="(tag, i) in question.tags" :key="i"
                >
            <v-icon left>mdi-label</v-icon>
                {{tag}}
            </v-chip>
        </v-layout>
        
        <p class="pt-4">{{ question.answers.length }} Answer</p>
        <v-divider></v-divider>
        <v-layout row class="my-2 py-3" v-for="answer in question.answers" :key="answer._id">
            <v-flex md2>
                <div class="text-center">
                    <v-icon @click.prevent="upvoteAnswer(answer._id)">mdi-chevron-up</v-icon>
                    <p class="ma-0">
                        {{answer.upvotes.length - answer.downvotes.length}}
                    </p>
                    <v-icon @click.prevent="downvoteAnswer(answer._id)">mdi-chevron-down</v-icon>
                </div>
            </v-flex>
            <v-flex md10 class="px-4">
                <p v-html="answer.description"></p>
            </v-flex>
        </v-layout>
        <Editor @answer="submitAnswer" />
    </v-container>
</template>

<script>
import { mapState } from 'vuex'
import Editor from '@/components/Editor.vue'
export default {
    data: () => ({
        question: {},
        content: '',
        dialog: false,
        editDialog: false,
        submitEditQuestion: false
    }),
    methods: {
        submitQuestion() {
            this.editDialog = false;
            this.submitEditQuestion = true;
        },
        getQuestionDetail() {
            let id = this.$route.params.id;
            this.$store.dispatch('fetchQuestionDetail', id)
                .then( data => {
                    this.question = data;
                })
                .catch(err => {
                    this.swal('error', err)
                })
        },
        submitAnswer(payload) {
            this.content = payload;
            let question = this.$route.params.id;
            this.$store.dispatch('submitAnswer', {
                question,
                description: this.content
            })
            .then(data => {
                this.content = ''
                this.question = data
            })
        },
        upvoteQuestion() {
            this.$store.dispatch('upvoteQuestion', this.question._id)
                .then(data => {
                    this.question = data;
                })
        },
        downvoteQuestion() {
            this.$store.dispatch('downvoteQuestion', this.question._id)
                .then(data => {
                    this.question = data;
                })
        },
        upvoteAnswer(id) {
            this.$store.dispatch('upvoteAnswer', id)
                .then(data => {
                    this.question = data;
                })
        },
        downvoteAnswer(id) {
            this.$store.dispatch('downvoteAnswer', id)
                .then(data => {
                    this.question = data;
                })
        },
        deleteQuestion() {
            this.$store.dispatch('deleteQuestion', this.question._id)
                .then(data => {
                    this.$router.push('/')
                })
        },
        setNewData(question) {
            this.question = question
        }
    },
    created() {
        this.getQuestionDetail()
    },
    components: {
        Editor
    },
    computed: {
        ...mapState(['userEmail'])
    }
}
</script>

<style>
img {
    height: 100px;
    width: auto;
}
</style>