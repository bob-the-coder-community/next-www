import Document, { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

class MyDocument extends Document {
    static async getInitialProps(ctx: any) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html lang="en">
                <Head />
                <body>
                    <Main />
                    <NextScript />

                    <Script src="https://www.googletagmanager.com/gtag/js?id=G-NHJYX4HB6J" strategy="afterInteractive" />
                    <Script id="google-analytics" strategy="afterInteractive">
                        {`
                            window.dataLayer = window.dataLayer || [];
                            function gtag() {
                                dataLayer.push(arguments);
                            }
                            gtag('js', new Date());
    
                            gtag('config', 'G-NHJYX4HB6J');                            
                        `}
                    </Script>
                </body>
            </Html>
        )
    }
}

export default MyDocument