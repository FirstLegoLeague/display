import React, { Component } from 'react'

const DEFAULT_SPEED = 1
const DEFAULT_DELAY = 0

class InfiniteStripe extends Component {
  constructor (props) {
    super(props)
    this.state = { scrollLeft: 0 }
  }

  scrollCallback () {
    this.setState({ scrollLeft: this.newScroll(this.state.scrollLeft) })
    window.requestAnimationFrame(() => this.scrollCallback())
  }

  componentDidMount () {
    setTimeout(() => window.requestAnimationFrame(() => this.scrollCallback()), (this.props.delay || DEFAULT_DELAY))
  }

  newScroll (oldScroll) {
    const width = this.refs.stripe.scrollWidth
    if (!this.isScrolling()) {
      return 0
    } else if (oldScroll >= width / 2) {
      return oldScroll - width / 2
    } else {
      return oldScroll + (this.props.speed || DEFAULT_SPEED)
    }
  }

  isScrolling () {
    return this.refs.stripe.parentElement ? this.refs.stripe.parentElement.clientWidth < this.refs.stripe.scrollWidth : false
  }

  render () {
    const scrolling = Object.keys(this.refs).length ? this.isScrolling() : false
    const children = this.props.children

    if (scrolling) {
      return <div className='infinite-stripe scrolling' id={this.props.id} ref='stripe' style={{ direction: 'ltr', marginLeft: -this.state.scrollLeft }}>
        {children}
        {children}
      </div>
    } else {
      return <div className='infinite-stripe' id={this.props.id} ref='stripe' style={{ direction: 'ltr', marginLeft: -this.state.scrollLeft }}>
        {children}
      </div>
    }
  }
}

export default InfiniteStripe
