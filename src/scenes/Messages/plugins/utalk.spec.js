import transformData from './utalk'

describe('transformData utalk', () => {
  test('returns the object containing data for request', () => {
    const data = {
      token: 'token-utalk'
    }

    expect(transformData(data, '5548964937540', 'Mensagem para enviar')).toEqual({
      url: 'https://v1.utalk.chat/send/token-utalk/',
      body: {
        cmd: 'chat',
        id: 'B13Q796MGP',
        to: '5548964937540@c.us',
        msg: 'Mensagem para enviar'
      }
    })
  })
})