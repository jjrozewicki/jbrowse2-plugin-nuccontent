
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./jbrowsepluginnuccontent.cjs.production.min.js')
} else {
  module.exports = require('./jbrowsepluginnuccontent.cjs.development.js')
}
