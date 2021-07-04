// attack
import normalAttackCard from './attack/normalAttackCard'
import highAttackCard from './attack/highAttackCard'

// buff
import restoreFoodCard from './buff/restoreFoodCard'
import healingCard from './buff/healingCard'
import increaseAttackCard from './buff/increaseAttackCard'
import increaseDefenceCard from './buff/increaseDefenceCard'
import angelHealingCard from './buff/angelHealingCard'

// debuff
import stealFoodCard from './debuff/stealFoodCard'
import decreaseDefenceCard from './debuff/decreaseDefenceCard'

const attackCards = [
  normalAttackCard,
  highAttackCard
]

const buffCards = [
  restoreFoodCard,
  healingCard,
  increaseAttackCard,
  increaseDefenceCard,
  angelHealingCard
]

const debuffCards = [
  stealFoodCard,
  decreaseDefenceCard
]

export {
  attackCards,
  buffCards,
  debuffCards
}
