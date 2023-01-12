import type {AppProps} from 'next/app';
import Head from "next/head";
import Router from "next/router";
import ym, {YMInitializer} from 'react-yandex-metrika';

import '../styles/globals.css';

Router.events.on('routeChangeComplete', (url: string) => {
    if (typeof window !== 'undefined') {
        ym('hit', url);
    }
});

export default function App({Component, pageProps, router}: AppProps): JSX.Element {

    return (
        <>
            <Head>
                <link rel="icon" href="/favicon.ico"/>
                <link rel="preconnect" href="https://fonts.gstatic.com"/>
                <link rel="preconnect" href="https://mc.yandex.ru"/>

                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                <meta property="og:url" content={process.env.NEXT_PUBLIC_DOMAIN + router.asPath}/>
                <meta property="og:locale" content="ru_RU"/>
            </Head>
            <YMInitializer
                accounts={[]}
                options={{webvisor: true, defer: true}}
                version="2"
            />
            <Component {...pageProps} />
        </>
    );
}
