const FOOD = 15
const NAME = 'Steal food'
const DESCRIPTION = `Steal ${FOOD} food points from the opponent`

export default function stealFoodCard (card) {
  // return card with type buff and 15 food points
  card.setFeedingPoints(0) // this card doesn't use feeding
  card.setName(NAME)
  card.setDescription(DESCRIPTION)
  card.setType('debuff')
  card.debuff = (owner, opponent) => {
    const ownerFoodPoint = owner.getFoodPoint()
    const opponentFoodPoint = opponent.getFoodPoint()
    const ownerMaxFood = owner.getMaxFoodPoint()
    if (ownerMaxFood < (ownerFoodPoint + FOOD)) {
      owner.setFoodPoint(ownerMaxFood)
      opponent.setFoodPoint(opponentFoodPoint - FOOD)
    } else {
      owner.setFoodPoint(ownerFoodPoint + FOOD)
      opponent.setFoodPoint(opponentFoodPoint - FOOD)
    }
  }
  return card
}
