import {isEscapeKey} from './util.js';

const form = document.querySelector('.img-upload__form');
const classImgUploadOverlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const cancel = document.querySelector('#upload-cancel');
const uploadFile = document.querySelector('#upload-file');
const inputForHashtags = document.querySelector('.text__hashtags');
const inputForDescription = document.querySelector('.text__description');
const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleBigger = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const editImg = document.querySelector('.img-upload__preview');
const slider = document.querySelector('.effect-level__slider');
const effects = document.querySelector('.effects__list');
const fieldForSlider = document.querySelector('.img-upload__effect-level');
const effectLevelValue = document.querySelector('.effect-level__value');
const flagsToGetInfoAboutEffect = { filterInfo: 'filterInfo', sliderInfo: 'sliderInfo'};
let effect;

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
  cancel.addEventListener('click', closeForm);
  inputForHashtags.addEventListener('focus', inputInFocus);
  inputForDescription.addEventListener('focus', inputInFocus);
  inputForHashtags.addEventListener('blur', inputInBlur);
  inputForDescription.addEventListener('blur', inputInBlur);
  scaleSmaller.addEventListener('click', scaleChange);
  scaleBigger.addEventListener('click', scaleChange);
  effects.addEventListener('change', switchingEffect);
}

function removeListeners() {
  document.removeEventListener('keydown', onPopupEscKeydown);
  cancel.removeEventListener('click', closeForm);
  inputForHashtags.removeEventListener('focus', inputInFocus);
  inputForDescription.removeEventListener('focus', inputInFocus);
  inputForHashtags.removeEventListener('blur', inputInBlur);
  inputForDescription.removeEventListener('blur', inputInBlur);
  scaleSmaller.removeEventListener('click', scaleChange);
  scaleBigger.removeEventListener('click', scaleChange);
  effects.removeEventListener('change', switchingEffect);
  slider.noUiSlider.destroy();
}

function getInfoAboutEffect (obj) {
  let min, max, step, filter;
  const sliderVal = slider.noUiSlider.get();
  switch (effect) {
    case 'effect-chrome':
      min = 0;
      max = 1;
      step = 0.1;
      filter = `grayscale(${sliderVal})`;
      break;
    case 'effect-sepia':
      min = 0;
      max = 1;
      step = 0.1;
      filter = `sepia(${sliderVal})`;
      break;
    case 'effect-marvin':
      min= 0;
      max = 100;
      step = 1;
      filter = `invert(${sliderVal}%)`;
      break;
    case 'effect-phobos':
      min= 0;
      max = 3;
      step = 0.1;
      filter = `blur(${sliderVal}px)`;
      break;
    case 'effect-heat':
      min = 1;
      max = 3;
      step = 0.1;
      filter = `brightness(${sliderVal})`;
      break;
  }
  if (obj === flagsToGetInfoAboutEffect.filterInfo) {return filter;}
  else if (obj === flagsToGetInfoAboutEffect.sliderInfo) {return [min, max, step];}
}

function switchingEffect(evt) {
  editImg.classList.remove(`effects__preview--${effect.split('-')[1]}`);
  effect = evt.target.id;
  editImg.classList.add(`effects__preview--${effect.split('-')[1]}`);
  if (effect === 'effect-none') {
    fieldForSlider.classList.add('hidden');
  } else {
    fieldForSlider.classList.remove('hidden');
  }
  const minMaxStep = getInfoAboutEffect(flagsToGetInfoAboutEffect.sliderInfo);
  slider.noUiSlider.updateOptions({
    range: {
      min: minMaxStep[0],
      max: minMaxStep[1]
    },
    start: minMaxStep[1],
    step: minMaxStep[2]
  });
}

function switchingSLider () {
  effectLevelValue.value = slider.noUiSlider.get();
  if (effect === 'effect-none') {
    editImg.style.filter = '';
  } else {
    editImg.style.filter = getInfoAboutEffect(flagsToGetInfoAboutEffect.filterInfo);
  }
}

function scaleChange(evt) {
  let val = parseInt(scaleValue.value.replace('%', ''), 10) / 100;
  if (scaleBigger === evt.target && val !== 1) {
    val += 0.25;
  } else if (scaleSmaller === evt.target && val !== 0.25) {
    val -= 0.25;
  }
  editImg.style.transform = `scale(${val})`;
  scaleValue.value = `${val * 100}%`;
}

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

function workWithPristine() {
  const pristine = new Pristine(form, {
    classTo: 'text',
    errorTextParent: 'text'
  });
  pristine.addValidator(inputForHashtags, (value) => validHashtags(value), 'Incorrect hashtags');
  form.addEventListener('submit', (evt) => {
    const isValid = pristine.validate();
    if (!isValid) {
      evt.preventDefault();
    }
  });
}

function openForm() {
  uploadFile.addEventListener('change', () => {
    classImgUploadOverlay.classList.remove('hidden');
    body.classList.add('modal-open');
    workWithPristine();
    scaleValue.value = '100%';
    editImg.style.transform = `scale(${1})`;
    effect = 'effect-none';
    fieldForSlider.classList.add('hidden');
    editImg.classList.add('effects__preview--none');
    addListeners();
    noUiSlider.create(slider, {
      range: {
        min: 0,
        max: 0,
      },
      start: 0
    });
    slider.noUiSlider.on('update', () => {
      switchingSLider();
    });
  });
}

function closeForm() {
  classImgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  removeListeners();
  // eslint-disable-next-line no-return-assign
  document.querySelectorAll('input, textarea').forEach((el)=>el.value = '');
}
