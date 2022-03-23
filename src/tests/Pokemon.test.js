import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const { screen } = require('@testing-library/react');

const DETAILS_PAGE = '/pokemons/25';

test('Testa se é renderizado um card com as informações de determinado pokémon.', () => {
  renderWithRouter(<App />);
  const pokemonName = screen.getByTestId('pokemon-name');
  expect(pokemonName).toHaveTextContent(/Pikachu/i);
  expect(pokemonName).toBeInTheDocument();

  const pokemonType = screen.getByTestId('pokemon-type');
  expect(pokemonType).toHaveTextContent(/Electric/i);
  expect(pokemonType).toBeInTheDocument();

  const pokemonWeight = screen.getByTestId('pokemon-weight');
  expect(pokemonWeight).toHaveTextContent(/Average weight: 6.0 kg/i);
  expect(pokemonWeight).toBeInTheDocument();

  const pokemonImage = screen.getByAltText('Pikachu sprite');
  expect(pokemonImage).toBeInTheDocument();
  expect(pokemonImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');

  const moreDetails = screen.getByRole('link', { name: /More details/i });
  expect(moreDetails).toBeInTheDocument();
});
test('Se o card indicado na Pokédex contém um link para exibir detalhes.', () => {
  renderWithRouter(<App />);

  const moreDetails = screen.getByRole('link', { name: /More details/i });
  expect(moreDetails).toBeInTheDocument();
  expect(moreDetails).toHaveAttribute('href', DETAILS_PAGE);
});
test('Se ao clicar no link, é feito o redirecionamento para a página de detalhes', () => {
  const { customHistory } = renderWithRouter(<App />);

  const moreDetails = screen.getByRole('link', { name: /More details/i });
  expect(moreDetails).toBeInTheDocument();
  userEvent.click(moreDetails);
  const detailsTitle = screen.getByRole('heading', { name: /Pikachu Details/i });
  expect(detailsTitle).toBeInTheDocument();
  expect(customHistory.location.pathname).toBe(DETAILS_PAGE);
});
test('Se existe um ícone de estrela nos Pokémons favoritados.', () => {
  const { customHistory } = renderWithRouter(<App />);
  customHistory.push(DETAILS_PAGE);
  const favoriteCheckbox = screen.getByRole('checkbox');
  userEvent.click(favoriteCheckbox);
  customHistory.push('/');
  console.log(customHistory.location.pathname);
  const favoriteIcon = screen.getByAltText('Pikachu is marked as favorite');
  expect(favoriteIcon).toBeInTheDocument();
  expect(favoriteIcon).toHaveAttribute('src', '/star-icon.svg');
});
