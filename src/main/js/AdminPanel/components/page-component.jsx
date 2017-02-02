import React from 'react';
import ChapterRepository from '../chapter-repository.js';

export default class PageComponent extends React.Component {

    constructor() {
        super();
    }

    render() {
        return (
            <div className="page">
                <img src={this._resolvePath()}/>
                <button onClick={this._handleDelete.bind(this)}>Delete</button>
                <div className="order-arrows">
                    <div className="up-arrow">^</div>
                    <div className="down-arrow">v</div>
                </div>
            </div>
        );
    }

    _resolvePath() {
        return `{this.props.chapterPath}/{this.props.fileName}`;
    }

    _handleDelete(event) {
        this.props._deletePage(this.props.fileName);
    }

}