import { dbConnection } from '../config/database.js'
import { DatabaseConnectionError, DatabaseQueryError, MoviesNotFound } from './movies.errors.js'
export class MoviesModel {
  static async getMovies ({ limit, offset }) {
    const query = `SELECT
      BIN_TO_UUID(id) id,
      titulo,
      imagen,
      fecha_salida,
      autores,
      categoria,
      descripcion,
      puntuacion_media
      FROM movies LIMIT ? OFFSET ?`

    try {
      const [rows] = await dbConnection.query(query, [limit, offset])

      if (rows.length === 0 || !rows) throw new MoviesNotFound()

      return rows
    } catch (error) {
      if (error.code === 'ECONNREFUSED') throw new DatabaseConnectionError()
      if (error instanceof MoviesNotFound) throw error

      throw new DatabaseQueryError()
    }
  }

  static async getMovieByID ({ id }) {
    const query = `SELECT
      BIN_TO_UUID(id) id,
      titulo,
      imagen,
      fecha_salida,
      autores,
      categoria,
      descripcion,
      puntuacion_media
      FROM movies 
      WHERE BIN_TO_UUID(id) = ?`

    try {
      const [rows] = await dbConnection.query(query, id)

      if (rows.length === 0 || !rows) throw new MoviesNotFound()

      return rows
    } catch (error) {
      if (error.code === 'ECONNREFUSED') throw new DatabaseConnectionError()
      if (error instanceof MoviesNotFound) throw error

      throw new DatabaseQueryError()
    }
  }

  static async getFilteredMovies ({ title, author, limit, offset }) {
    const conditions = []
    const params = []

    if (title) {
      conditions.push('LOWER(titulo) LIKE ?')
      params.push(`%${title.toLowerCase()}%`)
    }

    if (author) {
      conditions.push('LOWER(autores) LIKE ?')
      params.push(`%${author.toLowerCase()}%`)
    }

    const whereClauses = conditions.length > 1
      ? `WHERE ${conditions.join(' AND ')}`
      : `WHERE ${conditions.join(' OR ')}`

    const query = `
      SELECT
      BIN_TO_UUID(id) id,
      titulo,
      imagen,
      fecha_salida,
      autores,
      categoria,
      descripcion,
      puntuacion_media
      FROM movies
      ${whereClauses}
      LIMIT ? OFFSET ?
    `

    params.push(limit, offset)
    try {
      const [rows] = await dbConnection.query(query, params)

      if (rows.length === 0 || !rows) throw new MoviesNotFound()

      return rows
    } catch (error) {
      if (error.code === 'ECONNREFUSED') throw new DatabaseConnectionError()
      if (error instanceof MoviesNotFound) throw error

      throw new DatabaseQueryError()
    }
  }
}
