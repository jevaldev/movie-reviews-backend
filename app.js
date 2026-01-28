import express from 'express'
import { movieRouter } from './src/movies/movie.routes.js'

const app = express()
const PORT = 3000 || process.env.PORT
app.disable('x-powered-by')

app.use('/movies', movieRouter)

app.use((req, res) => {
  res.status(404).json({ status: 'error', message: 'Route not found' })
})

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    status: 'error',
    type: err.name || 'InternalServerError',
    message: err.message || 'Unexpected error'
  })
})

app.listen((PORT), () => {
  console.log('Servidor corriendo en: ', PORT)
})
