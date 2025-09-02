import '../styles/globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '80vh' }}>
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  );
}