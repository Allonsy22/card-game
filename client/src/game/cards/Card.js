export default class Card {
  constructor ({ damagePoints = 10, feedingPoints = 10 } = {}) {
    this.damagePoints = damagePoints
    this.feedingPoints = feedingPoints
    this.healing = 0
    this.name = 'Normal attack'
    this.description = ''
    this.cardType = 'attack'
  }

  useCard ({ owner, opponent }) {
    this.reduceOwnerFoodPoint(owner)
    switch (this.cardType) {
      case 'attack': return this.attack(owner, opponent)
      case 'buff': return this.buff(owner)
      case 'debuff': return this.debuff(owner, opponent)
      default: return this.attack(opponent)
    }
  }

  attack (owner, opponent) {
    // base attack function
    const ownerDamage = owner.getAttack()
    opponent.getDamage(this.damagePoints + ownerDamage)
  }

  buff (owner) {
    // base buff function
    const currentHP = owner.getHealthPoint()
    const maxHP = owner.getMaxHealthPoint()
    if (maxHP < (currentHP + this.healing)) {
      owner.setHealthPoint(maxHP)
    } else {
      owner.setHealthPoint(currentHP + this.healing)
    }
  }

  debuff (owner, opponent) {
    // base debuff function
    const foodPoints = opponent.getFoodPoint()
    opponent.setFoodPoint(foodPoints - this.feedingPoints)
  }

  reduceOwnerFoodPoint (owner) {
    const foodPoints = owner.getFoodPoint()
    owner.setFoodPoint(foodPoints - this.feedingPoints)
  }

  setDamagePoints (value) {
    this.damagePoints = value
  }

  getFeedingPoints () {
    return this.feedingPoints
  }

  setFeedingPoints (value) {
    this.feedingPoints = value
  }

  setHealingPoints (value) {
    this.healing = value
  }

  getName () {
    return this.name
  }

  setName (value) {
    this.name = value
  }

  getDescription () {
    return this.description
  }

  setDescription (description) {
    this.description = description
  }

  getType () {
    return this.cardType
  }

  setType (type) {
    this.cardType = type
  }
}
