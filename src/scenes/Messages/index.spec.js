import { render, screen, fireEvent } from '@testing-library/react'
import { Route, MemoryRouter } from 'react-router-dom'
import { act } from 'react-dom/test-utils'
import fetchMock from 'fetch-mock'
import Messages from './index'

describe('<Messages />', () => {
  function mount() {
    render(
      <MemoryRouter initialEntries={['/VTJGc2RHVmtYMS9seFU3K2FMbDZVb2hHME00bHpyckZFNjRyV3NRYzY3dUd6TG5PQmxlc3plVFY3RmFJT1RrT29NZXRYWVh4TjNkektWSWN0Wk00OGVQeUwyTUsxODZrTHdySlIrMWJLNVU9']}>
        <Route path='/:token'>
          <Messages />
        </Route>
      </MemoryRouter>
    )
  }

  test('renders the component', () => {
    mount()

    expect(screen.getByText(/Destinatário:/i)).toBeInTheDocument()
    expect(screen.getByText(/Mensagem:/i)).toBeInTheDocument()
    expect(screen.getByText(/Enviar/i)).toBeInTheDocument()
    expect(screen.getByText(/Enviar/i)).toBeDisabled()
  })

  describe('number', () => {
    test('accepts only number', () => {
      mount()

      const numberInput = screen.getByRole('textbox', { name: 'Destinatário:' })
      fireEvent.change(numberInput, { target: { value: '5548ab87CD98' } })
      expect(numberInput).toHaveValue('55488798')
    })
  })

  describe('button', () => {
    test('enables only to and message is filled', () => {
      mount()

      expect(screen.getByText(/Enviar/i)).toBeDisabled()

      const numberInput = screen.getByRole('textbox', { name: 'Destinatário:' })
      fireEvent.change(numberInput, { target: { value: '55488798' } })

      const messageInput = screen.getByRole('textbox', { name: 'Mensagem:' })
      fireEvent.change(messageInput, { target: { value: 'send message' } })

      expect(screen.getByText(/Enviar/i)).toBeEnabled()
    })

    describe('when clicks', () => {
      describe('when the response is with success', () => {
        test('shows the success message and reset screen', async () => {
          jest.spyOn(global.console, 'info').mockImplementation()

          await act(async () => {
            fetchMock.postOnce('https://api.winzap.com.br/send/', {
              status: 200,
              body: {
                type: 'send message',
                cmd: 'chat',
                to: '554899290820@c.us',
                token: 'gAT7X7sP34niWmUPsE7eL3GNUyfEpONEdZLM',
                servidor: 'ovh01'
              },
            }, { overwriteRoutes: true })

            mount()

            const numberInput = screen.getByRole('textbox', { name: 'Destinatário:' })
            fireEvent.change(numberInput, { target: { value: '55488798' } })

            const messageInput = screen.getByRole('textbox', { name: 'Mensagem:' })
            fireEvent.change(messageInput, { target: { value: 'send message' } })

            fireEvent.click(screen.getByRole('button', { name: 'Enviar' }))
          })

          expect(screen.getByText(/Mensagem enviada/i)).toBeInTheDocument()
          expect(screen.getByRole('textbox', { name: 'Destinatário:' })).toHaveValue('')
          expect(screen.getByRole('textbox', { name: 'Mensagem:' })).toHaveValue('')
        })
      })

      describe('when the response is with error', () => {
        test('shows the success message and reset screen', async () => {
          jest.spyOn(global.console, 'info').mockImplementation()

          await act(async () => {
            fetchMock.postOnce('https://api.winzap.com.br/send/', {
              status: 200,
              body: {
                type: 'send message',
                token: 'werwerwer',
                status: 'whatsapp offline'
              },
            }, { overwriteRoutes: true })

            mount()

            const numberInput = screen.getByRole('textbox', { name: 'Destinatário:' })
            fireEvent.change(numberInput, { target: { value: '55488798' } })

            const messageInput = screen.getByRole('textbox', { name: 'Mensagem:' })
            fireEvent.change(messageInput, { target: { value: 'send message' } })

            fireEvent.click(screen.getByRole('button', { name: 'Enviar' }))
          })

          expect(screen.getByText(/Mensagem não enviada/i)).toBeInTheDocument()
          expect(screen.getByRole('textbox', { name: 'Destinatário:' })).toHaveValue('')
          expect(screen.getByRole('textbox', { name: 'Mensagem:' })).toHaveValue('')
        })
      })
    })
  })
})