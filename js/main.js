import './img_upload.js';
import { getData } from './api.js';
import { renderPhotos } from './rendering.js';
import { showErr } from './util.js';
getData(renderPhotos, showErr);
import './my_photo.js';
