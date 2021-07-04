<template>
  <div class="game-type-container">
    <v-btn
      block
      color="transparent"
      @click="createOnlineGame"
    >
      Create
    </v-btn>
    <v-btn
      block
      color="transparent"
      @click="joinOnlineGame"
    >
      Join
    </v-btn>
    <v-text-field
      label="gameId"
      v-model="gameId"
    ></v-text-field>
    <p class="msg white--text" v-if="!isGameReady && gameId.length">It looks like this game doesn't exist</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'MenuOnlineType',

  data: () => ({
    gameId: ''
  }),

  computed: {
    ...mapGetters(['isGameReady'])
  },

  methods: {
    createOnlineGame () {
      this.$store.dispatch('createNewOnlineGame')
    },
    joinOnlineGame () {
      this.$store.dispatch('joinOnlineGame', this.gameId.trim())
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
