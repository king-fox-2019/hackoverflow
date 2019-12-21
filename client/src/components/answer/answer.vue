<template>
    <sui-list-item>
        <sui-list-icon name="user" color="yellow"/>
        <sui-list-content>
            <sui-label color="yellow" basic pointing="left">
                <sui-list-description>
                    {{ answer.description }}
                </sui-list-description>
            </sui-label>
            <like-unlike-answer :data="answer" align="right"/>
        </sui-list-content>
    </sui-list-item>
</template>

<script>
    import likeUnlikeAnswer from "./likeUnlikeAnswer";

    export default {
        name: "answer",
        props: {
            answer: Object
        },
        components: {
            likeUnlikeAnswer
        }
    }
</script>

<style scoped>

</style>