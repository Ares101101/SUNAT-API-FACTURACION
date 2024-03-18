import { newRequire } from '../../utils.js'
const querystring = newRequire('querystring')
const https = newRequire('https')

export class SunatConection {
  static async generarToken (input) {
    const formData = querystring.stringify(input)

    const req = https.request({
      hostname: `https://api-seguridad.sunat.gob.pe/v1/clientesextranet/${input.client_id}/oauth2/token/`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(formData)
      }
    }, (res) => {
      console.log(`Estado de la respuesta: ${res.statusCode}`)

      res.on('data', (d) => {
        process.stdout.write(d)
      })
    })

    req.on('error', (error) => {
      console.error(error)
    })
    req.end()
  }
}
