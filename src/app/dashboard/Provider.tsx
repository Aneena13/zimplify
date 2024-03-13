'use client'
import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";


const theme = {
  colorScheme: 'dark',
  primaryColor: 'teal',
}

export function Provider({ children }) {
  const [client] = useState(new QueryClient())
  return (
    <QueryClientProvider client={client}>
      <MantineProvider
        defaultColorScheme="dark"
          theme={theme}
      >
        {children}
      </MantineProvider>
    </QueryClientProvider>
  )
}
