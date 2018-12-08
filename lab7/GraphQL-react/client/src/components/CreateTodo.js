import React from 'react'
import ApiService from '../ApiService'

export default class CreateTodo extends React.Component {
  state = {
    users: [],
    description: '',
    user: ''
  }

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  async componentDidMount() {
    const users = await ApiService.getUserNames()

    this.setState({ users })
  }

  async handleSubmit(event) {
    event.preventDefault()
    const { user, description } = this.state
    await ApiService.createTodo({
      user,
      description
    })
    this.props.history.push('/')
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  render() {
    return <form className='user__form' onSubmit={this.handleSubmit}>
      <label>
        Description
        <input name='description' value={this.state.description} required onChange={this.handleChange} />
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
  }
}
