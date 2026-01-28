import { movies } from './movie.data.js'
export class MoviesModel {
  static async getMovies ({ limit, offset }) {
    const end = limit + offset

    const filteredMovies = movies.slice(offset, end)
    return filteredMovies
  }

  static async getMovieByID ({ id }) {
    const movie = movies.filter(movie => movie.id === id)

    return movie
  }
}
