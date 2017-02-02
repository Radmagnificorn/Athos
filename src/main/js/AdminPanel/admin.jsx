import './admin.less';
import 'whatwg-fetch';

import React from 'react';
import ReactDOM from 'react-dom';
import ChapterRepository from './chapter-repository.js';
import ChapterSelector from './components/chapter-selector.jsx';
import PageUpload from './components/page-upload.jsx';

ChapterRepository.setBaseUrl("/chapters/");

let mp = document.getElementById('mainPanel');
let sp = document.getElementById('secondPanel');


ReactDOM.render(<ChapterSelector/>, mp);
