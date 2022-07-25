import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

type Props = {};
type State = {};

class TestPlatformThankYouPage extends React.PureComponent<Props, State> {
    render(): JSX.Element {
        return (
            <div className="test-platform-thank-you">
                <div className="container">
                    <Head>
                        <title>bobTheCoder: Thank you :)</title>
                    </Head>
                    <h1>Thank you :)</h1>
                    <p>
                        Your test has been submitted. We will reach out to you soon. For any help, reach out to us at
                        {' '}
                        <Link href={'mailto:help@bobthecoder.org'}>
                            <a>
                                help@bobthecoder.org
                            </a>
                        </Link>
                    </p>
                </div>
            </div>
        )
    }
}

export default TestPlatformThankYouPage;