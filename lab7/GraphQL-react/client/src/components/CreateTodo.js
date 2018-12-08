import React from 'react'
import { Link } from 'react-router-dom'
import ApiService from '../ApiService'
import get from 'lodash/get'

export default class CreateTodo extends React.Component {
  state = {
    users: [],
    title: '',
    user: null,
  }

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  async componentDidMount() {
    const users = await ApiService.getUserNames()

    this.setState({
      users,
      user: get(users, '[0].id')
    })
  }

  async handleSubmit(event) {
    event.preventDefault()
    const { user, title } = this.state
    if (title.trim() === '' || user == null)
      return;
    const res = await ApiService.createTodo({
      user: parseInt(user),
      title
    })
    this.props.history.push('/')
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  render() {
    return (
      <div>
        <Link to='/'><button>Go back</button></Link>
        <form className='user__form' onSubmit={this.handleSubmit}>
          <label>
            Description
            <input name='title' value={this.state.title} required onChange={this.handleChange} />
          </label>
          <label>
            User
            <select name='user' value={this.state.user} onChange={this.handleChange}>
              {this.state.users.map(({first_name, last_name, id}, i) =>
                <option key={i} value={id}>{first_name} {last_name}</option>
              )}
            </select>
          </label>
          <input type='submit' value='Create' />
        </form>
      </div>
    )
  }
}
