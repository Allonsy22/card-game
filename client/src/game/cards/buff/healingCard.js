const HP = 15
const NAME = 'Healing'
const DESCRIPTION = `Restore HP by ${HP} points`

export default function healingCard (card) {
  // return card with type buff and 15 healing points
  card.setHealingPoints(HP)
  card.setName(NAME)
  card.setDescription(DESCRIPTION)
  card.setType('buff')
  return card
}
