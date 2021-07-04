const DAMAGE = 15
const NAME = 'Normal attack'
const DESCRIPTION = `Deals ${DAMAGE} attack + player attack.`

export default function normalAttackCard (card) {
  // return card with 15 attack and feeding 10
  card.setDamagePoints(DAMAGE)
  card.setName(NAME)
  card.setDescription(DESCRIPTION)
  return card
}
