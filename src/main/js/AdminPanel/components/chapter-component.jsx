import React from 'react';
import PageComponent from './page-component.jsx';
import ChapterRepository from '../chapter-repository.js';
import PageUpload from './page-upload.jsx';

export default class ChapterComponent extends React.Component {
    constructor() {
        super();

        this.state = {
            selected: false,
            chapter: {
                name: "",
                pages: [],
                path: ""
            }
        };
    }

    componentDidMount() {
        this._fetchChapter();
    }

    render(){
        return this._getChapterPanel();
    }

    _getChapterPanel() {
        return (
            <div className="chapter">
                <h1>{this.state.chapter.name}</h1>
                <PageUpload chapter={this.state.chapter.id} callback={this._fetchChapter.bind(this)}/>
                <div>{this._getPages()}</div>
            </div>
        );
    }

    _getPages() {
        return this.state.chapter.pages.map(
            (page) => <PageComponent imgSrc={"pages/" + this.state.chapter.path + "/" + page}/>
        );
    }

    _fetchChapter() {
        ChapterRepository.find(this.props.id).then((chapter) => {
            this.setState({chapter: chapter});
        });
    }
}