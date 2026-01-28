import { movies } from './movie.data.js'
export class MoviesModel {
  static async getMovies ({ limit, offset }) {
    const end = limit + offset

    const paginatedMovies = movies.slice(offset, end)
    return paginatedMovies
  }

  static async getMovieByID ({ id }) {
    const movie = movies.filter(movie => movie.id === id)

    return movie
  }

  static async getFilteredMovies ({ title, author }) {
    const normalizedTitle = title?.trim().toLowerCase()
    const normalizedAuthor = author?.trim().toLowerCase()

    return movies.filter(movie => {
      const matchTitle = normalizedTitle
        ? movie.titulo.toLowerCase().includes(normalizedTitle)
        : true

      const matchAuthor = normalizedAuthor
        ? movie.autores.some(autor => autor.toLowerCase().includes(normalizedAuthor))
        : true

      console.log(matchTitle, matchAuthor)

      return matchTitle && matchAuthor
    })
  }
}
