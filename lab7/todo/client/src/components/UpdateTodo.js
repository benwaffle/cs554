import React from 'react'
import { Link } from 'react-router-dom';
import ApiService from '../ApiService';

export default class UpdateTodo extends React.Component {
  state = {
    todo: null,
    users: []
  }

  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async componentDidMount() {
    const id = this.props.match.params.id

    const todo = (await ApiService.getTodos({ id }))[0]
    const users = await ApiService.getUserNames()
    this.setState({ todo, users })
  }

  async handleSubmit(event) {
    event.preventDefault()
    const { user, title, completed } = this.state.todo
    if (title.trim() === '' || user === '')
      return;
    await ApiService.updateTodo({
      id: this.props.match.params.id,
      user: parseInt(user.id),
      title,
      completed
    })
    this.props.history.push(`/todos/${user.id}`)
  }

  handleChange(event) {
    const t = event.target
    if (t.name === 'user')
      this.setState({
        todo: {
          ...this.state.todo,
          user: {
            id: t.value
          }
        }
      })
    else
      this.setState({
        todo: {
          ...this.state.todo,
          [t.name]: t.name === 'completed' ? t.checked : t.value
        }
      })
  }

  render() {
    return <div>
      <button onClick={() => this.props.history.goBack()}>&larr; Back</button>
      {this.state.todo == null ? <h1>loading...</h1> : <div>
        <form className='user__form' onSubmit={this.handleSubmit}>
          <label>
            Description
            <input name='title' value={this.state.todo.title} required onChange={this.handleChange} />
          </label>
          <label>
            User
            <select name='user' value={this.state.todo.user.id} onChange={this.handleChange}>
              {this.state.users.map(({first_name, last_name, id}, i) =>
                <option key={i} value={id}>{first_name} {last_name}</option>
              )}
            </select>
          </label>
          <label>
            Done
            <input name='completed' type='checkbox' checked={this.state.todo.completed} onChange={this.handleChange} />
          </label>
          <input type='submit' value='Update' />
        </form>
      </div>}
    </div>
  }
}