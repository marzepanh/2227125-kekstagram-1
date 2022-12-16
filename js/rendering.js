import {viewPhotoInFullSize} from './big_rendering.js';
import {getRandomElementNotRep, debounce} from './util.js';

const defButt = document.querySelector('#filter-default');
const randButt = document.querySelector('#filter-random');
const discButt = document.querySelector('#filter-discussed');
const photoListElement = document.querySelector('.pictures');
let newPhotos, previousPhotos = [];

function render() {
  removePhotos();
  const photoTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');
  const photoListFragment = document.createDocumentFragment();
  newPhotos.forEach((photo) => {
    const {url, likes, comments} = photo;
    const photoElement = photoTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = url;
    photoElement.querySelector('.picture__likes').textContent = likes;
    photoElement.querySelector('.picture__comments').textContent = comments.length;
    photoElement.addEventListener('click', () => {
      viewPhotoInFullSize(photo);
    });
    previousPhotos.push(photoElement);
    photoListFragment.appendChild(photoElement);
  });
  photoListElement.appendChild(photoListFragment);
}

function removePhotos() {
  for (const photo of previousPhotos) {
    photoListElement.removeChild(photo);
  }
  previousPhotos = [];
}

const setFilterClick = (photos, cb) => {
  document.querySelector('.img-filters__form').addEventListener('click', (evt) => {
    newPhotos = photos.slice();
    switch (evt.target.id) {
      case 'filter-default':
        defButt.classList.add('img-filters__button--active');
        randButt.classList.remove('img-filters__button--active');
        discButt.classList.remove('img-filters__button--active');
        break;
      case 'filter-random':
        defButt.classList.remove('img-filters__button--active');
        randButt.classList.add('img-filters__button--active');
        discButt.classList.remove('img-filters__button--active');
        newPhotos = Array.from({length: 10}, () => getRandomElementNotRep(newPhotos));
        break;
      case 'filter-discussed':
        defButt.classList.remove('img-filters__button--active');
        randButt.classList.remove('img-filters__button--active');
        discButt.classList.add('img-filters__button--active');
        newPhotos = newPhotos.sort((a, b) => b.comments.length - a.comments.length);
        break;
    }
    cb();
  });
};

export function renderPhotos (photos) {
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  newPhotos = photos.slice();
  render();
  setFilterClick(photos, debounce(
    () => render(),
    500)
  );
}
