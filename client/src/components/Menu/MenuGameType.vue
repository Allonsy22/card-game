<template>
  <div class="game-type-container">
    <v-btn
      block
      color="transparent"
      @click="startNewGame(false)"
    >
      Quick game
    </v-btn>
    <v-btn
      block
      color="transparent"
      @click="startNewGame(true)"
    >
      Deep game
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'MenuGameType',

  methods: {
    startNewGame (deepGame) {
      this.$store.dispatch('toggleMenuDialog')
      this.$store.dispatch('toggleGameTypeMenu')
      this.$store.dispatch('startNewGame', deepGame)
    }
  }

}
</script>

<style scoped>
.game-type-container {
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
