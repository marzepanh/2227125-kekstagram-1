import './img_upload.js';
import { getData } from './api.js';
import { renderPhotos } from './rendering.js';
getData((photos) => {renderPhotos(photos);});
import './my_photo.js';
