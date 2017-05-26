import { createServer } from 'http'
// load node-red
import RED from 'node-red'
// and his settings
import settings from './app/node-red.settings'

// Load App
import app from './app/app'

const server = createServer(app)

// Setup node-red ==============================================================
RED.init( server, settings )

// Serve the editor UI from /red
app.use( settings.httpAdminRoot, RED.httpAdmin )

// Serve the http nodes UI from /api
app.use( settings.httpNodeRoot, RED.httpNode )

server.listen(app.get('port'), () => {
  console.log('✔ Server listening on port', app.get('port'))
  // Start the runtime
  RED.start()
})

// heroku logs --app glacial-island-98070 --tail