import React, { Component } from 'react'

const DEFAULT_SPEED = 10
const DEFAULT_DELAY = 1000

class InfiniteTable extends Component {
  constructor (props) {
    super(props)
    this.state = { scrollTop: 0,
      scrollSpeed: DEFAULT_SPEED
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.interval = setInterval(() => {
          this.setState({scrollTop: this.newScroll(this.state.scrollTop) })
          if (this.state.scrollSpeed !== this.props.speed) {
            console.log('scroll speed changed to ' + this.props.speed)
            this.setState({scrollSpeed: this.props.speed})
            this.componentWillUnmount()
            this.componentDidMount()
          }
      }, 1000 / (this.state.scrollSpeed))
    }, (this.props.delay || DEFAULT_DELAY))
  }

  newScroll(oldScroll) {
    const height = this.refs.body.scrollHeight
    if(oldScroll >= height / 2 || !this.isScrolling()) {
      return 0
    } else {
      return oldScroll + 1
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  data() {
    return this.props.data.map(entry => this.props.headers.map(header => ([header, entry[header]])))
  }

  cellClass(key) {
    let clazz = 'cell callout'

    if(this.props.largeCell === key)
      clazz += ' auto'
    else
      clazz += ' small-1 text-center'

    if(this.props.highlight && this.props.highlight.includes(key))
      clazz += ' primary'

    return clazz
  }

  isScrolling() {
    return this.refs.parent.getBoundingClientRect().height < this.refs.body.scrollHeight
  }

  renderTable() {
    const scrolling = Object.keys(this.refs).length ? this.isScrolling() : false
    const data = this.data()
    const table = data.map((entry, index) => <div className="grid-x" style={(index === data.length - 1) ? {marginBottom: '1em'} : {}}>
      {entry.map(([key, value]) => <div className={this.cellClass(key)}>{value}</div>)}
    </div>)

    if(scrolling) {
      return <div ref="body" className="cell small-12" style={{marginTop: - this.state.scrollTop}}>
        {table}
        {table}
      </div>
    } else {
      return <div ref="body" className="cell small-12" style={{marginTop: 0}}>
        {table}
      </div>
    }
  }

  render() {
    return <div className="infinite-table grid-x grid-y grid-padding-x grid-padding-y cell small-12" id={this.props.id}>
      <div className="cell small-12 grid-y">
        <div ref="parent" className="cell small-12">
          <div ref="headers" className="grid-x headers">
            {this.props.headers.map(column => <div className={`${this.cellClass(column)} text-center`}>{column}</div>)}
          </div>
          <div className="grid-x" style={{overflow: 'hidden'}}>
            {this.renderTable()}
          </div>
        </div>
      </div>
    </div>
  }
}

export default InfiniteTable
