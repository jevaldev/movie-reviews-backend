import { dbConnection } from '../config/database.js'
import { DatabaseConnectionError, DatabaseQueryError, MovieNotFound } from './movies.errors.js'

export class MovieModel {
  static async getAllMovies ({ limit, offset }) {
    const query = `SELECT 
        BIN_TO_UUID(id) id, 
        titulo, 
        imagen, 
        fecha_salida, 
        autores, 
        descripcion, 
        puntuacion_media 
        FROM movies LIMIT ? OFFSET ?`

    try {
      const [rows] = await dbConnection.query(query, [limit, offset])
      if (rows.length === 0 || !rows) throw new MovieNotFound('Movies not found')
      return rows
    } catch (error) {
      if (error.code === 'ECONNREFUSED') throw new DatabaseConnectionError()
      if (error instanceof MovieNotFound) throw error

      throw new DatabaseQueryError()
    }
  }

  static async getMovieByID ({ id }) {
    const query = 'select BIN_TO_UUID(id) id, titulo, imagen, fecha_salida, autores, descripcion, puntuacion_media from movies where BIN_TO_UUID(id) = ?'

    try {
      const [rows] = await dbConnection.query(query, id)
      if (rows.length === 0 || !rows) throw new MovieNotFound()

      return rows
    } catch (error) {
      if (error.code === 'ECONNREFUSED') throw new DatabaseConnectionError()
      if (error instanceof MovieNotFound) throw error

      throw new DatabaseQueryError()
    }
  }

  static async getMoviesFiltered ({ filter, limit, offset }) {
    console.log('FILTER DATA:', filter)
    const conditions = []
    const params = []

    if (filter.title) {
      conditions.push('LOWER(titulo) LIKE ?')
      params.push(`%${filter.title.toLowerCase()}%`)
    }

    if (filter.author) {
      conditions.push('LOWER(autores) LIKE ?')
      params.push(`%${filter.author.toLowerCase()}%`)
    }

    if (filter.category) {
      conditions.push('LOWER(categoria) LIKE ?')
      params.push(`%${filter.category.toLowerCase()}%`)
    }

    const whereClause = conditions.length
      ? `WHERE ${conditions.join(' OR ')}`
      : ''

    const query = `
  SELECT 
    BIN_TO_UUID(id) id,
    titulo,
    imagen,
    fecha_salida,
    autores,
    descripcion,
    puntuacion_media
  FROM movies
  ${whereClause}
  LIMIT ? OFFSET ?
`

    params.push(limit, offset)

    try {
      const [rows] = await dbConnection.query(query, params)
      if (rows.length === 0 || !rows) throw new MovieNotFound('Movies not found')
      return rows
    } catch (error) {
      console.log(error)
      if (error.code === 'ECONNREFUSED') throw new DatabaseConnectionError()
      if (error instanceof MovieNotFound) throw error

      throw new DatabaseQueryError()
    }
  }
}
