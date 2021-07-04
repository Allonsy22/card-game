const HP = 30
const NAME = 'Angel`s healing'
const DESCRIPTION = `Restore HP by ${HP} points`

export default function healingCard (card) {
  // return card with type buff and 30 healing points
  card.getFeedingPoints(15)
  card.setHealingPoints(HP)
  card.setName(NAME)
  card.setDescription(DESCRIPTION)
  card.setType('buff')
  return card
}
