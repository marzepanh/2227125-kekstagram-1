/* eslint-disable no-unused-vars */

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

const DESCRIPTIONS = [
  'My first photo here',
  'On vacation',
  'Healthy breakfast',
  '2 years progress',
  'Cute night',
  'Lori ipsum',
  'ara fi',
  'My favorite book',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];

const USED_ID = [];
const MAX_ID = 100000;
const POSTS_AMOUNT = 25;

function getRandom() {
  return this[getRandomInt(0, this.length - 1)];
}

function getRandomId() {
  const id = getRandomInt(0, MAX_ID);
  if (id in USED_ID) {
    getRandomId();
  }
  USED_ID.push(id);
  return id;
}

const createComment = () => ({
  id: getRandomId(),
  avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
  message: getRandom.call(MESSAGES),
  name: getRandom.call(NAMES),
});

const createPost = (id) => ({
  id: id,
  url: `photos/${id}.jpg`,
  description: getRandom.call(DESCRIPTIONS),
  likes: getRandomInt(15, 200),
  comments: Array.from({length: getRandomInt(5, 30)}, createComment),
});

const posts = Array.from({length: POSTS_AMOUNT}, (v, i) => createPost(i + 1));

