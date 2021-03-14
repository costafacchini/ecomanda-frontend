import fetchMock from 'fetch-mock'
import sendMessage from './sendMessage'

describe('sendMessage', () => {
  beforeEach(() => {
    fetchMock.reset()
    expect(fetchMock.done()).toBe(true)
  })

  describe('winzap', () => {
    test('returns the resolved promise if success', async () => {
      const decriptedData = 'VTJGc2RHVmtYMS9seFU3K2FMbDZVb2hHME00bHpyckZFNjRyV3NRYzY3dUd6TG5PQmxlc3plVFY3RmFJT1RrT29NZXRYWVh4TjNkektWSWN0Wk00OGVQeUwyTUsxODZrTHdySlIrMWJLNVU9'
      fetchMock.postOnce('https://api.winzap.com.br/send/', {
        status: 200,
        body: {
          type: 'send message',
          cmd: 'chat',
          to: '554899290820@c.us',
          token: 'gAT7X7sP34niWmUPsE7eL3GNUyfEpONEdZLM',
          servidor: 'ovh01'
        },
      })

      const consoleSpy = jest.spyOn(global.console, 'info').mockImplementation()

      expect(await sendMessage(decriptedData, '5548983456730', 'message to send')).toEqual({ success: true, message: 'Mensagem enviada' })
      expect(consoleSpy).toHaveBeenCalledWith('Mensagem enviada: para 5548983456730 mensagem message to send resposta {"type":"send message","cmd":"chat","to":"554899290820@c.us","token":"gAT7X7sP34niWmUPsE7eL3GNUyfEpONEdZLM","servidor":"ovh01"}')
    })

    test('returns the resolved promise if success but with error', async () => {
      const decriptedData = 'VTJGc2RHVmtYMS9seFU3K2FMbDZVb2hHME00bHpyckZFNjRyV3NRYzY3dUd6TG5PQmxlc3plVFY3RmFJT1RrT29NZXRYWVh4TjNkektWSWN0Wk00OGVQeUwyTUsxODZrTHdySlIrMWJLNVU9'
      fetchMock.postOnce('https://api.winzap.com.br/send/', {
        status: 200,
        body: {
          type: 'send message',
          token: 'werwerwer',
          status: 'whatsapp offline'
        },
      })

      const consoleSpy = jest.spyOn(global.console, 'info').mockImplementation()

      expect(await sendMessage(decriptedData, '5548983456730', 'message to send')).toEqual({ success: false, message: 'Mensagem não enviada' })
      expect(consoleSpy).toHaveBeenCalledWith('Mensagem não enviada: para 5548983456730 mensagem message to send resposta {"type":"send message","token":"werwerwer","status":"whatsapp offline"}')
    })
  })

  describe('chatapi', () => {
    const decriptedData = 'VTJGc2RHVmtYMStQNDFnYzNSUHlTdnhOdmE5TXV4Q01sZko1YkNacmhTZ0oySnlxU0c4eTl5akt1WmkrQ1IyQ0o4amJNN3RNS2RDbmJxSXF3cEltQWFkQjBPWFU1YkxoVFg0TGxTbC9za001Z092VWMvd1oveXk2ekdaMXRkaUxpR040U3RYTW9Ka0FsY2wzT285MjlsTFBDNXF6d3JrL3ZyRDY5RGs5d0t4OHpReGRNa3FQOU5iOC9jUmlWTHdk'
    test('returns the resolved promise if success', async () => {
      fetchMock.postOnce('https://api.chat-api.com/instance238801/sendMessage?token=kh4udpensW9432LldsihTbsEW12457', {
        status: 200,
        body: {
          sent: true,
          message: 'Sent to 5548999290820@c.us',
          id: 'true_554899290820@c.us_3EB0957AD66BAFF57D1D',
          queueNumber: 2223
        },
      })

      const consoleSpy = jest.spyOn(global.console, 'info').mockImplementation()

      expect(await sendMessage(decriptedData, '5548983456730', 'message to send')).toEqual({ success: true, message: 'Mensagem enviada' })
      expect(consoleSpy).toHaveBeenCalledWith('Mensagem enviada: para 5548983456730 mensagem message to send resposta {"sent":true,"message":"Sent to 5548999290820@c.us","id":"true_554899290820@c.us_3EB0957AD66BAFF57D1D","queueNumber":2223}')
    })

    test('returns the resolved promise if error', async () => {
      const decriptedData = 'VTJGc2RHVmtYMStQNDFnYzNSUHlTdnhOdmE5TXV4Q01sZko1YkNacmhTZ0oySnlxU0c4eTl5akt1WmkrQ1IyQ0o4amJNN3RNS2RDbmJxSXF3cEltQWFkQjBPWFU1YkxoVFg0TGxTbC9za001Z092VWMvd1oveXk2ekdaMXRkaUxpR040U3RYTW9Ka0FsY2wzT285MjlsTFBDNXF6d3JrL3ZyRDY5RGs5d0t4OHpReGRNa3FQOU5iOC9jUmlWTHdk'
      fetchMock.postOnce('https://api.chat-api.com/instance238801/sendMessage?token=kh4udpensW9432LldsihTbsEW12457', {
        status: 401,
        body: {
          error: 'Wrong token. Please provide token as a GET parameter.'
        },
      })

      const consoleSpy = jest.spyOn(global.console, 'info').mockImplementation()

      expect(await sendMessage(decriptedData, '5548983456730', 'message to send')).toEqual({ success: false, message: 'Mensagem não enviada' })
      expect(consoleSpy).toHaveBeenCalledWith('Mensagem não enviada: para 5548983456730 mensagem message to send resposta {"error":"Wrong token. Please provide token as a GET parameter."}')
    })

    test('returns the resolved promise if agended', async () => {
      const decriptedData = 'VTJGc2RHVmtYMStQNDFnYzNSUHlTdnhOdmE5TXV4Q01sZko1YkNacmhTZ0oySnlxU0c4eTl5akt1WmkrQ1IyQ0o4amJNN3RNS2RDbmJxSXF3cEltQWFkQjBPWFU1YkxoVFg0TGxTbC9za001Z092VWMvd1oveXk2ekdaMXRkaUxpR040U3RYTW9Ka0FsY2wzT285MjlsTFBDNXF6d3JrL3ZyRDY5RGs5d0t4OHpReGRNa3FQOU5iOC9jUmlWTHdk'
      fetchMock.postOnce('https://api.chat-api.com/instance238801/sendMessage?token=kh4udpensW9432LldsihTbsEW12457', {
        status: 200,
        body: {
          sent: true,
          message: 'Status of the account not equals authenticated. Message to  5548999290820@c.us will be sent after successful auth.',
          id: 'true_5548999290820@c.us_3EB02F520C5C4B96F791',
          queueNumber: 11
        },
      })

      const consoleSpy = jest.spyOn(global.console, 'info').mockImplementation()

      expect(await sendMessage(decriptedData, '5548983456730', 'message to send')).toEqual({ success: false, message: 'Mensagem não enviada' })
      expect(consoleSpy).toHaveBeenCalledWith('Mensagem não enviada: para 5548983456730 mensagem message to send resposta {"sent":true,"message":"Status of the account not equals authenticated. Message to  5548999290820@c.us will be sent after successful auth.","id":"true_5548999290820@c.us_3EB02F520C5C4B96F791","queueNumber":11}')
    })
  })
})