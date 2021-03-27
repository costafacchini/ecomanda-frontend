export default function transformData(data, to, msg) {
  return {
    url: `https://v1.utalk.chat/send/${data.token}/`,
    body: {
      cmd: 'chat',
      id: 'B13Q796MGP',
      to: to + '@c.us',
      msg: msg
    }
  }
}