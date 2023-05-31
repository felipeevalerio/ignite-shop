import type { AppProps } from 'next/app'
import { globalStyles } from '../styles/global'
import logoImg from '../assets/logo.svg';
import { Container, Header } from '../styles/pages/app';
import Image from 'next/image';
import { QueryClientProvider } from 'react-query';
import { queryClient } from '../lib/query';
import { ShoppingCart } from '../components/ShoppingCart';
import { ShoppingCartProvider } from '../context/ShoppingCartContext';
import { CartInfo } from '../components/CartInfo';
import Link from 'next/link';

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Container>
        <ShoppingCartProvider>
        <Header>
          <Link href="/" prefetch={false}>
            <Image src={logoImg.src} alt="" width={200} height={200}/>
          </Link>
          <ShoppingCart/>
        </Header>
          <Component {...pageProps} />
          <CartInfo/>
        </ShoppingCartProvider>
      </Container>
    </QueryClientProvider>
  )
}
