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
                <NewChapter refreshParent={this._fetchChapters.bind(this)} />
                {this._getChapters()}
            </div>
        );
    }

    _getChapters() {
        return this.state.chapters.map(chapter => <ChapterComponent chapter={chapter} refreshParent={this._fetchChapters.bind(this)}/>);
    }


    componentDidMount() {
        this._fetchChapters();
    }

    _fetchChapters() {
        ChapterRepository.findAll().then(chapters => this.setState({chapters: chapters}));
    }
}