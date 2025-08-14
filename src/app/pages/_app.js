import '@/styles/globals.css';
import GTM from '@/components/GTM';

export default function App({ Component, pageProps }) {
  return (
    <>
      {/* GTM Script */}
      <GTM gtmId="GTM-WXPWNV38" />
      
      {/* Your Page */}
      <Component {...pageProps} />
    </>
  );
}
