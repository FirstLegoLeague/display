import { Component } from 'react'
import Messanger from '../../../services/messanger'
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
    Messanger.on(this.topic, this.reload)
  }

  reload () {
    return this.urlPromise
    .then(() => axios.get(this.url))
    .then(response => {
      this.setState({ data: response.data })
    })
  }

}

export default Title
