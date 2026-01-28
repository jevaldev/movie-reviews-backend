import { Router } from 'express'
import { movies } from './movie.data.js'
import { MoviesController } from './movie.controller.js'
import { MoviesModel } from './movie.model.js'

export const movieRouter = Router()
const moviesController = new MoviesController({ MoviesModel })

movieRouter.get(('/'), moviesController.getMovies)

movieRouter.get(('/:id'), (req, res) => {
  const { id } = req.params
  const movie = movies.filter(movie => movie.id === Number(id))

  res.send({ status: 'ok', data: movie })
})
