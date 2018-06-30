
import React, { Component } from 'react'

const DEFAULT_SPEED = 10

class InfiniteStripe extends Component {
  constructor (props) {
    super(props)
    this.state = { scrollLeft: 0 }
  }

  componentDidMount() {
    let self = this
    this.interval = setInterval(() => {
      self.setState({ scrollLeft: self.state.scrollLeft + 1 })
    }, 1000 / (this.props.speed || DEFAULT_SPEED))
  }

  componentDidUpdate() {
    const width = this.refs.stripe.scrollWidth
    if(this.state.scrollLeft >= width / 2) {
      this.setState({ scrollLeft: 0 })
    }
}

  render() {
  	let children = this.props.children
    return <div id={this.props.id} ref="stripe" style={{marginLeft: -this.state.scrollLeft}}>
      {children}
      {children}
    </div>
  }
}

export default InfiniteStripe
