import './admin.css';

import React from 'react';
import ReactDOM from 'react-dom';
import PageComponent from './PageComponent.jsx';



let mp = document.getElementById('mainPanel');

ReactDOM.render(<PageComponent imgSrc="/pages/chapter3/panel1.png" />, mp);