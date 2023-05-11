import type { AppProps } from 'next/app'
import { globalStyles } from '../styles/global'
import logoImg from '../assets/logo.svg';
import { Container, Header } from '../styles/pages/app';
import Image from 'next/image';
import { QueryClientProvider } from 'react-query';
import { queryClient } from '../lib/query';

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Container>
        <Header>
          <Image src={logoImg.src} alt="" width={200} height={200}/>
        </Header>
        <Component {...pageProps} />
      </Container>
    </QueryClientProvider>
  )
}
