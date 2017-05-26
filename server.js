import app from './app/app'

app.listen(app.get('port'), () => {
  console.log('✔ Server listening on port', app.get('port'))
})