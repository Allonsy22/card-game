<template>
  <v-main class="main-container">
    <div class="msgs" v-if="isMessage">
      <Message
        type='attention'
        v-if="!isGameReady && game"
        key="game-status"
      >
        Waiting for the opponent. Game id: {{gameId}}
      </Message>
      <Message
        type="error"
        v-if="isErrorMessage"
        key="error"
      >
        Opponent disconnected or game doesn't exist. Please start new local or online game.
      </Message>
    </div>
    <div class="main-container" v-else>
      <GameOverDialog />
      <div class="players">
        <Player :owner="firstPlayer" />
        <Player :owner="secondPlayer" />
      </div>
      <div class="deck-container">
        <h2 class="message" v-if="isOpponentMove">Opponent`s move</h2>
        <transition name="bounce" mode="out-in" v-else>
          <CardDeck
            :deck="firstPlayerDeck"
            :owner="firstPlayer"
            key="1"
            v-if="isAvailableMove"
          />
          <CardDeck :deck="secondPlayerDeck" :owner="secondPlayer" key="2" v-else />
        </transition>
      </div>
    </div>
  </v-main>
</template>

<script>
import CardDeck from '@/components/Card/CardDeck'
import Player from '@/components/Player'
import Message from '@/components/Message'
import GameOverDialog from '@/components/GameOverDialog'
import { mapGetters } from 'vuex'

export default {
  name: 'Game',

  components: {
    CardDeck,
    Player,
    Message,
    GameOverDialog
  },

  computed: {
    ...mapGetters([
      'firstPlayer',
      'secondPlayer',
      'game',
      'currentPlayerMove',
      'currentPlayer',
      'isOnlineGame',
      'isGameReady',
      'gameId'
    ]),
    firstPlayerDeck () {
      return this.firstPlayer.getCardDeck()
    },
    secondPlayerDeck () {
      return this.secondPlayer.getCardDeck()
    },
    firstPlayerHP () {
      return this.firstPlayer.getHealthPoint()
    },
    secondPlayerHP () {
      return this.secondPlayer.getHealthPoint()
    },
    isAvailableMove () {
      return Object.is(this.firstPlayer, this.currentPlayerMove)
    },
    isOpponentMove () {
      if (!this.isOnlineGame) return false
      return !Object.is(this.currentPlayer, this.currentPlayerMove)
    },
    isErrorMessage () {
      return (!this.currentPlayer && this.isOnlineGame) || !this.game
    },
    isMessage () {
      return !this.game || !this.isGameReady || this.isErrorMessage
    }
  }
}
</script>

<style scoped>
.main-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.players {
  display: flex;
  align-items: center;
  justify-content: center;
}

.deck-container {
  position: relative;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.message {
  text-align: center;
  position: absolute;
  top: 0;
}

.bounce-enter-active {
  animation: bounce-in .5s;
}

.bounce-leave-active {
  animation: bounce-in .5s reverse;
}

@keyframes bounce-in {
  from {
    transform: scale(0);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
