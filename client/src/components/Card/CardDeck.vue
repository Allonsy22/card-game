<template>
  <div class="main-container">
    <div class="deck-container">
      <GameCard
      v-for="(card, index) in deck"
      :key="index + 1"
      :name="card.getName()"
      :type="card.getType()"
      :description="card.getDescription()"
      :feeding="card.getFeedingPoints()"
      :disabled="!isAvailableMove"
      @click.native="makeMove(index)"/>
    </div>

    <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          class="mt-2"
          small
          dark
          v-bind="attrs"
          v-on="on"
          @click="skipTurn"
          :disabled="!isAvailableMove"
        >
          <v-icon>mdi-debug-step-over</v-icon>
        </v-btn>
      </template>
      <span>Skip turn and restore food by 10 points</span>
    </v-tooltip>
  </div>
</template>

<script>
import GameCard from '@/components/Card/GameCard'
import { mapGetters } from 'vuex'

export default {
  name: 'CardDeck',

  props: {
    deck: Array,
    owner: Object
  },

  components: {
    GameCard
  },

  computed: {
    ...mapGetters([
      'currentPlayerMove'
    ]),
    description () {
      return 'Deals normal attack damage (10-15 HP) and reduces food by 10 points.'
    },
    isAvailableMove () {
      return Object.is(this.currentPlayerMove, this.owner)
    }
  },
  methods: {
    makeMove (index) {
      if (!this.isAvailableMove) return
      this.$store.dispatch('makeMove', { owner: this.owner, index })
    },
    skipTurn () {
      if (!this.isAvailableMove) return
      this.$store.dispatch('skipTurn')
    }
  }

}
</script>

<style scoped>
.main-container {
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.deck-container {
  width: auto;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
