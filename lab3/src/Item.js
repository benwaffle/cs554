import React from 'react'
import { typeToApi } from './util';

export default class Item extends React.Component {
  state = {
    data: undefined
  }

  constructor(props) {
    super(props)
    this.type = typeToApi(props.match.params.type)
  }

  async componentDidMount() {
    const { id } = this.props.match.params
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/${this.type}/${id}/`)
      const data = await res.json()
      this.setState({ data })
    } catch (err) {
      console.log(err)
      this.props.history.push('/404')
    }
  }

  render() {
    const { data } = this.state
    console.log(data)
    return data ? (
      <div>
        {this.type === 'pokemon' ?
          <>
            <h1>{data.name}</h1>
            <img src={data.sprites.front_default} alt={data.name} />
            <h2>Type:</h2>
            <ul>
              {data.types.map((t, i) => <li key={i}>{t.type.name}</li>)}
            </ul>
          </> :
         this.type === 'berry' ?
          <>
            <h1>{data.name}</h1>
            <h2>Size: {data.size}</h2>
            <h2>Flavors:</h2>
            <ul>
              {data.flavors
                .filter(f => f.potency > 0)
                .sort((a, b) => b.potency - a.potency)
                .map((f, i) => <li key={i}>{f.flavor.name} - potency {f.potency}</li>)}
            </ul>
          </> :
          <>
            <h1>Machine #{data.id}</h1>
            <h2>Item: {data.item.name}</h2>
            <h2>Move: {data.move.name}</h2>
            <h2>Version Group: {data.version_group.name}</h2>
          </>}
      </div>
    ) : <></>
  }
}