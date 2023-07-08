const whitelist = require('./allowedOrigin')
const corsOptions = {
  origin: function (origin, cb) {
    if (whitelist.indexOf(origin) !== -1) {
      cb(null, true)
    } else {
      cb(new Error('Not allowed by CORS'))
    }
  }
 }
module.exports = corsOptions