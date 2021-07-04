const DAMAGE = 20
const NAME = 'High attack'
const DESCRIPTION = `Deals ${DAMAGE} damage + player attack.`

export default function highAttackCard (card) {
  // return card with 15 attack and feeding 10
  card.setDamagePoints(DAMAGE)
  card.setFeedingPoints(15)
  card.setName(NAME)
  card.setDescription(DESCRIPTION)
  return card
}
