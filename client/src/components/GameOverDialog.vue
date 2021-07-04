<template>
  <div class="container">
    <v-dialog
      :value="isGameOver"
      width="300"
    >
      <v-card>
        <v-card-title class="headline grey lighten-2">
          Game over
        </v-card-title>

        <v-card-text>
          {{winner}} win the game
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="startNewGame"
          >
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'GameOverDialog',
  computed: {
    ...mapGetters([
      'isGameOver',
      'winner'
    ])
  },
  methods: {
    startNewGame () {
      this.$store.dispatch('startNewGame')
    }
  }

}
</script>

<style scoped>

</style>
