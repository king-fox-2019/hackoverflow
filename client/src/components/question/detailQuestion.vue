<template>
    <sui-message id="message">
        <sui-header>{{data.title}}</sui-header>
        <small>{{ createdAt}}</small>
        <sui-card-description>
            {{ data.description }}
        </sui-card-description>
        <hr>
        <div>
            <a is="sui-list-description">
                <sui-icon name="chat"/>
                {{ dataAnswer.length }}
                /
                <a><sui-icon name="thumbs up outline" @click="like"/></a>
                {{ dataUpVotes.length}}
                /
                <a><sui-icon name="thumbs down outline" @click="unLike"/></a>
                {{ dataDownVotes.length }}
            </a>
        </div>
        <sui-list divided relaxed id="list">
            <answer v-for="answer in dataAnswer" :key="answer._id" :answer="answer"/>
        </sui-list>
        <add-new-answer :answerId="data._id" @updateAnswers="fetchDataDetail"/>
    </sui-message>
</template>

<script>
    // import axios from "../../config/axios";
    import axios from 'axios'
    import answer from "../answer";
    import addNewAnswer from "../answer/addNewAnswer";

    export default {
        name: "detailQuestion",
        data() {
            return {
                id: String,
                data: Object,
                dataAnswer: [],
                dataUpVotes: [],
                dataDownVotes: []
            }
        },
        methods: {
            fetchDataDetail() {
                axios({
                    method: 'get',
                    url: 'http://35.226.139.9/questions/' + this.id,
                    headers: {
                        Authorization: 'token ' + this.$cookies.get('token')
                    }
                }).then(response => {
                    // console.log(response.data.data);
                    this.data = response.data.data;
                    this.dataAnswer = response.data.data.answer;
                    this.dataUpVotes = response.data.data.upVotes;
                    this.dataDownVotes = response.data.data.downVotes;
                }).catch(err => {
                    console.log(err.response);
                })
            },
            like() {
                axios({
                    method: 'patch',
                    url: 'http://35.226.139.9/questions/' + this.id + '/like',
                    headers: {
                        Authorization: 'token ' + this.$cookies.get('token')
                    }
                }).then(response => {
                    // console.log(response.data.data);
                    this.data = response.data.data;
                    this.dataAnswer = response.data.data.answer;
                    this.dataUpVotes = response.data.data.upVotes;
                    this.dataDownVotes = response.data.data.downVotes;
                }).catch(err => {
                    console.log(err.response);
                })
            },
            unLike() {
                axios({
                    method: 'patch',
                    url: 'http://35.226.139.9/questions/' + this.id + '/unlike',
                    headers: {
                        Authorization: 'token ' + this.$cookies.get('token')
                    }
                }).then(response => {
                    // console.log(response.data.data);
                    this.data = response.data.data;
                    this.dataAnswer = response.data.data.answer;
                    this.dataUpVotes = response.data.data.upVotes;
                    this.dataDownVotes = response.data.data.downVotes;
                }).catch(err => {
                    console.log(err.response);
                })
            }
        },
        mounted() {
            this.id = this.$route.params.id;
            this.fetchDataDetail();
        },
        computed: {
            createdAt() {
                let date = new Date(this.data.created_at);
                return date.toLocaleString(
                    "en-US",
                    {timeZone: "Asia/Jakarta"}
                );
            }
        },
        components: {
            answer,
            addNewAnswer
        }
    }
</script>

<style scoped>

    #list {
        padding: 10px;
        background-color: #d6e5fa !important;
    }
</style>