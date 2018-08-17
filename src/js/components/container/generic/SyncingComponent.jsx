import { Component } from 'react'
import Messenger from '../../../services/messenger'
import axios from 'axios'

class Title extends Component {

  constructor(topic, urlPromise) {
    super()
    this.topic = `${topic}:reload`
    this.state = { data: '' }
    this.urlPromise = urlPromise.then(url => this.url = url)
  }

  componentWillMount() {
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

export default Title
