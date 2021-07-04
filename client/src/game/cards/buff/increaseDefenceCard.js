const DEFENCE = 10
const NAME = 'Increase defence'
const DESCRIPTION = `Increase defence by ${DEFENCE} points (max defence 90)`

export default function increaseDefenceCard (card) {
  // return card with type buff and increase owner defence by 10 points
  card.setName(NAME)
  card.setDescription(DESCRIPTION)
  card.setType('buff')
  card.buff = (owner) => {
    const ownerDefence = owner.getDefence()
    let newDefence = ownerDefence + DEFENCE
    newDefence = newDefence > 90 ? 90 : newDefence
    owner.setDefence(newDefence)
  }
  return card
}
