import axios from 'axios'

class AWContactService {
  constructor () {
    this.api = axios.create({
      baseURL: 'https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod',
    })
  }

  async createEnquiry (body) {
    const { name, email } = body
    try {
      let { data } = await this.api.post(`/fake-auth`, { name, email })
      return data
    } catch (e) {
      if (e.hasOwnProperty('response')) {
        if ( e.response.data.errorMessage === 'Bad Request: Email is already in use') throw new Error('Email already registered')
        throw new Error(e.response.data.errorMessage)
      }
      throw new Error('The request could not be completed. Check your connection.')
    }
  }

}

export let API = new AWContactService()
export default AWContactService
