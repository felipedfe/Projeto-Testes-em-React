import React from 'react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

const { screen } = require('@testing-library/react');

test('Testa se a página contém as informações sobre a Pokédex.', () => {
  renderWithRouter(<About />);
  const firstPTag = screen.getByText(
    /This application simulates a Pokédex, a digital encyclopedia containing all/i,
  );
  const secondPTag = screen.getByText(
    /One can filter Pokémons by type, and see more details for each one of them/i,
  );
  expect(firstPTag).toBeInTheDocument();
  expect(secondPTag).toBeInTheDocument();
  console.log(firstPTag);
});
test('Testa se a página contém um heading h2 com o texto About Pokédex.', () => {
  renderWithRouter(<About />);
  const pokedexHeading = screen.getByRole('heading', { level: 2, name: 'About Pokédex' });
  expect(pokedexHeading).toBeInTheDocument();
});
test('Testa se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
  renderWithRouter(<About />);
  const allPTags = screen.getAllByText(/Pokémons/i);
  expect(allPTags).toHaveLength(2);
});
test('Testa se a página contém a imagem de uma Pokédex', () => {
  renderWithRouter(<About />);
  const pokedexImage = screen.getByAltText('Pokédex');
  expect(pokedexImage).toBeInTheDocument();
  expect(pokedexImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
