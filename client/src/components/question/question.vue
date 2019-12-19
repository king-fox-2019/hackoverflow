<template>
    <sui-list-item @click.native="goToDetail">
        <sui-list-icon name="code" size="large" vertical-align="middle"/>
        <sui-list-content>
            <a is="sui-list-header">{{ questionData.title }}</a>
            <a is="sui-list-description"><small>{{ createdAt }}</small></a>
            <a is="sui-list-description">
                <sui-icon name="chat"/>
                {{ questionData.answer.length }}
                /
                <sui-icon name="thumbs up outline"/>
                {{ questionData.upVotes.length }}
                /
                <sui-icon name="thumbs down outline"/>
                {{ questionData.downVotes.length }}
            </a>
        </sui-list-content>
    </sui-list-item>
</template>

<script>
    import router from "../../router";

    export default {
        name: "question",
        props: {
            questionData: Object
        },
        methods: {
            goToDetail() {
                router.push({ name: 'detail', params: { id: this.questionData._id } })
            }
        },
        computed: {
            createdAt() {
                let date = new Date(this.questionData.created_at);
                return date.toLocaleString(
                    "en-US",
                    {timeZone: "Asia/Jakarta"}
                );
            }
        }
    }
</script>

<style scoped>

</style>