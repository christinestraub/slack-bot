'use strict'

/**
 * available actions
 *
 *  login [username] [password]
 *  who is [contact name]
 */

const exps = {
  login: /login *([a-zA-Z0-9_@.]*) *([a-zA-Z0-9_]*)/gm,
  whois: /who *is *([a-zA-Z0-9_ ]*)/gm,
};

function parse (text) {
  for (let name in exps) {
    const match = exps[name].exec(text)
    if (match && match.length) {
      return { name, match }
    }
  }

  return {}
}

module.exports = parse
