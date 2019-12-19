<template>
    <sui-list-item class="listItem">
        <sui-list-description>
            {{ answer.description }}
            <hr>
            <sui-icon name="thumbs up outline"/>
            {{ answer.upVotes.length }}
            /
            <sui-icon name="thumbs down outline"/>
            {{ answer.downVotes.length }}
            /
        </sui-list-description>
    </sui-list-item>
</template>

<script>
    export default {
        name: "answer",
        props: {
            answer: Object
        }
    }
</script>

<style scoped>
    .listItem {
        padding: 15px !important;
    }
</style>