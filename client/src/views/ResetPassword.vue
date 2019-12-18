<template>
    <v-container>
        <h3>Please type in your new password!</h3>
        <v-text-field
            v-model="password"
            label="Password"
            required
            type="password"
        />
        <v-btn class="my-2" outlined color="primary"
        @click="resetPassword">Set as password</v-btn>
    </v-container>
</template>

<script>
export default {
    data: () => ({
        password: ''
    }),
    methods: {
        resetPassword() {
            this.$store.dispatch('resetPassword', {
                password: this.password,
                token: this.$route.params.token
            })
            .then(data => {
                this.$router.push('/login')
            })
        }
    }
}
</script>

<style>

</style>