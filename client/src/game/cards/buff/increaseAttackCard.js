const ATTACK = 10
const NAME = 'Increase attack'
const DESCRIPTION = `Increase attack by ${ATTACK} points`

export default function increaseAttackCard (card) {
  // return card with type buff and increase owner attack by 10 points
  card.setName(NAME)
  card.setDescription(DESCRIPTION)
  card.setType('buff')
  card.buff = (owner) => {
    const ownerAttack = owner.getAttack()
    const newAttack = ownerAttack + ATTACK
    owner.setAttack(newAttack)
  }
  return card
}
