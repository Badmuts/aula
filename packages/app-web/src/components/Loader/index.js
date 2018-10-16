import React from 'react'
import './loader.css'

export default class Loader extends React.Component {
    render() {
        return (
            <div className="loader" {...this.props}>
                <div className="rect1"></div>
                <div className="rect2"></div>
                <div className="rect3"></div>
                <div className="rect4"></div>
                <div className="rect5"></div>
            </div>
        )
    }
}
