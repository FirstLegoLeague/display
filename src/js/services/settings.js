import EventEmitter from 'event-emitter-es6'

const DEFAULT_SETTINGS = {
  scrollSpeed: 1,
  textSize: 'Small',
  showTimer: true,
  showLogos: true,
  showNextUp: false,
  RTL: false
}
const SETTINGS_KEY = 'settings'

class Settings extends EventEmitter {
  constructor () {
    super()
    this._updateFromlocaStorage()
  }

  get (key) {
    this._updateFromlocaStorage()
    return this.settings[key]
  }

  set (key, value) {
    this.settings[key] = value
    localStorage[SETTINGS_KEY] = JSON.stringify(this.settings)
    this.emit('update')
  }

  _updateFromlocaStorage () {
    this.settings = Object.assign(DEFAULT_SETTINGS, localStorage[SETTINGS_KEY] ? JSON.parse(localStorage[SETTINGS_KEY]) : { })
  }
}

export default new Settings()
