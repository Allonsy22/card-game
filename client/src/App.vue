<template>
  <v-app>
    <Toolbar />
    <MenuDialog />
    <router-view></router-view>
  </v-app>
</template>

<script>
import Toolbar from '@/components/Toolbar'
import MenuDialog from '@/components/Menu/MenuDialog'

export default {
  name: 'App',

  components: {
    Toolbar,
    MenuDialog
  }
}
</script>

<style scoped>
</style>
