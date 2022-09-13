import { shallowMount, mount } from "@vue/test-utils"
import PokemonPage from '@/pages/PokemonPage'
import { pokemons } from "../mocks/pokemons.mock";

describe('PokemonPage Component', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount(PokemonPage);
    })

    test('Debe hacer match con el snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot();
    })

    test('Debe de llamar el mixPokemonArr al montar', () => {
        const mixPokemonArrSpy = jest.spyOn(PokemonPage.methods, 'mixPokemonArray');
        const wrapper = shallowMount(PokemonPage);
        expect(mixPokemonArrSpy).toHaveBeenCalled();
    })

    test('Debe de hacer match con el snapshot cuando cargan los pokemons', () => {
        const wrapper = shallowMount(PokemonPage, {
            data() {
                return {
                    pokemonArr: pokemons,
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    showOptions: true,
                    message: "",
                }
            }
        });
        expect(wrapper.html()).toMatchSnapshot();
    })

    test('Debe de mostrar los componentes de PokemonPicture y PokemonOptions', () => {
        const wrapper = shallowMount(PokemonPage, {
            data() {
                return {
                    pokemonArr: pokemons,
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    showOptions: true,
                    message: "",
                }
            }
        });
        const pokemonPicture = wrapper.find('pokemon-picture-stub');
        const pokemonOptions = wrapper.find('pokemon-options-stub');
        expect(pokemonPicture.exists()).toBeTruthy();
        expect(pokemonOptions.exists()).toBeTruthy();
        expect(pokemonPicture.attributes('pokemonid')).toBe('1');
        expect(pokemonOptions.attributes('pokemons')).toBeTruthy();
    })

    test('Pruebas con checkAnswer', async () => {
        const wrapper = shallowMount(PokemonPage, {
            data() {
                return {
                    pokemonArr: pokemons,
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    showOptions: true,
                    message: "",
                }
            }
        });
        await wrapper.vm.checkAnswer(1);
        expect(wrapper.find('h2').exists()).toBeTruthy();
        expect(wrapper.vm.showPokemon).toBeTruthy();
        expect(wrapper.find('h2').text()).toBe(`Adivinaste!!! Es ${pokemons[0].name}`);
        await wrapper.vm.checkAnswer(12);
        expect(wrapper.vm.message).toBe(`Fallaste!!! Es ${pokemons[0].name}`);
    })
})