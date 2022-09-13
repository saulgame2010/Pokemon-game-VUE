import pokemonApi from '@/api/pokemonApi'

describe('PokemonApi', () => { 
    test('Axios debe estar configurado con API de pokemon', () => {
        expect(pokemonApi.defaults.baseURL).toBe('https://pokeapi.co/api/v2/pokemon');
    })
 });