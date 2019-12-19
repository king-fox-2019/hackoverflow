<template>
  <v-container fluid>
    <v-row>
      <v-col cols="2">
        <v-card>
          <v-navigation-drawer right clipped permanent fixed class="nav-drawer">
            <div class="widgets-container">
              <slot name="widget-1"
                id="widget-1"
                ></slot>
            </div>
          </v-navigation-drawer>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'right-drawer'
}
</script>

<style scoped>
.widgets-container {
  margin-top: 65px;
}
.nav-drawer {
  width: 275px !important;
}
</style>