import Config from './config.js'

const MESSAGE_TYPES = {
  SUBSCRIBE: 'subscribe',
  LOGIN: 'login',
  PUBLISH: 'publish'
}
const IDENTITY_TOKEN_KEY = 'client-id'
const DEFAULT_NODE = 'default'

class Messanger {

  init () {
    let self = this

    if (!this._openingPromsie) {
      this.ws = new WebSocket(Config.mhub)
      this.node = Config.node || DEFAULT_NODE
      this.open = false
      this.headers = {}
      this.headers[IDENTITY_TOKEN_KEY] = parseInt(Math.floor(0x100000*(Math.random())), 16)
      this.listeners = []

      this._openingPromsie = new Promise((resolve, reject) => {
        self.ws.onopen = function () {
          self.ws.send(JSON.stringify({
            type: MESSAGE_TYPES.SUBSCRIBE,
            node: self.node
          }));

          self.open = true
          resolve(self.ws)
        }

        self.ws.onerror = function (e) {
          // TODO log
        }

        self.ws.onclose = function () {
          self.open = false
          // TODO log
        }

        self.ws.onmessage = function (msg) {
          var data = JSON.parse(msg.data)
          var headers = data.headers
          var topic = data.topic

          msg.from = headers[IDENTITY_TOKEN_KEY]
          msg.fromMe = (msg.from === self.token)

          self.listeners.filter(listener => {
            return (typeof(listener.topic) === 'string' && topic === listener.topic) ||
              (listener.topic instanceof RegExp && topic.matches(listener.topic))
          }).forEach(listener => listener.handler(data, msg))
        }
      })
    }

    return this._openingPromsie
  }

  on (topic, handler, ignoreSelfMessages) {
    let self = this
    
    this.init().then(() => {
      self.listeners.push({
        topic: topic,
        handler: (data, msg) => {
          if (!(msg.fromMe && ignoreSelfMessages))
            handler(data, msg)
        }
      })
    })
  }

  send (topic, data) {
    let self = this
    
    return this.init().then(function(ws) {
      ws.send(JSON.stringify({
        type: MESSAGE_TYPES.PUBLISH,
        node: self.node,
        topic: topic,
        data: data || {},
        headers: self.headers
      }))
    })
  }

}

export default new Messanger()
