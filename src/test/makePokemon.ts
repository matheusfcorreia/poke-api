export function makePokemon() {
  return {
    orderedAbilities: ['imposter', 'kill', 'limber'],
    pokemon: {
      abilities: [
        {
          ability: {
            name: 'limber',
            url: 'https://pokeapi.co/api/v2/ability/7/',
          },
          is_hidden: false,
          slot: 1,
        },
        {
          ability: {
            name: 'imposter',
            url: 'https://pokeapi.co/api/v2/ability/150/',
          },
          is_hidden: true,
          slot: 3,
        },
        {
          ability: {
            name: 'kill',
            url: 'https://pokeapi.co/api/v2/ability/8/',
          },
          is_hidden: false,
          slot: 1,
        },
      ],
    },
  }
}
