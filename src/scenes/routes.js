import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import Messages from './Messages'

export default function Routes() {
  return (
    <HashRouter>
      <Switch>
        <Route path='/:token'>
          <Messages />
        </Route>
        <Route>
          <h3>Você precisa de um token para poder acessar o aplicativo</h3>
        </Route>
      </Switch>
    </HashRouter>
  )
}