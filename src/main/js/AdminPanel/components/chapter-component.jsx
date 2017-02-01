import React from 'react';
import PageComponent from './page-component.jsx';
import ChapterRepository from '../chapter-repository.js';
import PageUpload from './page-upload.jsx';

export default class ChapterComponent extends React.Component {
    constructor() {
        super();

    }

    render(){
        return this._getChapterPanel();
    }

    _getChapterPanel() {
        return (
            <div className="chapter">
                <h1>{this.props.chapter.name}</h1>
                <PageUpload chapter={this.props.chapter.id} refreshParent={this.props.refreshParent}/>
                <button onClick={this._deleteChapter.bind(this)}>Delete</button>
                <div>{this._getPages()}</div>
            </div>
        );
    }

    _getPages() {
        return this.props.chapter.pages.map(
            (page) => <PageComponent imgSrc={"pages/" + this.props.chapter.path + "/" + page}/>
        );
    }

    _deleteChapter(event) {
        ChapterRepository.deleteChapter(this.props.chapter.id).then((result) => {
            this.props.refreshParent();
        });
    }
}