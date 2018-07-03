'use strict';

const axios = require('axios')
const querystring = require('querystring')
const models = require('./models')

const tokenStore = {}

console.log('SAELOS_API_URL', process.env.SAELOS_API_URL)

const api = axios.create({
  baseURL: process.env.SAELOS_API_URL,
})

class Saelos {
  constructor(user_name) {
    this.user_name = user_name
  }

  async oauth(username, password) {
    const payload = {
      grant_type:  models.params.auth.grant_type,
      client_id: process.env.SAELOS_CLIENT_ID,
      client_secret: process.env.SAELOS_CLIENT_SECRET,
      username,
      password,
      remember: 0,
      scope: models.params.auth.scope
    }

    try {
      const response = await api.post(
        models.saelos.api.oauth_token,
        querystring.stringify(payload),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      )
      if (response.status === 200) {
        const { data } = response
        if (data.token_type === models.saelos.tokenTypes.Bearer) {
          tokenStore[this.user_name] = data
          return true
        }
      } else {
        return false 
      }
    } catch(_) {
      console.log(_)
      return false
    }
  }
  
  getAuth() {
    return new Promise((resolve, reject) => {
      const token = tokenStore[this.user_name]
      console.log('getAuth', token)
      if (token) {
        resolve(token)
      } else {
        reject('not authenticated')
      }
    })
  }
  
  apiWithAuth(options) {
    return this.getAuth()
      .then(credential => {
        options.headers.Authorization = `Bearer ${credential.access_token}`
        return api(options)
          .then(res => res.data)
      })
  }
  
  contacts() {
    return {
      count: () => {
        const options = {
          url: '/api/v1/contacts/count',
          method: 'GET',
          headers: {
            Accept: 'application/json'
          }
        }
        return this.apiWithAuth(options)
      },
      call: id => {
        return {
          status: 'success',
          result: 'not implemented yet'
        }
      },
      sms: id => {
        return {
          status: 'success',
          result: 'not implemented yet'
        }
      },
      email: id => {
        return {
          status: 'success',
          result: 'not implemented yet'
        }
      },
      list: () => {
        const options = {
          url: '/api/v1/contacts',
          method: 'GET',
          headers: {
            Accept: 'application/json'
          }
        }
        return this.apiWithAuth(options)
      },
      create: params => {
        return {
          status: 'success',
          result: 'not implemented yet'
        }
      },
      get: id => {
        return {
          status: 'success',
          result: 'not implemented yet'
        }
      },
      update: id => {
        return {
          status: 'success',
          result: 'not implemented yet'
        }
      },
      delete: () => {
        return {
          status: 'success',
          result: 'not implemented yet'
        }
      },
    }
  }
}

module.exports = Saelos
