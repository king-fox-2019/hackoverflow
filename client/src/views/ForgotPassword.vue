<template>
    <v-container>
        <h3>Forgot your password?</h3>
        <p>Enter your email below and we will send you a link to reset your password.</p>
        <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
        />
        <v-btn class="my-2" outlined color="primary"
        @click="sendEmail">Send me an email!</v-btn>
    </v-container>
</template>

<script>
export default {
    data: () => ({
        email: '',
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ]
    }),
    methods: {
        sendEmail() {
            this.$store.dispatch('sendResetPasswordEmail', {
                email: this.email
            })
        }
    }
}
</script>

<style>

</style>