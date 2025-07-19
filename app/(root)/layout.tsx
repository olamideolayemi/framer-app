import '@/styles/globals.css';
import { AuthProvider } from '@/lib/authContext';
import { Toaster } from 'sonner';
import Header from '@/app/pages/Header';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <main
        className={`antialiased font-century`}
      >
        <Header />
        <AuthProvider>
          {children}
          <Toaster
            richColors
            position='top-center'
          />
        </AuthProvider>
      </main>
  );
}
