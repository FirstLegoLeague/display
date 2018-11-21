import { Component } from 'react'
import Messenger from '../../../services/messenger'
import axios from 'axios'

class RestSyncingComponent extends Component {

  constructor(topic, urlPromise) {
    super()
    this.topic = `${topic}`
    this.state = { data: '' }
    this.urlPromise = urlPromise.then(url => this.url = url)
  }

  componentWillMount() {
    this.load()
    Messenger.on(this.topic, (data, msg) => this.reload(data, msg))
  }

  load () {
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

  reload(data, msg){
    console.log(data,msg)
    this.setState({ data: data.data.value })
  }

}

export default RestSyncingComponent
