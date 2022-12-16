import './data.js';
import './rendering.js';
import './img_upload.js';
import { getData } from './api.js';
import { render } from './rendering.js';
getData((photos) => {render(photos);});
