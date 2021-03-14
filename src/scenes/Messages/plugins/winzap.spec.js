import transformData from './winzap'

describe('transformData winzap', () => {
  test('returns the object containing data for request', () => {
    const data = {
      token: 'token-winzap'
    }

    expect(transformData(data, '5548964937540', 'Mensagem para enviar')).toEqual({
      url: 'https://api.winzap.com.br/send/',
      body: {
        token: 'token-winzap',
        cmd: 'chat',
        id: 'B13Q796MGP',
        to: '5548964937540@c.us',
        msg: 'Mensagem para enviar'
      }
    })
  })
})