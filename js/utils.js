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
export function isEscapeKey(evt) {
  return evt.key === 'Escape';
}

export function arrayEnded (array) {
  return array.length === 0;
}

export function debounce (callback, timeoutDelay) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}
export function showErr() {
  const errorTemplate = document.querySelector('#error').content.querySelector('.error');
  const error = errorTemplate.cloneNode(true);
  const text  = error.querySelector('h2');
  const butt = error.querySelector('.error__button');
  text.textContent = 'Сервер не отвечает!';
  butt.textContent = 'Перезагрузить страницу';
  butt.addEventListener('click', () => {
    location.reload();
  });
  document.querySelector('body').append(error);
}
