import React from 'react';
import ChapterRepository from '../chapter-repository.js';

export default class NewChapter extends React.Component {

    constructor() {
        super();
        this.state = {
            showForm: false,
            title: '',
            path: ''
        };
    }

    render() {

        let form = this.state.showForm ? this._getNewChapterForm() : "";

        return (
            <div>
                <button onClick={this._toggleNewChapterForm.bind(this)}>New Chapter</button>
                {form}
            </div>
        );
    }

    _toggleNewChapterForm() {
        this.setState({showForm: !this.state.showForm});
    }

    _getNewChapterForm() {
        return (
            <form onSubmit={this._addChapter.bind(this)} onChange={this._handleChange.bind(this)}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input type="text" value={this.state.title} name="title" />
                </div>
                <div>
                    <label htmlFor="path">Path</label>
                    <input type="text" value={this.state.path} name="path" />
                </div>
                <button type="submit">Add</button>
            </form>
        );
    }

    _handleChange(event) {

        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        });
    }

    _addChapter(event) {
        event.preventDefault();

        ChapterRepository.saveChapter({
            name: this.state.title,
            path: this.state.path,
            chapters: []
        }).then((result) => {
            this.props.refreshParent();
        });
    }
}