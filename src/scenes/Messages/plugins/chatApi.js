export default function transformData(data, to, msg) {
  return {
    url: `${data.url}sendMessage?token=${data.token}`,
    body: {
      chatId: to + '@c.us',
      body: msg
    }
  }
}