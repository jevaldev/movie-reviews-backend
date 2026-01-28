import { validateFilterMovie } from './movie.schema.js'

export class MoviesController {
  constructor ({ MovieModel }) {
    this.MovieModel = MovieModel
  }

  getAllMovies = async (req, res, next) => {
    try {
      const limit = Number(req.query.limit) || 5
      const offset = Number(req.query.offset) || 0

      const parsedLimit = Number(limit)
      const parsedOffset = Number(offset)

      const movies = await this.MovieModel.getAllMovies({ limit: parsedLimit, offset: parsedOffset })
      res.json({ status: 'ok', message: 'Movies fetched successfully', data: movies })
    } catch (error) {
      next(error)
    }
  }

  getMovieByID = async (req, res, next) => {
    const { id } = req.params
    if (!id) throw new Error('Especifique un id')

    try {
      const movie = await this.MovieModel.getMovieByID({ id })
      res.json({ status: 'ok', message: 'Movie found', data: movie })
    } catch (error) {
      next(error)
    }
  }

  getMoviesFiltered = async (req, res, next) => {
    const limit = Number(req.query.limit) || 5
    const offset = Number(req.query.offset) || 0
    const result = validateFilterMovie(req.query)

    if (result.error) return res.status(400).json({ status: 'error', message: result.error.details[0].message })
    console.log(result)

    try {
      const movies = await this.MovieModel.getMoviesFiltered({ filter: result.data, limit, offset })
      res.json({ status: 'ok', message: 'Movies fetched successfully', data: movies })
    } catch (error) {
      next(error)
    }
  }
}
