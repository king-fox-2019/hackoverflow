<template>
  <div>
    <div class="columns">
      <div class="column">
        <UserQuest></UserQuest>
      </div>
      <div class="column">
        <UserAns></UserAns>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import UserQuest from '../components/UserQuest'
import UserAns from '../components/UserAns'

export default {
  name: 'UserPage',
  components: {
    UserQuest,
    UserAns
  }
}
</script>

<style scoped>
.columns {
  margin: auto;
  width: 900px;
  display: flex;
  flex-direction: column;
}
</style>
