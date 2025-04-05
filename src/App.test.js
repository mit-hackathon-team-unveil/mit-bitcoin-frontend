import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Mock the contexts to prevent errors
jest.mock('./context/WalletContext', () => ({
  WalletProvider: ({ children }) => <div data-testid="wallet-provider">{children}</div>,
  useWallet: () => ({
    isConnected: false,
    walletAddress: "",
    isConnecting: false,
    connectWallet: jest.fn(),
    disconnectWallet: jest.fn(),
  }),
}));

jest.mock('./context/ArticleContext', () => ({
  ArticleProvider: ({ children }) => <div data-testid="article-provider">{children}</div>,
  useArticles: () => ({
    articles: [],
    categories: [],
  }),
}));

jest.mock('./context/UserContext', () => ({
  UserProvider: ({ children }) => <div data-testid="user-provider">{children}</div>,
  useUser: () => ({
    isAdmin: false,
  }),
}));

test('renders the app with navbar', () => {
  render(<App />);
  const websiteTitle = screen.getByText(/Web3News/i);
  expect(websiteTitle).toBeInTheDocument();
});
