import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import sendMessage from './services/sendMessage'
import './styles.css'

export default function Messages() {
  const [number, setNumber] = useState('')
  const [message, setMessage] = useState('')
  const [response, setResponse] = useState('')

  let { token } = useParams()

  function handleChangeNumber(e) {
    setNumber(e.target.value.replace(/[^0-9]/g, ''))
  }

  async function handleClick() {
    const response = await sendMessage(token, number, message)
    setNumber('')
    setMessage('')
    setResponse(response.message)
  }

  return (
    <>
      <fieldset>
        <div className='centralizada'>
          <label htmlFor="to">Destinatário:</label>
          <input id="to" name="to" type="text" value={number} onChange={handleChangeNumber} />
        </div>
        <div className='centralizada'>
          <label htmlFor="msg">Mensagem:</label>
          <textarea id="msg" name="msg" rows='5' cols='33' value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
        </div>
      </fieldset>
      <section>
        <fieldset disabled={!number && !message}>
          <button onClick={handleClick}>Enviar</button>
        </fieldset>
      </section>
      {response && (
        <section>
          <h3>{JSON.stringify(response)}</h3>
        </section>
      )}
    </>
  )
}