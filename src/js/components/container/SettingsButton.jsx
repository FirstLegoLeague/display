import React, { Component } from 'react'
import Modal from 'react-foundation-modal'

import Settings from '../../services/settings'
import Switch from '../controls/Switch.jsx'
import NumericSlider from '../controls/NumericSlider.jsx'

const SETTINGS_TITLES = {
  showTimer: 'Show timer',
  showLogos: 'Show Logos Strip',
  highContrast: 'Use High Contrast colors',
  RTL: 'Right to Left',
  scrollSpeed: 'Scroll Speed'
}

class SettingsButton extends Component {
  constructor () {
    super()

    this.state = {
      settings: Settings.settings,
      modalIsOpen: false
    }

    Settings.on('update', () => {
      this.setState({ settings: Settings.settings })
    })
  }

  renderSetting (setting) {
    let settingControl = null
    switch (typeof (setting.value)) {
      case 'boolean':
        settingControl = <Switch setting={setting} onUpdate={() => Settings.set(setting.key, !setting.value)} />
        break

      case 'number':
        settingControl = <NumericSlider setting={setting}
          onUpdate={e => Settings.set(setting.key, parseInt(e.target.value))}
          min='1' max='5' />
        break
    }

    return <div className='setting grid-x'>
      {settingControl}
      <div>{setting.title}</div>
    </div>
  }

  render () {
    const settings = Object.entries(this.state.settings).map(([key, value]) => ({ key, value, title: SETTINGS_TITLES[key] }))
    return [
      <div className='settings show-on-hover button' onClick={() => this.setState({ modalIsOpen: !this.state.modalIsOpen })}>
        Settings
      </div>,
      <Modal id='settings-modal' isModal size='small' open={this.state.modalIsOpen} closeModal={() => this.setState({ modalIsOpen: false })} >
        <h1>Settings</h1>
        {settings.map(setting => this.renderSetting(setting))}
      </Modal>
    ]
  }
}

export default SettingsButton
