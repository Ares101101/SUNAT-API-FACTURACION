import axios from 'axios'
import querystring from 'querystring'

export class SunatConnection {
  static async generarToken (input) {
    // Convierte el objeto 'input' en una cadena de texto en formato de formulario URL-encoded
    const formData = querystring.stringify(input)

    try {
      const response = await axios.post(
        `https://api-seguridad.sunat.gob.pe/v1/clientesextranet/${input.client_id}/oauth2/token/`,
        formData,
        // Aquí se pasa la cadena de texto como cuerpo de la solicitud
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
            // Este encabezado indica que el cuerpo de la solicitud está en formato de formulario URL-encoded
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
