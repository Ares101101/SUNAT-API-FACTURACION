import https from 'https'
import querystring from 'querystring'

export class SunatConnection {
  static async generarToken (input) {
    return new Promise((resolve, reject) => {
      const formData = querystring.stringify(input)

      const req = https.request({
        hostname: 'api-seguridad.sunat.gob.pe',
        path: `/v1/clientesextranet/${input.client_id}/oauth2/token/`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(formData)
        }
      }, (res) => {
        let responseData = ''

        res.on('data', (chunk) => {
          responseData += chunk
        })

        res.on('end', () => {
          console.log(`Estado de la respuesta: ${res.statusCode}`)
          resolve(JSON.parse(responseData))
        })
      })

      req.on('error', (error) => {
        console.error(error)
        reject(error)
      })

      req.write(formData)
      req.end()
    })
  }
}
