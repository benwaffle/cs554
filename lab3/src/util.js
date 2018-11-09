export function typeToApi(s) {
  if (s === 'berries')
    return 'berry'
  else if (s === 'machines')
    return 'machine'
  else
    return s
}

export const url = `https://pokeapi.co/api/v2`
