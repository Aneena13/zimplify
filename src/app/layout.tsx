import '@mantine/core/styles.css';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { QueryClient } from '@tanstack/react-query';
import { Provider } from './dashboard/Provider';


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const queryClient = new QueryClient()

  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>
          <Provider>
            {children}
          </Provider>
        </MantineProvider>
      </body>
    </html>
  );
}
