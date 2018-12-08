import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    quotes: [],
    editing: null
  }

  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
    this.finishEditing = this.finishEditing.bind(this)
  }

  async gql(query) {
    const res = await fetch('http://localhost:3001/graphql', {
      method: 'POST',
      mode: 'cors',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({ query })
    })
    if (res.ok) {
      const body = await res.json()
      return body.data
    } else {
      throw new Error(`${res.status}`)
    }
  }

  async update() {
    const quotes = await this.gql(`
    {
      quotes {
        id
        quote
      }
    }
    `)

    this.setState({ quotes: quotes.quotes })
  }

  async handleSubmit(event) {
    event.preventDefault()

    this.setState({ newquote: '' })

    await this.gql(`
    mutation {
      createQuote(input: {quote: "${this.state.newquote}"}) {
        id
      }
    }
    `)

    await this.update()
  }

  async deleteQuote(id) {
    await this.gql(`
    mutation {
      deleteQuote(input: {id: "${id}"}) {
        id
      }
    }
    `)

    await this.update()
  }

  async finishEditing(event) {
    event.preventDefault()
    const { id, quote } = this.state.editing

    await this.gql(`
    mutation {
      updateQuote(input: {id: "${id}", quote: "${quote}"}) {
        id
      }
    }
    `)

    this.setState({
      editing: null
    })

    await this.update()
  }

  componentDidMount() {
    this.update()
  }

  render() {
    return (
      <div>
        <h1>Quotes:</h1>
        <div>
          {this.state.quotes.map((quote, i) =>
            <div key={i}>
              {quote.quote}
              -
              <button onClick={() => this.deleteQuote(quote.id)}>delete</button>
              <button onClick={() => this.setState({ editing: quote })}>edit</button>
            </div>
          )}
        </div>
        <form onSubmit={this.handleSubmit}>
          <input value={this.state.newquote} onChange={(ev) => this.setState({ newquote: ev.target.value })} required />
          <input type='submit' value='Create' />
        </form>
        {this.state.editing && <div>
          <h1>Edit:</h1>
          <form onSubmit={this.finishEditing}>
            <input value={this.state.editing.quote} onChange={(ev) =>
              this.setState({
                editing: {
                  ...this.state.editing,
                  quote: ev.target.value
                }
              })} />
            <input type='submit' value='Update' />
          </form>
        </div>}
      </div>
    );
  }
}

export default App;
