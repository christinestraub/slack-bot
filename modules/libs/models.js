const models = {
  params: {
    auth: {
      grant_type: 'password',
      scope: 'admin manager user'
    }
  },
  saelos: {
    api: {
      oauth_token: '/oauth/token',
    },
    tokenTypes: {
      Bearer: 'Bearer'
    }
  }
}

module.exports = models
