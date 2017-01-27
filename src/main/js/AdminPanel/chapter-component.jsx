import React from 'react';
import PageComponent from './page-component.jsx';
import ChapterRepository from './chapter-repository.js';

export default class ChapterComponent extends React.Component {
    constructor() {
        super();

        this.state = {
            chapter: {
                name: "",
                pages: []
            }
        };
    }

    componentDidMount() {
        this._fetchChapter();
    }

    render(){
        return (
            <div className="chapter">
                <h1>{this.state.chapter.name}</h1>
                <div>{this._getPages()}</div>
            </div>
        );
    }

    _getPages() {
        return this.state.chapter.pages.map((page) => <PageComponent imgSrc={page}/>);
    }

    _fetchChapter() {
        ChapterRepository.find(this.props.id).then((chapter) => {
            this.setState({chapter: chapter});
        });
    }
}