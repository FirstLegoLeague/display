import React, { Component } from 'react'

const DEFAULT_SPEED = 10

class InfiniteStripe extends Component {
  constructor (props) {
    super(props)
    this.state = { scrollLeft: 0 }
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({ scrollLeft: this.newScroll(this.state.scrollLeft) })
    }, 1000 / (this.props.speed || DEFAULT_SPEED))
  }

  newScroll(oldScroll) {
    const width = this.refs.stripe.scrollWidth
    if(oldScroll >= width / 2) {
      return 0
    } else {
      return oldScroll + 1
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
  	let children = this.props.children
    return <div className="infinite-stipe" id={this.props.id} ref="stripe" style={{marginLeft: -this.state.scrollLeft}}>
      {children}
      {children}
    </div>
  }
}

export default InfiniteStripe
