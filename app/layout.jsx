import './globals.css';

export const metadata = {
  title: 'Bookio Ride Evidence',
  description: 'Track your rides with ease',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div id="root">
          {children}
        </div>
      </body>
    </html>
  );
}
