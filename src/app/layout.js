import '../index.css';
import React from 'react';

export const metadata = {
  title: 'TicTacToe-Squared',
  description: 'A new way to play a popular game.',
}
 
export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div id="root">{children}</div>
      </body>
    </html>
  )
}