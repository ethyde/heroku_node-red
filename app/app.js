// server.js

// set up ======================================================================
// get all the tools we need
import express  from 'express'
import { createServer } from 'http'

// configuration ===============================================================

// load node-red
import RED from 'node-red'
// and his settings
import settings from './node-red.settings'

const app = express()


// set up our express application
app.set('port', process.env.PORT || 3000)
app.use('/',express.static('public')) // server static content from public

const server = createServer(app)
// Setup node-red ==============================================================
RED.init( server, settings )

// Serve the editor UI from /red
app.use( settings.httpAdminRoot, RED.httpAdmin )

// Serve the http nodes UI from /api
app.use( settings.httpNodeRoot, RED.httpNode )

// Start the runtime
RED.start()

// Export to server.js =========================================================
export default app
