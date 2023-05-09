import type { AppProps } from 'next/app'
import * as React from 'react';
import "@/styles/globals.scss"
import { appWithTranslation } from 'next-i18next'
import LangProvider from '@/contexts/lang'
import { SessionProvider } from "next-auth/react"

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return(
    <SessionProvider session={session}>
          <LangProvider>
            <Component {...pageProps} />
          </LangProvider>
        </SessionProvider>

    )
  }

export default appWithTranslation(App)
