import React from 'react';

export default class PageComponent extends React.Component {

    render() {
        return (
            <div className="page">
                <img src={this.props.imgSrc}/>
                <div className="order-arrows">
                    <div className="up-arrow">^</div>
                    <div className="down-arrow">v</div>
                </div>
            </div>
        );
    }

}