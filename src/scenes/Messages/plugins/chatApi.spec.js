import transformData from './chatApi'

describe('transformData chatApi', () => {
  test('returns the object containing data for request', () => {
    const data = {
      token: 'token-chatapi',
      url: 'https://chat-api.com/'
    }

    expect(transformData(data, '5548974035392', 'Mensagem para enviar')).toEqual({
      url: 'https://chat-api.com/sendMessage?token=token-chatapi',
      body: {
        chatId: '5548974035392@c.us',
        body: 'Mensagem para enviar'
      }
    })
  })
})