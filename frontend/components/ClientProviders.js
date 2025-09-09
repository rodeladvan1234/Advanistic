"use client";
import { ApolloProvider } from '@apollo/client/react';
import client from '../lib/apolloClient';
import { CartProvider } from '../context/CartContext';

export default function ClientProviders({ children }) {
  return (
    <ApolloProvider client={client}>
      <CartProvider>
        {children}
      </CartProvider>
    </ApolloProvider>
  );
}
