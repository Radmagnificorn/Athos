import React from 'react';
import ChapterComponent from './chapter-component.jsx';
import ChapterRepository from '../chapter-repository.js';
import NewChapter from './new-chapter.jsx';

export default class ChapterSelector extends React.Component {

    constructor() {
        super();
        this.state = {
            chapters: []
        }
    }

    render() {
        return (
            <div>
                <NewChapter />
                {this._getChapters()}
            </div>
        );
    }

    _getChapters() {
        return this.state.chapters.map(chapter => <ChapterComponent id={chapter.id}/>);
    }


    componentDidMount() {
        ChapterRepository.findAll().then(chapters => this.setState({chapters: chapters}));
    }
}