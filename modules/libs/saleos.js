'use strict';

const axios = require('axios')
const querystring = require('querystring')

let oauthCredential = null

console.log(process.env.SAELOS_API_URL)

const api = axios.create({
  baseURL: process.env.SAELOS_API_URL,
})

async function oauth() {
  const payload = {
    grant_type: 'password',
    client_id: process.env.SAELOS_CLIENT_ID,
    client_secret: process.env.SAELOS_CLIENT_SECRET,
    username: process.env.SAELOS_USERNAME,
    password: process.env.SAELOS_PASSWORD,
    remember: 0,
    scope: 'admin manager user'
  }

  try {
    const response = await api.post(
      '/oauth/token',
      querystring.stringify(payload),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    )
    if (response.status === 200) {
      const { data } = response
      if (data.token_type === 'Bearer') {
        oauthCredential = data
        return true
      }
    } else {
      return false 
    }
  } catch(_) {
    return false
  }
}

function getAuth() {
  return new Promise((resolve, reject) => {
    if (oauthCredential) {
      resolve(oauthCredential)
    } else {
      oauth()
        .then(res => res ? resolve(oauthCredential) : reject(null))
    }
  })
}

function apiWithAuth(options) {
  return getAuth()
    .then(credential => {
      options.headers.Authorization = `Bearer ${credential.access_token}`
      return api(options)
        .then(res => res.data)
    })
}

const contacts = {
  count: () => {
    const options = {
      url: '/api/v1/contacts/count',
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    }
    return apiWithAuth(options)
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
    return apiWithAuth(options)
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

module.exports = {
  contacts,
  oauth,
}
