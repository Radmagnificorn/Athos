import React from 'react';
import ChapterRepository from './chapter-repository.js';

export default class PageUpload extends React.Component {

    render() {
        return (
            <form id="pageUpload" onSubmit={this._handleSubmit.bind(this)}>
                <label htmlFor="uploadFile">page file:</label>
                <input name="uploadfile" type="file" ref={(input) => this.fileInput = input} />
                <button type="submit">upload</button>
            </form>
        );
    }

    _handleSubmit(event){
        event.preventDefault();
        ChapterRepository.savePage(this.props.chapter, this.fileInput.files[0]).then((response) => {
            this.props.callback();
        });
    }
}