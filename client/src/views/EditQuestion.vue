<template>
  <b-container>
    <FormQuestion :action="'edit'"></FormQuestion>
  </b-container>
</template>

<script>
import FormQuestion from '../components/FormQuestion'

export default {
  name: 'Ask',
  components: { FormQuestion }
}
</script>

<style>

</style>
