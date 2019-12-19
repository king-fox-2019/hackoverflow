<template>
  <v-container fluid>
    <v-row>
      <v-col cols="2">
        <v-card>
          <v-navigation-drawer clipped permanent fixed class="nav-drawer">
            <v-list dense nav>
              <v-list-item v-for="item in items" :key="item.title" link @click="goTo(item.route)">
                <v-list-item-icon>
                  <v-icon class="nav-icon">{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-navigation-drawer>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      items: [
          { title: 'Home', icon: 'mdi-earth', route: '/' },
          // { title: 'My Questions', icon: 'mdi-tag', route: '/tags' },
          // { title: 'My Answers', icon: 'mdi-tag', route: '/tags' }
        ]
    }
  },
  methods: {
    goTo: function(route) {
      this.$router.push(route)
    }
  }
}
</script>

<style scoped>
.nav-drawer {
  top: 50px !important;
  padding-top: 30px !important;
  width: 275px !important;
  padding-left: 50px !important;
}

.nav-icon {
  margin-top: 10px !important;
}

.v-list-item {
  min-height: 50px !important;
}

.v-list-item__title {
  font-size: 1rem !important;
  line-height: 2rem !important;
}
</style>