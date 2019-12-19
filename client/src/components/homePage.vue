<template>
    <div id="homepage">
        <nav-bar/>
        <sui-list divided relaxed>
            <question v-for="(q,index) in questions" :key="index" :questionData="q"/>
        </sui-list>
    </div>
</template>

<script>
    import question from "./question/question";
    // import axios from "../config/axios";
    import axios from 'axios';
    import navBar from "./header/navBar";

    export default {
        name: "homePage",
        data() {
            return {}
        },
        methods: {
            fetchQuestion() {
                axios({
                    method: 'get',
                    url: 'http://localhost:3000/questions/',
                }).then(response => {
                    console.log(response.data);
                    this.$store.dispatch('listOfQuestions', response.data.data.reverse());
                }).catch(err => [
                    console.log(err.response)
                ])
            }
        },
        computed: {
            questions() {
                return this.$store.getters.questionsList;
            }
        },
        mounted() {
            this.fetchQuestion();
        },
        components: {
            question,
            navBar
        }
    }
</script>

<style scoped>
    #homepage {
        padding: 100px;
    }
</style>