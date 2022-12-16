import {isEscapeKey} from './util.js';

const form = document.querySelector('.img-upload__form');
const classImgUploadOverlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const uploadFile = document.querySelector('#upload-file');
const inputForHashtags = document.querySelector('.text__hashtags');
const inputForDescription = document.querySelector('.text__description');
openForm();

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeForm();
  }
};

const inputInFocus = () => {
  document.removeEventListener('keydown', onPopupEscKeydown);
};

const inputInBlur = () => {
  document.addEventListener('keydown', onPopupEscKeydown);
};

function addListeners() {
  document.addEventListener('keydown', onPopupEscKeydown);
  document.querySelector('#upload-cancel').addEventListener('click', closeForm);
  inputForHashtags.addEventListener('focus', inputInFocus);
  inputForDescription.addEventListener('focus', inputInFocus);
  inputForHashtags.addEventListener('blur', inputInBlur);
  inputForDescription.addEventListener('blur', inputInBlur);
}

function openForm() {
  uploadFile.addEventListener('change', () => {
    classImgUploadOverlay.classList.remove('hidden');
    body.classList.add('modal-open');
    addListeners();
  });
}

function removeListeners() {
  document.removeEventListener('keydown', onPopupEscKeydown);
  inputForHashtags.removeEventListener('focus', inputInFocus);
  inputForDescription.removeEventListener('focus', inputInFocus);
  inputForHashtags.removeEventListener('blur', inputInBlur);
  inputForDescription.removeEventListener('blur', inputInBlur);
}

function closeForm() {
  classImgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  removeListeners();
  // eslint-disable-next-line no-return-assign
  document.querySelectorAll('input, textarea').forEach((el)=>el.value = '');
}

const pristine = new Pristine(form, {
  classTo: 'text',
  errorTextParent: 'text'
});

function isHashtag (hashtag) {
  const regex = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}/;
  return regex.test(hashtag);
}

function validHashtags (value) {
  if (value === '') {return true;}
  const arrOfHashtags = value.split(' ').map((v) => v.toLowerCase());
  if ((arrOfHashtags.length > 5) || (!arrOfHashtags.every(isHashtag))) {return false;}
  const duplicates = arrOfHashtags.filter((number, index, numbers) => numbers.indexOf(number) !== index);
  return duplicates.length === 0;
}

pristine.addValidator(inputForHashtags, (value) => validHashtags(value), 'Incorrect hashtags');

form.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
  }
});
