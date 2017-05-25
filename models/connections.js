// Connection to mongoDB

import mongoose from 'mongoose'
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/test-node-red')

const db = mongoose.connection

db.on('error', () => {
  console.error('✘ CANNOT CONNECT TO mongoDB DATABASE !')
})

export default function listenToConnectionOpen (onceReady) {
  if (typeof onceReady === 'function') {
    db.on('open', onceReady)
  }
}
