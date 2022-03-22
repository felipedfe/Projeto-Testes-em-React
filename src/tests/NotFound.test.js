import React from 'react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

const { screen } = require('@testing-library/react');

test('Se a página contém um heading h2 com o texto `Page requested not found`', () => {
  renderWithRouter(<NotFound />);
  const titleNotFound = screen.getByRole('heading',
    { level: 2, name: /Page requested not found/i });
  expect(titleNotFound).toBeInTheDocument();
});
test('Teste se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
  renderWithRouter(<NotFound />);
  const pikachuCrying = screen.getByAltText(/Pikachu crying because/i);
  expect(pikachuCrying).toBeInTheDocument();
  expect(pikachuCrying).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
