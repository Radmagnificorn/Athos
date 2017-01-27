import React from 'react';
import ChapterComponent from './chapter-component.jsx';
import ChapterRepository from './chapter-repository.js';

export default class ChapterSelector extends React.Component {

    constructor() {
        super();
        this.state = {
            chapters: []
        }
    }

    render() {
        return (
            <div>{this._getChapters()}</div>
        );
    }

    _getChapters() {
        return this.state.chapters.map(chapter => <ChapterComponent id={chapter.id}/>);
    }

    componentDidMount() {
        ChapterRepository.findAll().then(chapters => this.setState({chapters: chapters}));
    }
}