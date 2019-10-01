import React, { Component } from 'react'

const DEFAULT_SPEED = 1
const DEFAULT_DELAY = 1000
const NO_SHOW_CONTENT = <i className='ui minus icon' />

class InfiniteTable extends Component {
  constructor (props) {
    super(props)
    this.state = { scrollTop: 0 }
  }

  scrollCallback () {
    this.setState({ scrollTop: this.newScroll(this.state.scrollTop) })
    window.requestAnimationFrame(() => this.scrollCallback())
  }

  componentDidMount () {
    setTimeout(() => window.requestAnimationFrame(() => this.scrollCallback()), (this.props.delay || DEFAULT_DELAY))
  }

  newScroll (oldScroll) {
    const height = this.bodyScrollHeight()
    if (!this.isScrolling()) {
      return 0
    } else if (oldScroll >= height / 2) {
      return oldScroll - height / 2
    } else {
      return oldScroll + (this.props.speed || DEFAULT_SPEED)
    }
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  data () {
    return this.props.data.map(entry => this.props.headers.map(header => ([header, entry[header]])))
  }

  bodyScrollHeight () {
    return this.state.scrollTop + this.refs.body.scrollHeight
  }

  cellClass (key) {
    let clazz = ''

    if (this.props.largeCell === key) { clazz += ' large' }

    if (this.props.highlight && this.props.highlight.includes(key)) { clazz += ' ui primary basic' }

    return clazz
  }

  isScrolling () {
    return this.refs.body.clientHeight < this.bodyScrollHeight()
  }

  lineStyle (line, data, withScrollMargin) {
    const lineStyle = { }
    if (withScrollMargin && line === 0) {
      lineStyle.marginTop = -this.state.scrollTop
    } else if (line === data.length - 1) {
      lineStyle.marginBottom = '1em'
    }
    return lineStyle
  }

  renderTable () {
    const scrolling = Object.keys(this.refs).length ? this.isScrolling() : false
    const data = this.data()
    const firstTable = data.map((entry, index) => <tr style={this.lineStyle(index, data, true)}>
      {entry.map(([key, value]) => <td class={this.cellClass(key)}>{(value === '-') ? NO_SHOW_CONTENT : value}</td>)}
    </tr>)
    const secondTable = data.map((entry, index) => <tr style={this.lineStyle(index, data, false)}>
      {entry.map(([key, value]) => <td class={this.cellClass(key)}>{(value === '-') ? NO_SHOW_CONTENT : value}</td>)}
    </tr>)

    if (scrolling) {
      return <tbody ref='body' style={{ overflow: 'hidden' }}>
        {firstTable}
        {secondTable}
      </tbody>
    } else {
      return <tbody ref='body' style={{ overflow: 'hidden' }}>
        {firstTable}
      </tbody>
    }
  }

  fontSize (size) {
    switch (size) {
      case 'Small':
        return '14px'
      case 'Medium':
        return '16px'
      case 'Large':
        return '18px'
    }
  }

  render () {
    return <div className='infinite-table ui segment' id={this.props.id} style={{ fontSize: this.fontSize(this.props.textSize) }}>
      <table ref='parent' className='ui scrollable single line very basic compact table'>
        <thead>
          <tr ref='headers' className='headers'>
            {this.props.headers.map(column => <th class={this.cellClass(column)}>{column}</th>)}
          </tr>
        </thead>
        {this.renderTable()}
      </table>
    </div>
  }
}

export default InfiniteTable
