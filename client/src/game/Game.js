import Card from './cards/Card'
import { attackCards, buffCards, debuffCards } from '@/game/cards/index'
import { getFirstValuesFromArray, getRandomIndicesInArray } from '@/utils'

const DECK_SIZE = 300

const ATTACK_CARDS = getFirstValuesFromArray([...attackCards], 150)
const BUFF_CARDS = getFirstValuesFromArray([...buffCards], 75)
const DEBUFF_CARDS = getFirstValuesFromArray([...debuffCards], 75)
const CARDS = [...ATTACK_CARDS, ...BUFF_CARDS, ...DEBUFF_CARDS]

export default class Game {
  constructor ({ firstPlayer, secondPlayer } = {}) {
    this.deckSize = DECK_SIZE
    this.randomIndecies = []
    this.cardDeck = []
    this.currentPlayer = firstPlayer
    this.opponent = secondPlayer
    this.players = [firstPlayer, secondPlayer]
    this.currentPlayerIndex = 0
  }

  getRandomIndices () {
    return this.randomIndecies
  }

  setRandomIndeces (value = []) {
    if (this.randomIndecies.length) return
    if (!value.length) {
      this.randomIndecies = getRandomIndicesInArray(CARDS.length, DECK_SIZE)
    } else {
      this.randomIndecies = value
    }
  }

  initCardDeck () {
    this.setRandomIndeces()
    this.randomIndecies.forEach(randomIndex => {
      this.cardDeck.push(CARDS[randomIndex](new Card()))
    })
  }

  initCardsForPlayer () {
    // every player has 5 cards
    for (let i = 0; i < 5; i++) {
      this.currentPlayer.setCard(this.cardDeck.pop())
      this.opponent.setCard(this.cardDeck.pop())
    }
  }

  initDeepGame () {
    this.players.forEach(player => {
      player.setMaxHealthPoint(200)
      player.setHealthPoint(200)
      player.setMaxFoodPoint(150)
      player.setFoodPoint(150)
      player.setAttack(5)
      player.setDefence(10)
    })
  }

  init ({ deepGame = false, onlineGame = false } = {}) {
    if (deepGame) this.initDeepGame()
    if (onlineGame) {
      this.initCardsForPlayer()
    } else {
      this.initCardDeck()
      this.initCardsForPlayer()
    }
  }

  makeMove (player, index) {
    if (!Object.is(player, this.currentPlayer) ||
      this.isGameOver()) return
    const card = this.currentPlayer.removeCard(index)
    if (this.isCardDeckEmpty()) this.initCardDeck()
    this.currentPlayer.setCard(this.cardDeck.pop())
    card.useCard({ owner: this.currentPlayer, opponent: this.opponent })
    this.nextTurn()
  }

  nextTurn () {
    if (this.isGameOver()) return
    this.currentPlayerIndex = this.currentPlayerIndex === 0 ? 1 : 0
    this.currentPlayer = this.players[this.currentPlayerIndex]
    this.opponent = this.players[(this.currentPlayerIndex + 1) % 2]
  }

  skipTurn () {
    // skip turn restores food points by 10
    const foodPoint = this.currentPlayer.getFoodPoint()
    const maxFoodPoint = this.currentPlayer.getMaxFoodPoint()
    if (maxFoodPoint < (foodPoint + 10)) {
      this.currentPlayer.setFoodPoint(maxFoodPoint)
    } else {
      this.currentPlayer.setFoodPoint(foodPoint + 10)
    }
    this.nextTurn()
  }

  isGameOver () {
    if (this.currentPlayer.isGameOver() ||
      this.opponent.isGameOver()) {
      return true
    }
    return false
  }

  getWinner () {
    if (this.currentPlayer.isGameOver()) {
      return this.opponent.getName()
    } else if (this.opponent.isGameOver()) {
      return this.currentPlayer.getName()
    }
    return 'The game is on'
  }

  isCardDeckEmpty () {
    return this.cardDeck.length === 0
  }

  getCurrentPlayer () {
    return this.currentPlayer
  }

  getCardDeck () {
    return this.cardDeck
  }

  getCardDeckSize () {
    return this.cardDeck.length
  }
}
