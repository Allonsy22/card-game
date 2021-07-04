<template>
  <div>
    <v-toolbar
      dark
      height="40"
    >
      <v-app-bar-nav-icon @click="showMenuDialog"></v-app-bar-nav-icon>

      <v-toolbar-title>
        <router-link to="/" class="title">Castle battle</router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  name: 'Toolbar',

  data: () => ({
    toolbarBackground: require('@/assets/dialog_background.png')
  }),

  methods: {
    showMenuDialog () {
      this.$store.dispatch('toggleMenuDialog')
    }
  }

}
</script>

<style scoped>
.title {
  color: #fff;
  text-decoration: none;
}
</style>
