import { createServer } from 'http'

import app from './app/app'
import dbConnect from './models/connections'
// import RED from 'node-red'

dbConnect(() => {
  console.log('✔ Connection established to mongoDB database')

  const server = createServer(app)

  // console.log( server )

  // Initialise the runtime with a server and settings
  // RED.init(server, app);

  server.listen(app.get('port'), () => {
    console.log('✔ Server listening on port', app.get('port'))
  })

  // Start the runtime
  // RED.start();
})