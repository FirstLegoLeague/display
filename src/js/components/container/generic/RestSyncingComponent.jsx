import { Component } from 'react'

import axios from 'axios'

import Messenger from '../../../services/messenger'

class RestSyncingComponent extends Component {
  constructor (topic, urlPromise) {
    super()
    this.topic = topic
    this.state = { data: '' }
    this.urlPromise = urlPromise.then(url => { this.url = url })
  }

  componentWillMount () {
    this.reload()
    Messenger.on(this.topic, () => this.reload())
  }

  reload () {
    return this.urlPromise
      .then(() => axios.get(this.url))
      .then(response => {
        this.setState({ data: response.data })
      })
      .catch(error => {
        console.warn(error)
        this.setState({ error })
      })
  }
}

export default RestSyncingComponent
