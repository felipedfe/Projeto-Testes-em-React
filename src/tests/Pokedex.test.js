import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const { screen } = require('@testing-library/react');

const POKEMON_NAME_ID = 'pokemon-name';

test('Se a página contém um heading h2 com o texto Encountered pokémons.', () => {
  renderWithRouter(<App />);
  const pokedexTitle = screen.getByRole('heading',
    { level: 2, name: /Encountered pokémons/i });
  expect(pokedexTitle).toBeInTheDocument();
});
test('Se é exibido o próximo Pokémon quando o botão `Próximo pokémon` é clicado.', () => {
  renderWithRouter(<App />);
  const nextButton = screen.getByRole('button', { name: /Próximo pokémon/i });
  userEvent.click(nextButton);
  const nextPokemon = screen.getByTestId(POKEMON_NAME_ID);
  expect(nextPokemon).toHaveTextContent(/Charmander/i);
});
test('Se é mostrado apenas um Pokémon por vez.', () => {
  renderWithRouter(<App />);
  const fireButton = screen.getByRole('button', { name: /Fire/i });
  userEvent.click(fireButton);
  const pokemonOnScreen = screen.getAllByTestId(POKEMON_NAME_ID);
  expect(pokemonOnScreen[0]).toHaveTextContent(/Charmander/i);
  expect(pokemonOnScreen).toHaveLength(1);

  const nextButton = screen.getByRole('button', { name: /Próximo pokémon/i });
  userEvent.click(nextButton);

  const pokemonOnScreen2 = screen.getAllByTestId(POKEMON_NAME_ID);
  expect(pokemonOnScreen2[0]).toHaveTextContent(/Rapidash/i);
  expect(pokemonOnScreen2).toHaveLength(1);

  userEvent.click(nextButton);
  const pokemonOnScreen3 = screen.getAllByTestId(POKEMON_NAME_ID);
  expect(pokemonOnScreen3[0]).toHaveTextContent(/Charmander/i);
});
test('Se a Pokédex tem os botões de filtro.', () => {
  renderWithRouter(<App />);
  const allButton = screen.getByRole('button', { name: /All/i }); // pegando o botão All
  expect(allButton).toBeInTheDocument();

  const electricButton = screen.getAllByRole('button', { name: /Electric/i });
  expect(electricButton).toHaveLength(1);
  expect(electricButton[0]).toBeInTheDocument();

  const fireButton = screen.getAllByRole('button', { name: /Fire/i });
  expect(fireButton).toHaveLength(1);
  expect(fireButton[0]).toBeInTheDocument();

  const bugButton = screen.getAllByRole('button', { name: /Bug/i });
  expect(bugButton).toHaveLength(1);
  expect(bugButton[0]).toBeInTheDocument();

  const poisonButton = screen.getAllByRole('button', { name: /Poison/i });
  expect(poisonButton).toHaveLength(1);
  expect(poisonButton[0]).toBeInTheDocument();

  const psychicButton = screen.getAllByRole('button', { name: /Psychic/i });
  expect(psychicButton).toHaveLength(1);
  expect(psychicButton[0]).toBeInTheDocument();

  const normalButton = screen.getAllByRole('button', { name: /Normal/i });
  expect(normalButton).toHaveLength(1);
  expect(normalButton[0]).toBeInTheDocument();

  const dragonButton = screen.getAllByRole('button', { name: /Dragon/i });
  expect(dragonButton).toHaveLength(1);
  expect(dragonButton[0]).toBeInTheDocument();

  const MAX_NUMBER_OF_FILTERS = 7;
  const allFilterButtons = screen.getAllByTestId('pokemon-type-button'); // lista com todos os botões de filtro
  expect(allFilterButtons).toHaveLength(MAX_NUMBER_OF_FILTERS);

  // clicando em um filtro
  expect(psychicButton[0]).toHaveTextContent(/Psychic/i);
  userEvent.click(psychicButton[0]);
  const firstPsychic = screen.getByTestId('pokemon-type');
  expect(firstPsychic).toHaveTextContent(/Psychic/i);
  const nextButton = screen.getByRole('button', { name: /Próximo pokémon/i });
  // clicando em `próximo pokémon` dentro do filtro
  userEvent.click(nextButton);
  const secondPsychic = screen.getByTestId('pokemon-type');
  expect(secondPsychic).toHaveTextContent(/Psychic/i);
  expect(allButton).toBeInTheDocument();
});
test('Se a Pokédex contém um botão para resetar o filtro.', () => {
  renderWithRouter(<App />);
  const allButton = screen.getByRole('button', { name: /All/i });
  expect(allButton).toBeInTheDocument();
  expect(allButton).toHaveTextContent(/All/i);

  userEvent.click(allButton);
  const pokemonOnScreenType1 = screen.getByTestId('pokemon-type');
  expect(pokemonOnScreenType1).toHaveTextContent('Electric');
  const nextButton = screen.getByRole('button', { name: /Próximo pokémon/i });
  userEvent.click(nextButton);
  const pokemonOnScreenType2 = screen.getByTestId('pokemon-type');
  expect(pokemonOnScreenType2).toHaveTextContent('Fire');
});
