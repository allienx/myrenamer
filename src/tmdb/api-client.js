import axios from 'axios'

export default class ApiClient {
  constructor(config = {}) {
    this.http = axios.create(config)
  }

  send(config) {
    return this.http.request(config)
  }
}
