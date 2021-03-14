import transformData from './transformData'

describe('transformData', () => {
  test('responds with chatApi object data if provider is "chatapi"', () => {
    const data = {
      provider: 'chatapi',
      token: 'token-chatapi',
      url: 'https://chat-api.com/'
    }

    expect(transformData(data, '5548902148723', 'send message from chatapi')).toEqual({
      url: 'https://chat-api.com/sendMessage?token=token-chatapi',
      body: {
        chatId: '5548902148723@c.us',
        body: 'send message from chatapi'
      }
    })
  })

  test('responds with winzap object data if provider is "winzap"', () => {
    const data = {
      provider: 'winzap',
      token: 'token-winzap'
    }

    expect(transformData(data, '5548902148723', 'send message from winzap')).toEqual({
      url: 'https://api.winzap.com.br/send/',
      body: {
        token: 'token-winzap',
        cmd: 'chat',
        id: 'B13Q796MGP',
        to: '5548902148723@c.us',
        msg: 'send message from winzap'
      }
    })
  })

  test('logs error if provider is unknown', () => {
    const consoleSpy = jest.spyOn(global.console, 'error').mockImplementation()

    transformData({}, '5548902148723', 'send message')
    expect(consoleSpy).toHaveBeenCalled()
  })
})