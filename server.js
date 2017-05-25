import { createServer } from 'http'

import app from './app/app'
import dbConnect from './models/connections'

dbConnect(() => {
  console.log('✔ Connection established to mongoDB database')

  const server = createServer(app)

  server.listen(app.get('port'), () => {
    console.log('✔ Server listening on port', app.get('port'))
  })

})