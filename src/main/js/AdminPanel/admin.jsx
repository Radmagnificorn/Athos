import './admin.css';
import 'whatwg-fetch';

import React from 'react';
import ReactDOM from 'react-dom';
import PageComponent from './page-component.jsx';
import ChapterComponent from './chapter-component.jsx';
import ChapterRepository from './chapter-repository.js';
import ChapterSelector from './chapter-selector.jsx';

ChapterRepository.setBaseUrl("/chapters/");

let mp = document.getElementById('mainPanel');


ReactDOM.render(<ChapterSelector/>, mp);

ChapterRepository.find(2).then(chapter => alert("name: " + chapter.name));