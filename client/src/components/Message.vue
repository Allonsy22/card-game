<template>
  <v-alert
    :color="color"
    class="mt-3"
  >
    <slot></slot>
    <v-progress-circular
      v-if="!isGameReady && game"
      :size="30"
      color="white"
      indeterminate
      class="ml-3"
    ></v-progress-circular>
  </v-alert>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Message',
  props: {
    type: String,
    status: Boolean
  },
  data: () => ({
    colors: {
      error: 'red',
      attention: 'yellow'
    }
  }),
  computed: {
    ...mapGetters(['isGameReady', 'game']),
    color () {
      if (!this.type) return 'primary'
      return this.colors[this.type]
    }
  }

}
</script>

<style scoped>

</style>
