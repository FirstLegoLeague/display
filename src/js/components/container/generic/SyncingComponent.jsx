import { Component } from 'react'
import Messanger from '../../../services/messanger'
import axios from 'axios'

class Title extends Component {

  constructor(topic, urlPromise) {
    super()
    this.topic = topic
    this.state = { data: '' }
    urlPromise.then(url => this.url = url)
  }

  componentDidMount() {
    this.reload()
    let topic = `${this.topic}:reload`
    Messanger.on(topic, () => this.reload())
  }

  reload () {
    return axios.get(this.url).then(response => {
      this.setState({ data: response.data })
    })
  }

}

export default Title
