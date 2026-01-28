import { Router } from 'express'
import { MoviesController } from './movie.controller.js'
import { MovieModel } from './movie.model.js'

const MovieController = new MoviesController({ MovieModel })
export const movieRouter = Router()

movieRouter.get('/', MovieController.getAllMovies)
movieRouter.get('/filtered', MovieController.getMoviesFiltered)
movieRouter.get('/:id', MovieController.getMovieByID)

// export const createMovieRouter = ({ MovieModel }) => {
//   const MovieController = new MoviesController({ MovieModel })
//   const movieRouter = Router()

//   movieRouter.get('/', (req, res) => {
//     res.json({ status: 'ok', message: 'Datos enviados correctamente', data: movies })
//   })

//   movieRouter.get('/:id', (req, res) => {
//     const { id } = req.params
//     const movie = movies.find(m => m.id === parseInt(id))

//     if (!movie) {
//       res.status(404).json({ status: 'error', message: 'Movie not found' })
//       return
//     }
//     res.json({ status: 'ok', message: 'Movie found', data: movie })
//   })
// }
