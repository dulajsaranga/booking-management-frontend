"use client";

import "./globals.css";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import AppLayout from "./components/AppLayout";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <AppLayout>
            {children}
          </AppLayout>
        </AntdRegistry>
      </body>
    </html>
  );
}
