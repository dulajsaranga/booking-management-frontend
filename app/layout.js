"use client";

import "./globals.css";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import AppLayout from "./components/AppLayout";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <AntdRegistry>
            <AppLayout>
              {children}
            </AppLayout>
          </AntdRegistry>
        </QueryClientProvider>
      </body>
    </html>
  );
}
