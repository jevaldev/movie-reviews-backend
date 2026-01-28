import { Router } from 'express'
import { MoviesController } from './movie.controller.js'
import { MoviesModel } from './movie.model.js'

export const movieRouter = Router()
const moviesController = new MoviesController({ MoviesModel })

movieRouter.get(('/'), moviesController.getMovies)
movieRouter.get(('/filtered'), moviesController.getFilteredMovies)
movieRouter.get(('/:id'), moviesController.getMovieByID)
