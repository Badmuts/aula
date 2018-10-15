import React from 'react'
import './dropdown.css'

export default class Dropdown extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dropdownIsOpen: false
        }
        this.onClick = this.onClick.bind(this)
    }

    componentWillMount() {
        document.addEventListener('mousedown', this.onClick, false)
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.onClick, false)
    }

    onClick(e) {
        if (this.node.contains(e.target)) {
            return this.setState({ dropdownIsOpen: true })
        }
        return this.setState({ dropdownIsOpen: false })
    }

    render() {
        return (
            <div className="dropdown" onClick={this.onClick} ref={ref => this.node = ref}>
                {this.props.children}
                <div className={["dropdown-menu", this.state.dropdownIsOpen && "is-open"].join(" ")}>
                    <ul>
                        {this.props.items.map(item => <li>{item}</li>)}
                    </ul>
                </div>
            </div>
        )
    }
}
