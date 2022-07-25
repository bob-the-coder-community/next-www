import Head from 'next/head';
import React from 'react';

type Props = {};
type State = {};

class Error404Page extends React.PureComponent<Props, State> {
    render(): JSX.Element {
        return (
            <div className="test-platform-thank-you">
                <div className="container">
                    <Head>
                        <title>404: Not found</title>
                    </Head>
                    <h1>Error 404</h1>
                    <p>
                        The page you are looking may not exist. 
                    </p>
                </div>
            </div>
        )
    }
}

export default Error404Page;