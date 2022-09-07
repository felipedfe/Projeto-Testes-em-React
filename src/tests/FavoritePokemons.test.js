import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

const { screen } = require('@testing-library/react');

test('`No favorite pokemon found` é mostrado se não houverem pokémons favoritos.', () => {
  renderWithRouter(<App />);

  const favoritesLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
  userEvent.click(favoritesLink);
  const noFavoritesMessage = screen.getByText(/No favorite pokemon found/i);
  expect(noFavoritesMessage).toBeInTheDocument();
});
test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
  renderWithRouter(<App />);

  const favoritesLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
  const moreDetails = screen.getByRole('link', { name: /More details/i });
  userEvent.click(moreDetails);
  const favoriteCheckbox = screen.getByRole('checkbox');
  userEvent.click(favoriteCheckbox);
  userEvent.click(favoritesLink);
  const favoritesList = screen.getAllByTestId('pokemon-name');
  expect(favoritesList).toHaveLength(1); // verificado se o 1o adicionado está na lista
});
