import React from 'react';
import PageComponent from './page-component.jsx';
import ChapterRepository from '../chapter-repository.js';
import PageUpload from './page-upload.jsx';

export default class ChapterComponent extends React.Component {
    constructor() {
        super();

        this.state = {
            visible: false
        }

    }

    render(){
        return this._getChapterPanel();
    }

    _getChapterPanel() {
        return (
            <div className="chapter">
                <h1 onClick={this._toggleVisibility.bind(this)}>{this.props.chapter.name}</h1>
                {this._getChapterDetails()}
            </div>
        );
    }

    _getChapterDetails() {
        let chapterDetails;

        if (this.state.visible) {
            chapterDetails = (
                <div className="chapterDetails">
                    <PageUpload chapter={this.props.chapter.id} refreshParent={this.props.refreshParent}/>
                    <button onClick={this._deleteChapter.bind(this)}>Delete</button>
                    <div>{this._getPages()}</div>
                </div>
            );
        }

        return chapterDetails;
    }

    _getPages() {
        return this.props.chapter.pages.map(
            (page) => {
                return (
                    <div className="page">
                        <img src={`pages/${this.props.chapter.path}/${page}`}/>
                        <span className="file-name">{page}</span>
                        <button onClick={() => this._removePage(page)}>Delete</button>
                        <div className="order-arrows">
                            <button onClick={() => this._changePagePosition(page, -1)} className="up-arrow">^</button>
                            <button onClick={() => this._changePagePosition(page, 1)} className="down-arrow">v</button>
                        </div>
                    </div>
                );
            }
        );
    }

    _removePage(page) {

        let chapter = this.props.chapter;
        let pageIndex = chapter.pages.indexOf(page);
        chapter.pages.splice(pageIndex, 1);
        this._saveChapter(chapter);
    }

    _changePagePosition(page, movement) {

        let chapter = this.props.chapter;
        let pageIndex = chapter.pages.indexOf(page);
        let newIndex = pageIndex + movement;

        if (newIndex >= 0 && newIndex < chapter.pages.length) {
            chapter.pages.splice(newIndex, 0, chapter.pages.splice(pageIndex, 1)[0]);

            this._saveChapter(chapter);
        }
    }

    _saveChapter(chapter) {
        ChapterRepository.saveChapter(chapter).then(result => this.props.refreshParent());
    }

    _deleteChapter(event) {
        ChapterRepository.deleteChapter(this.props.chapter.id).then((result) => {
            this.props.refreshParent();
        });
    }

    _toggleVisibility() {
        this.setState({visible: !this.state.visible});
    }
}