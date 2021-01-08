import { ReactNode } from 'react'
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
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@500;700&family=Roboto:wght@300;400;500;700;900&family=Satisfy&display=swap" rel="stylesheet"></link>
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