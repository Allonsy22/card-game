export default class Player {
  constructor ({ name = 'Player name' } = {}) {
    this.healthPoint = 100
    this.foodPoint = 100
    this.maxHealthPoint = 100
    this.maxFoodPoint = 100
    this.attack = 10
    this.defence = 20
    this.name = name
    this.cardDeck = []
  }

  getDamage (value) {
    const defence = this.defence > 90 ? 90 : this.defence
    const block = Math.round(value * (defence / 100))
    this.healthPoint -= (value - block)
    this.healthPoint = this.healthPoint < 1 ? 0 : this.healthPoint
  }

  getHealthPoint () {
    return this.healthPoint
  }

  setHealthPoint (value) {
    this.healthPoint = value
  }

  getFoodPoint () {
    return this.foodPoint
  }

  setFoodPoint (value) {
    this.foodPoint = value < 0 ? 0 : value
  }

  getMaxHealthPoint () {
    return this.maxHealthPoint
  }

  setMaxHealthPoint (value) {
    this.maxHealthPoint = value
  }

  getMaxFoodPoint () {
    return this.maxFoodPoint
  }

  setMaxFoodPoint (value) {
    this.maxFoodPoint = value
  }

  getAttack () {
    return this.attack
  }

  setAttack (value) {
    this.attack = value
  }

  getDefence () {
    return this.defence
  }

  setDefence (value) {
    this.defence = value
  }

  setCard (card) {
    this.cardDeck.push(card)
  }

  removeCard (index) {
    return this.cardDeck.splice(index, 1)[0]
  }

  clearCardDeck () {
    this.cardDeck.length = 0
  }

  getCardDeck () {
    return this.cardDeck
  }

  getName () {
    return this.name
  }

  setName (value) {
    this.name = value
  }

  isGameOver () {
    const isEmptyCardDeck = this.cardDeck.length === 0
    const isLowHP = this.healthPoint < 1
    const isLowFoodPoint = this.foodPoint < 1
    return isEmptyCardDeck || isLowHP || isLowFoodPoint
  }
}
