export class MoviesController {
  constructor ({ MoviesModel }) {
    this.MoviesModel = MoviesModel
  }

  getMovies = async (req, res, next) => {
    try {
      const limit = Number(req.query.limit) || 5
      const offset = Number(req.query.limit) || 0

      const movies = await this.MoviesModel.getMovies({ limit, offset })

      res.json({ status: 'ok', limit, data: movies })
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  getMovieByID = async (req, res, next) => {
    try {
      const { id } = req.params

      const movie = this.MoviesModel.getMovieByID({ id: Number(id) })
      res.json({ status: 'ok', data: movie })
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
}
