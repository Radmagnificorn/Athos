import React from 'react';
import ChapterRepository from '../chapter-repository.js';

export default class PageComponent extends React.Component {

    constructor() {
        super();
    }

    render() {
        return (
            <div className="page">
                <img src={this.props.imgSrc}/>
                <button>Delete</button>
                <div className="order-arrows">
                    <div className="up-arrow">^</div>
                    <div className="down-arrow">v</div>
                </div>
            </div>
        );
    }

    _handleDelete(event) {
        ChapterRepository
    }

}