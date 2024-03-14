import { randomUUID } from 'node:crypto'
import { readJSON, newRequire } from '../../utils.js'
const axios = newRequire('axios')
const qs = newRequire('qs')
const movies = readJSON('./movies.json')

export class SunatModel {
  static async getAll ({ id, clave, result }) {
    if (id && clave && result) {
      try {
        const urlDestino = `https://api-seguridad.sunat.gob.pe/v1/clientesextranet/${id}/oauth2/token/` // URL a la que quieres hacer la petición POST
        const datosSerializados = qs.stringify(result)
        // Realizar la petición POST
        const respuesta = await axios.post(urlDestino, datosSerializados, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        // Aquí puedes manejar la respuesta
        return respuesta // Si quieres imprimir la respuesta en la consola
        // O hacer cualquier otra cosa con la respuesta recibida
      } catch (error) {
        return error
      }
    }
    return false
  }

  static async getById ({ id }) {
    const movie = movies.find(movie => movie.id === id)
    return movie
  }

  static async create ({ input }) {
    const newMovie = {
      id: randomUUID(),
      ...input
    }

    movies.push(newMovie)

    return newMovie
  }

  static async delete ({ id }) {
    const movieIndex = movies.findIndex(movie => movie.id === id)
    if (movieIndex === -1) return false

    movies.splice(movieIndex, 1)
    return true
  }

  static async update ({ id, input }) {
    const movieIndex = movies.findIndex(movie => movie.id === id)
    if (movieIndex === -1) return false

    movies[movieIndex] = {
      ...movies[movieIndex],
      ...input
    }

    return movies[movieIndex]
  }
}
