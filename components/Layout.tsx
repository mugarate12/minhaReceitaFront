import { ReactNode } from 'react';
import Head from 'next/head'

type Props = {
  children: ReactNode
}

export const siteTitle = 'Minha Receita'

export default function Layout({
  children
}: Props) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="reivente e guarde suas receitas no melhor lugar"
          content="meu conteúdo"
        />
        <meta name="og:title" content={siteTitle} />
      </Head>
      { children }
    </>
  );
}