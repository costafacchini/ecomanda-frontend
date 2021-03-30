import request from '../../../services/request'
const { REACT_APP_SEND_MESSAGE_URL } = process.env

function notOffline(response) {
  return !JSON.stringify(response.data).includes('offline')
}

function notAutenticated(response) {
  return !JSON.stringify(response.data).includes('not equals authenticated')
}

export default async function sendMessage(token, to, msg) {
  const objResponse = { success: false, message: '' }

  const body = {
    token: token,
    to: to,
    msg: msg
  }

  const response = await request(REACT_APP_SEND_MESSAGE_URL, body)

  if ((response.status === 200 || response.status === 201) && notOffline(response) && notAutenticated(response)) {
    objResponse.success = true
    objResponse.message = `Mensagem enviada`
  } else {
    objResponse.message = `Mensagem não enviada`
  }

  console.info(`${objResponse.message}: para ${to} mensagem ${msg} resposta ${JSON.stringify(response.data)}`)

  return objResponse
}
