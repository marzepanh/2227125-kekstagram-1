export function getRandomDigit(from, to) {
  if (from === to) {return from;}
  if (from > to) {
    throw new Error('The value from cannot exceed or equal the value to');
  }
  const min = Math.ceil(from);
  const max = Math.floor(to);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
export function isStringFit(str, maxLength) {
  return maxLength >= str.length;
}

export function getRandomElementNotRep(array) {
  const newElement = getRandomElement(array);
  array.splice(array.indexOf(newElement), 1);
  return newElement;
}

export function getRandomElement(array) {
  return array[getRandomDigit(0, array.length - 1)];
}
export const isEscapeKey = (evt) => evt.key === 'Escape';
