import React, { Component } from 'react'

const DEFAULT_SPEED = 10

class InfintieTable extends Component {
  constructor (props) {
    super(props)
    this.state = { scrollTop: 0 }
  }

  componentDidMount() {
    let self = this
    this.interval = setInterval(() => {
      self.setState({ scrollTop: self.state.scrollTop + 1 })
    }, 1000 / (this.props.speed || DEFAULT_SPEED))
  }

  componentDidUpdate() {
    const width = this.refs.scrolling.scrollHeight
    if(this.state.scrollTop >= width / 2) {
      this.setState({ scrollTop: 0 })
    }
  }

  headers() {
    if(!this.props.data.length) {
      return []
    }
    return Object.keys(this.props.data[0])
  }

  data() {
    return this.props.data.map(entry => Object.entries(entry))
  }

  cellClass(key) {
    let clazz = 'cell callout'

    if(this.props.largeCell === key)
      clazz += ' auto'
    else
      clazz += ' small-1 text-center'

    return clazz
  }

  render() {
    return <div className="infinite-table grid-x grid-y grid-padding-x grid-padding-y cell small-12" id={this.props.id}>
      <div className="cell small-12 grid-y">
        <div className="cell small-12">
          <div className="grid-x">
              {this.headers().map(column => <div className={`${this.cellClass(column)} text-center`}>{column}</div>)}
            </div>
          <div className="grid-x" style={{overflow: 'hidden'}}>
            <div ref="scrolling" className="cell small-12" style={{marginTop: -this.state.scrollTop}}>
              {this.data().map(entry => <div className="grid-x">
                {entry.map(([key, value]) => <div className={this.cellClass(key)}>{value}</div>)}
              </div>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  }
}

export default InfintieTable
