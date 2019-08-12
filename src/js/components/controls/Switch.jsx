import React, { Component } from 'react'
import { Checkbox } from 'semantic-ui-react'

import '../../../scss/components/settings.scss'

class Switch extends Component {
  constructor (props) {
    super(props)
    this.props = props
  }

  render () {
    return <Checkbox toggle onChange={this.props.onUpdate} checked={this.props.setting.value} />
  }
}

export default Switch
