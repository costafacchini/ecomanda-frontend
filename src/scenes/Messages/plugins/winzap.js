export default function transformData(data, to, msg) {
  return {
    url: 'https://api.winzap.com.br/send/',
    body: {
      token: data.token,
      cmd: 'chat',
      id: 'B13Q796MGP',
      to: to + '@c.us',
      msg: msg
    }
  }
}