function getRandomIntInclusive (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function getRandomValuesFromArray (array, number) {
  const result = []
  const length = array.length
  for (let i = 0; i < number; i++) {
    const randomIndex = getRandomIntInclusive(0, length - 1)
    result.push(array[randomIndex])
  }
  return result
}

function getFirstValuesFromArray (array, number) {
  const result = []
  const arrayLength = array.length
  for (let i = 0; i < number; i++) {
    result.push(array[i % arrayLength])
  }
  return result
}

function getRandomIndicesInArray (arrayLength, size) {
  const result = []
  const array = Array.from({ length: arrayLength }, (v, k) => k)
  for (let i = 0; i < size; i++) {
    const randomIndex = getRandomIntInclusive(0, array.length - 1)
    result.push(array.splice(randomIndex, 1)[0])
  }
  return result
}

function interpolation (minValue, maxValue, interpolatedValue) {
  // return interpolated value for min value
  const result = (interpolatedValue * minValue) / maxValue
  return Math.floor(result)
}

export {
  getRandomIntInclusive,
  getRandomValuesFromArray,
  interpolation,
  getFirstValuesFromArray,
  getRandomIndicesInArray
}
