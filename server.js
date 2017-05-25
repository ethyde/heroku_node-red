import { createServer } from 'http'

import app from './app/app'

const server = createServer(app)

server.listen(app.get('port'), () => {
  console.log('✔ Server listening on port', app.get('port'))
})
// dbConnect(() => {
//   console.log('✔ Connection established to mongoDB database')


// })