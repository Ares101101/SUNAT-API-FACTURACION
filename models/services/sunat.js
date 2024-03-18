import axios from 'axios'
import querystring from 'querystring'

export class SunatConnection {
  static async generarToken (input) {
    const formData = querystring.stringify(input)

    try {
      const response = await axios.post(
        `https://api-seguridad.sunat.gob.pe/v1/clientesextranet/${input.client_id}/oauth2/token/`,
        formData,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      )

      return response.data
    } catch (error) {
      return {
        error
      }
    }
  }
}
