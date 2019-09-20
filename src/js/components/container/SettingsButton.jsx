import React, { Component } from 'react'
import { Button, Modal } from 'semantic-ui-react'

import Settings from '../../services/settings'
import Switch from '../controls/Switch.jsx'
import NumericSlider from '../controls/NumericSlider.jsx'
import EnumSetting from '../controls/EnumSetting.jsx'

const SETTINGS_TITLES = {
  showTimer: 'Show timer',
  showLogos: 'Show Logos Strip',
  RTL: 'Right to Left',
  scrollSpeed: 'Scroll Speed',
  textSize: 'Text Size'
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
      case 'string':
        settingControl = <EnumSetting setting={setting}
          onClick={e => Settings.set(setting.key, e.target.value)}
          buttonValues={['Small', 'Medium', 'Large']} />
        break
    }

    return <div className='setting field'>
      <label>{setting.title}</label>
      {settingControl}
    </div>
  }

  render () {
    const settings = Object.entries(this.state.settings).map(([key, value]) => ({ key, value, title: SETTINGS_TITLES[key] }))
    return [
      <Modal trigger={<Button className='settings primary show-on-hover'>Settings</Button>}>
        <Modal.Header>Settings</Modal.Header>
        <Modal.Content>
          <div className='ui form'>
            {settings.map(setting => this.renderSetting(setting))}
          </div>
        </Modal.Content>
      </Modal>
    ]
  }
}

export default SettingsButton
