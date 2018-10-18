import React from 'react'
import Plyr from 'plyr'

export default class CourseVideo extends React.Component {
    constructor(props) {
        super(props)
        this.player = React.createRef()
    }

    componentDidMount() {
        new Plyr(this.player.current, { debug: false})
    }

    render() {
        const { videos } = this.props

        return (
            <div>
                {videos.map(video =>
                    <div key={video._id}>
                        <div ref={this.player} id="player" data-plyr-provider="youtube" data-plyr-embed-id={video.url}></div>
                        <h3 style={{fontFamily: 'Source Sans Pro'}}>{video.title}</h3>
                        <p>{video.description}</p>
                    </div>
                )}
            </div>
        )
    }
}
