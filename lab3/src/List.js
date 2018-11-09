import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { url, typeToApi } from './util';

export default class List extends Component {
  state = {
    data: []
  }

  type() {
    return typeToApi(this.props.match.params.type)
  }

  async getData() {
    try {
      const res = await fetch(`${url}/${this.type()}/`)
      const data = await res.json()

      this.setState({ data: data.results })
    } catch (err) {
      console.log(err)
      this.props.history.push('/404')
    }
  }

  async componentDidUpdate(prevProps) {
    if (this.props.match.params.type !== prevProps.match.params.type) {
      this.getData()
    }
  }

  async componentDidMount() {
    this.getData()
  }

  render() {
    const type = this.type()
    const page = parseInt(this.props.match.params.page)
    return (
      <>
        <h1>page {page} of {type}</h1>

        {page > 0
        && <Link to={`/${type}/page/${page-1}`}>Previous</Link>}
        <br/>
        {this.state.data.length / 10 - 1 > page &&
        <Link to={`/${type}/page/${page+1}`}>Next</Link>}

        <hr/>

        <li>
          {this.state.data.slice(page*10, (page+1)*10).map((item, i) => {
            if (!item.url.startsWith(url))
              throw new Error('invalid URL')

            const id = item.url.split('/').filter(u => u.length > 0).reverse()[0]
            return <h1 key={i}>
              <Link to={`/${type}/${id}`}>
                {type === 'machine' ? `machine ${id}` : item.name}
              </Link>
            </h1>
          })}
        </li>
      </>
    )
  }
}
