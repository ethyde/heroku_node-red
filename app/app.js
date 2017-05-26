// server.js

// set up ======================================================================
// get all the tools we need
import express  from 'express'

// configuration ===============================================================
const app = express()

// set up our express application
app.set('port', process.env.PORT || 3000)
app.use('/',express.static('public')) // server static content from public

// Export to server.js =========================================================
export default app