export class MoviesNotFound extends Error {
  constructor (message = 'Movies not found') {
    super(message)
    this.name = 'MoviesNotFound'
    this.status = 404
  }
}

export class DatabaseConnectionError extends Error {
  constructor (message = 'Error connecting to database') {
    super(message)
    this.name = 'DatabaseConnectionError'
    this.status = 500
  }
}

export class DatabaseQueryError extends Error {
  constructor (message = 'Error on the SQL query') {
    super(message)
    this.name = 'DatabaseQueryError'
    this.status = 500
  }
}
