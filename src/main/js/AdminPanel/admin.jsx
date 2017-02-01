import './admin.css';
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

ReactDOM.render(<PageUpload/>, sp);

ChapterRepository.find(2).then(chapter => alert("name: " + chapter.name));