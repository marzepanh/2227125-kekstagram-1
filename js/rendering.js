import {createArrOfPhoto} from './data.js';
import {viewPhotoInFullSize} from './bigrendering.js';

const photoListElement = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

export const photos = createArrOfPhoto ();

const photoListFragment = document.createDocumentFragment();

photos.forEach((photo) => {
  const {url, likes, comments} = photo;
  const photoElement = photoTemplate.cloneNode(true);
  photoElement.querySelector('.picture__img').src = url;
  photoElement.querySelector('.picture__likes').textContent = likes;
  photoElement.querySelector('.picture__comments').textContent = comments.length;
  photoElement.addEventListener('click', () => {
    viewPhotoInFullSize(photo);
  });
  photoListFragment.appendChild(photoElement);
});

photoListElement.appendChild(photoListFragment);
