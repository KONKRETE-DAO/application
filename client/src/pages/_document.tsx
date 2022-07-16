import Document, { DocumentContext, Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link rel="icon" href="/favicon.svg" />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Varela&display=swap"
                        rel="stylesheet"
                    />
                    <link
                        rel="preload"
                        href="/fonts/Fontello-Regular.woff2"
                        as="font"
                        type="font/woff2"
                        crossOrigin="anonymous"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument