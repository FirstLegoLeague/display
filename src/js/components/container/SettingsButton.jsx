import React, { Component } from 'react'
import Modal from 'react-foundation-modal'

import Settings from '../../services/settings'

const SETTINGS_TITLES = {
  showTimer: 'Show timer',
  showLogos: 'Show Logos Strip',
  highContrast: 'Use High Contrast colors',
  RTL: 'Right to Left'
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
    // Currently all settings are boolean. In order to support generic settings, this option needs to be expanded
    return <div className="setting grid-x">
      <div className="switch">
        <input className="switch-input" type="checkbox" id={setting.key} name={setting.key} checked={setting.value} onClick={() => Settings.set(setting.key, !setting.value)} />
        <label className="switch-paddle" for={setting.key}></label>
      </div>
      <div>{setting.title}</div>
    </div>
  }

  render () {
    const settings = Object.entries(this.state.settings).map(([key, value]) => ({ key, value, title: SETTINGS_TITLES[key] }))

    return [<div className="settings show-on-hover button" onClick={() => this.setState({ modalIsOpen: !this.state.modalIsOpen })}>
      Settings
    </div>,
    <Modal id="settings-modal" isModal size="small" open={this.state.modalIsOpen} closeModal={() => this.setState({ modalIsOpen: false })} >
        <h1>Settings</h1>
        {settings.map(setting => this.renderSetting(setting))}
    </Modal>]
  }
}

export default SettingsButton
