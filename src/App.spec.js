import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Você precisa de um token para poder acessar o aplicativo/i);
  expect(linkElement).toBeInTheDocument();
});
