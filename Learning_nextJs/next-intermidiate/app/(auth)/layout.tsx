import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <h1>header</h1>
        {children}
        <h1>Footer</h1>
      </body>
    </html>
  );
}