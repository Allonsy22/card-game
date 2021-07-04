const DEFENCE = 10
const NAME = 'Decrease defence'
const DESCRIPTION = `Decrease defence by ${DEFENCE} points from opponent (min defence 0)`

export default function decreaseDefenceCard (card) {
  // return card with type debuff and decrease defence from opponent
  card.setName(NAME)
  card.setDescription(DESCRIPTION)
  card.setType('debuff')
  card.debuff = (owner, opponent) => {
    const opponentDefence = opponent.getDefence()
    let newDefence = opponentDefence - DEFENCE
    newDefence = newDefence < 0 ? 0 : newDefence
    opponent.setDefence(newDefence)
  }
  return card
}
