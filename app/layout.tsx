import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Excel-JSON Converter',
  description: 'Convert between Excel and JSON formats with ease',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" 
        />
      </head>
      <body>
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          {children}
        </div>
      </body>
    </html>
  );
}