import request from '../../../services/request'
const SEND_MESSAGE_URL = process.env.SEND_MESSAGE_URL

function notOffline(response) {
  return !JSON.stringify(response.data).includes('offline')
}

function notAutenticated(response) {
  return !JSON.stringify(response.data).includes('not equals authenticated')
}

export default async function sendMessage(token, to, msg) {
  const objResponse = { success: false, message: '' }

  const response = await request(SEND_MESSAGE_URL, { token, to, msg })

  if ((response.status === 200 || response.status === 201) && notOffline(response) && notAutenticated(response)) {
    objResponse.success = true
    objResponse.message = `Mensagem enviada`
  } else {
    objResponse.message = `Mensagem não enviada`
  }

  console.info(`${objResponse.message}: para ${to} mensagem ${msg} resposta ${JSON.stringify(response.data)}`)

  return objResponse
}
