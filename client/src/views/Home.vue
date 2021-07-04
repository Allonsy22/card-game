<template>
  <div class="home-container">
    <v-alert
      border="top"
      color="orange lighten-2"
      dark
    >
      I'm an alert with a top border and red color
    </v-alert>
  </div>
</template>

<script>
export default {
  name: 'Home'

}
</script>

<style scoped>
.home-container {
  width: 100%;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
}
</style>
