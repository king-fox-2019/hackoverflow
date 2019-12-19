<template>
    <v-container>
        <p v-if="userTags.length == 0">
            You have no tags. Fill the field and press enter to add a tag.
        </p>
        <v-chip
            class="ma-2"
            close
            color="primary"
            outlined
            v-for="(tag, i) in userTags" :key="i"
            @click:close="removeTag(tag)"
            >
            <v-icon left>mdi-label</v-icon>
                {{tag}}
        </v-chip>
        <v-text-field
            v-model="tag"
            label="Tag"
            required
            @keyup.enter="insertTag"
        ></v-text-field>
    </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data: () => ({
        tag: ''
    }),
    methods: {
        insertTag() {
            this.$store.dispatch('addUserTag', {tag: this.tag})
                .then(data => {
                    this.tag = ''
                })
        },
        removeTag(tag) {
            this.$store.dispatch('removeUserTag', {tag})
                .then(data => {
                    this.tag = ''
                })
        }
    },
    computed: {
        ...mapState(['userTags'])
    },
    created() {
        this.$store.dispatch('fetchUserTags')
    }
}
</script>

<style>

</style>