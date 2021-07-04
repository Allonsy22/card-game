const FOOD = 15
const NAME = 'Restore food'
const DESCRIPTION = `Restore food by ${FOOD} points`

export default function restoreFoodCard (card) {
  // return card with type buff and 15 food points
  card.setFeedingPoints(0) // this card doesn't use feeding
  card.setName(NAME)
  card.setDescription(DESCRIPTION)
  card.setType('buff')
  card.buff = (owner) => {
    const ownerFoodPoint = owner.getFoodPoint()
    const ownerMaxFood = owner.getMaxFoodPoint()
    if (ownerMaxFood < (ownerFoodPoint + FOOD)) {
      owner.setFoodPoint(ownerMaxFood)
    } else {
      owner.setFoodPoint(ownerFoodPoint + FOOD)
    }
  }
  return card
}
