"use client"
import '@mantine/core/styles.css';
import { ColorSchemeScript } from '@mantine/core';
import { Provider } from './dashboard/Provider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript
          defaultColorScheme="dark"
        />
      </head>
      <body>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
