function getRandomInt(first, last) {
  if (first >= last) {
    throw new Error('Last should be greater than first');
  }
  first = Math.ceil(first);
  last = Math.floor(last);
  return Math.floor(Math.random() * (last - first + 1) + first);
}

function checkLength(str, len) {
  return str.len <= len;
}

function getRandom() {
  return this[getRandomInt(0, this.length - 1)];
}

export {getRandomInt, getRandom, checkLength };
