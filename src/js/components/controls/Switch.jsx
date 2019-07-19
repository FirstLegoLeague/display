import React, { Component } from 'react'

import '../../../scss/components/settings.scss'

class Switch extends Component {
  constructor (props) {
    super(props)
    this.props = props
  }

  render () {
    return [<div className='switch'>
      <input className='switch-input' type='checkbox' id={this.props.setting.key}
        name={this.props.setting.key} checked={this.props.setting.value} onClick={this.props.onUpdate} />
      <label className='switch-paddle' for={this.props.setting.key} />
    </div>]
  }
}

export default Switch
