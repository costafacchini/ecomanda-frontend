import chatApiTransformData from '../plugins/chatApi'
import winzapTransformData from '../plugins/winzap'

export default function transformData(data, to, msg) {
  let dataTransformed

  switch (data.provider) {
    case 'chatapi':
      dataTransformed = chatApiTransformData(data, to, msg)
      break
    case 'winzap':
      dataTransformed = winzapTransformData(data, to, msg)
      break
    default:
      console.error(`Plugin de transformação de dados não conhecido: ${data.provider}`)
  }

  return dataTransformed
}