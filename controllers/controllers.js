import { SunatModel } from '../models/local-file-system/models.js'
import { validateSunat, validatePartialSunat } from '../schemas/sunat.js'

export class routeController {
  static async getAll (req, res) {
    const { id, clave } = req.query
    const datos = {
      grant_type: 'client_credentials',
      campo2: 'https://api.sunat.gob.pe/v1/contribuyente/contribuyentes',
      client_id: id,
      client_secret: clave
    }
    const result = validateSunat(datos)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const user = await SunatModel.getAll({ id, clave, datos })
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.status(201).json(user)
  }

  static async getById (req, res) {
    // path-to-regexp
    const { id } = req.params
    const movie = await SunatModel.getById({ id })
    if (movie) return res.json(movie)
    res.status(404).json({ message: 'Movie not found' })
  }

  static async create (req, res) {
    const result = validateSunat(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const newMovie = await SunatModel.create({ input: result.data })
    res.status(201).json(newMovie)
  }

  static async delete (req, res) {
    const { id } = req.params

    const result = await SunatModel.delete({ id })

    if (result === false) {
      return res.status(404).json({ message: 'Movie not found' })
    }

    return res.json({ message: 'Movie deleted' })
  }

  static async update (req, res) {
    const result = validatePartialSunat(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params

    const updatedMovie = await SunatModel.update({ id, input: result.data })
    return res.json(updatedMovie)
  }
}
