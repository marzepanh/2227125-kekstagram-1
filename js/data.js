import {getRandomDigit,  getRandomElement, getRandomElementNotRep} from './util.js';
const NUM_OF_COMMENTS = 3;
const ARR_OF_ID_FOR_PHOTO = Array.from({length: 25}, (_v, k) => k+1);
const ARR_OF_I_FOR_URL = Array.from({length: 25}, (_v, k) => k+1);

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

const COMMENTS = [
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

const createComment = () => ({
  id: getRandomDigit(0, 5000000),
  avatar: `img/avatar-${getRandomDigit(1, 6)}.svg`,
  message: getRandomElement(COMMENTS),
  name: getRandomElement(NAMES)
});

const createPhoto = () => ({
  id: getRandomElementNotRep(ARR_OF_ID_FOR_PHOTO),
  url: `photos/${getRandomElementNotRep(ARR_OF_I_FOR_URL)}.jpg`,
  description: getRandomElement(DESCRIPTIONS),
  likes: getRandomDigit(15, 200),
  comments: Array.from({length: NUM_OF_COMMENTS}, createComment)
});
export const createArrOfPhoto = () => Array.from({length: 25}, createPhoto);
