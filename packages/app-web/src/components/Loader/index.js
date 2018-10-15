import React from 'react'
import './loader.css'

export default class Loader extends React.Component {
    render() {
        return (
            <div class="loader" {...this.props}>
                <div class="rect1"></div>
                <div class="rect2"></div>
                <div class="rect3"></div>
                <div class="rect4"></div>
                <div class="rect5"></div>
            </div>
        )
    }
}
