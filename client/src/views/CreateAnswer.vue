<template>
   <div class="flex justify-center">
      <form @submit.prevent="submitAnswer" class="mt-12 p-4 flex flex-col border border-teal-200 shadow">         
         <label class="mt-4">Content</label>
         <input type="email" class="border-b border-gray-800" required v-model="content"/>

         <input type="submit" class="mt-4 rounded cursor-pointer" value="Answer"/>
      </form>
   </div>
</template>

<script>


export default {
   name: 'CreateAnswer',
   
   data() {
      return {
         content: ''
      }
   },

   methods: {
      submitAnswer() {

      }
   }
}
</script>

<style>

</style>