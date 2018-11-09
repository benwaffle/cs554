import React from 'react'
import './App.css'
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
import List from './List'
import Item from './Item'

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/pokemon/page/0">Pokemon</Link></li>
              <li><Link to="/berries/page/0">Berries</Link></li>
              <li><Link to="/machines/page/0">Machines</Link></li>
            </ul>
          </nav>
          <Switch>
            <Route path="/" exact component={() => <> 
              <p>The purpose of this site is to display information about pokemon, berries, and machines.</p>
              <p>Pokemon - fictional creatures which humans catch and train to battle each other for sport</p>
              <p>Berries - berries are held by pokemon during battle to reduce attack damage, or increase health</p>
              <p>Machines - machines are items that teach moves to pokemon</p>
            </>} />
            <Route path="/:type/page/:page" component={List} />
            <Route path="/:type/:id" component={Item} />
            <Route path="/404" render={() => <h1>404 not found</h1>} />
          </Switch>
        </>
      </BrowserRouter>
    )
  }
}