import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Klaim Kuota Gratis Telkoms*l Tahun Baru (SIMULASI PHISHING)',
  description: 'Situs demo edukasi anti-phishing yang menyerupai penawaran kuota gratis.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
