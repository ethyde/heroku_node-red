import { createServer } from 'http'

import app from './app/app'

const server = createServer(app)

server.listen(app.get('port'), () => {
  console.log('✔ Server listening on port', app.get('port'))
})

// heroku logs --app glacial-island-98070 --tail