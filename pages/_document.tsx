import Document, { Html, Head, Main, NextScript } from 'next/document'

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
                    <script defer data-domain="bobthecoder.org" src="https://analytics.bobthecoder.org/js/plausible.js"></script>
                </body>
            </Html>
        )
    }
}

export default MyDocument