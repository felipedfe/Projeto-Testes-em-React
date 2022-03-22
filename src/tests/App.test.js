import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

const { screen } = require('@testing-library/react');

describe('Testando o componente <App.js />', () => {
  test('Topo da aplicação deve conter um conjunto fixo de links de navegação.', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toBeInTheDocument();

    const aboutLink = screen.getByRole('link', { name: 'About' });
    expect(aboutLink).toBeInTheDocument();

    const favoritesLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(favoritesLink).toBeInTheDocument();

    // const numberOfLinks = screen.getAllByRole('link');
    // expect(numberOfLinks).toHaveLength(3);
  });

  test('Se ao clicar em `Home` a aplicação vai para a página inicial', () => {
    const { customHistory } = renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: 'Home' });
    userEvent.click(homeLink);
    expect(customHistory.location.pathname).toBe('/');
  });
  test('Se ao clicar em `About` a aplicação vai para a página de informações', () => {
    const { customHistory } = renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: 'About' });
    userEvent.click(aboutLink);
    expect(customHistory.location.pathname).toBe('/about');
  });
  test('Se ao clicar em `Favorite Pokémons` o app vai para a página de favoritos', () => {
    const { customHistory } = renderWithRouter(<App />);

    const favoritesLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(favoritesLink);
    expect(customHistory.location.pathname).toBe('/favorites');
  });
  test('Se a aplicação segue para a página NotFound em caso de URL inválida', () => {
    const { customHistory } = renderWithRouter(<App />);

    customHistory.push('/caminho-aleatorio');
    const titleNotFound = screen.getByRole('heading',
      { level: 2, name: /Page requested not found/i });
    expect(titleNotFound).toBeInTheDocument();
  });
});
