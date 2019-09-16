import React, { Component } from 'react'
import { ButtonGroup, Button } from 'semantic-ui-react'

class EnumSetting extends Component {
  constructor (props) {
    super(props)
    this.props = props
  }

  render () {
    return <ButtonGroup id={this.props.setting.key} name={this.props.setting.key}>
      {this.props.buttonValues.map(value => { return <Button value={value} onClick={this.props.onClick}>{value}</Button> })}
    </ButtonGroup>
  }
}

export default EnumSetting
