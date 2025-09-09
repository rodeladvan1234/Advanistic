import '../styles/globals.css';
import dynamic from 'next/dynamic';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Client-only providers (wrap interactive parts)
const ClientProviders = dynamic(() => import('../components/ClientProviders'), { ssr: false });

export default function MyApp({ Component, pageProps }) {
  return (
    <ClientProviders>
      <Navbar />
      <main style={{ minHeight: '80vh' }}>
        <Component {...pageProps} />
      </main>
      <Footer />
    </ClientProviders>
  );
}