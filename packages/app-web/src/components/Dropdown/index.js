import React from 'react'

export default class Dropdown extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dropdownIsOpen: false
        }
    }

    componentWillMount() {
        document.addEventListener('mousedown', (e) => this.onClick(e), false)
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', (e) => this.onClick(e), false)
    }

    onClick(e) {
        if (this.node.contains(e.target)) {
            return this.setState({ dropdownIsOpen: true })
        }
        return this.setState({ dropdownIsOpen: false })
    }

    render() {
        return (
            <div className="dropdown" onClick={(e) => this.onClick(e)} ref={ref => this.node = ref}>
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
