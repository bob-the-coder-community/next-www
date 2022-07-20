import Link from 'next/link';
import React from 'react';
import { NextPageContext } from 'next';
import { Sanity } from '../../../services/api/sanity';
import { markdown } from '../../../services/markdown';
import TestPlatformNavbar from '../../../components/test-platform/Nabar';
import dayjs from 'dayjs';
import httpClient from '../../../services/api/axios';
import { AxiosResponse } from 'axios';

type Props = {
    tid: string;
    title: string;
    instructions: string;
    company: {
        name: string;
        website: string;
    }
};
type State = {
    isLoading: boolean;
};

export default class TestLandingPage extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            isLoading: false,
        }
    };

    async start(): Promise<void> {
        this.setState({ isLoading: true });
        try {
            const { tid } = this.props;
            await httpClient.get(`/api/test/${tid}?action=start-test`);

            window.location.href = `/test/${tid}/editor`;
        } catch (err) {
            console.error(err);
        } finally {
            this.setState({ isLoading: false });
        }
    }

    render(): JSX.Element {
        const { title, company, instructions } = this.props;
        const { isLoading } = this.state;

        return (
            <div className="test-platform">
                <div className="d-flex flex-column page-content">
                    <TestPlatformNavbar container />
                    <main className="flex-grow-1 h-100 bg-primary my-5">
                        <div className="container page-content">
                            <h1 className="page-title">
                                <Link href={company.website}>
                                    <small>{company.name}</small>
                                </Link>
                                <u>{title}</u>
                            </h1>
                            <div className="instructions">
                                <strong>Instructions:</strong>
                                <div dangerouslySetInnerHTML={{ __html: instructions }} />
                            </div>
                            <button className="btn btn-dark" disabled={isLoading} onClick={() => this.start()}>Start now</button>
                            <p className="help-text">
                                Notice something wrong? Write to us at
                                {' '}
                                <Link href={'mailto:help@bobthecoder.org'}>
                                    <a>help@bobthecoder.org</a>
                                </Link>
                            </p>
                        </div>
                    </main>
                </div>
            </div>
        )
    }
}

export async function getServerSideProps(context: NextPageContext) {
    const { query: { tid } } = context;
    const [
        { data: tests },
        { data: instructions }
    ] = await Promise.all([
        await httpClient.get(`/api/test/${tid}?action=get-test`) as AxiosResponse<any>,
        await httpClient.get(`/api/test/${tid}?action=get-instructions`) as AxiosResponse<any>,
    ]);
    
    /** Test not found */
    if (!tests) {
        return {
            props: {},
            notFound: true,
        }
    }

    /** Instructions not found */
    if (!instructions) {
        return {
            props: {},
            notFound: true,
        }
    }

    /** If exam is completed, then show 404 */
    if (tests.state !== 'invitation-pending') {
        return {
            props: {},
            notFound: true,
        }
    }

    /** If invitation was sent 24 hours prior, send 404 */
    // if (dayjs(tests[0]._createdAt).isBefore(dayjs().add(24, 'hours'))) {
    //     return {
    //         props: {},
    //         notFound: true,
    //     }
    // }

    return {
        props: {
            tid,
            title: instructions.title,
            company: {
                name: instructions.company,
                website: instructions.website
            },
            instructions: markdown.fromSanityBlock(instructions.instructions)
        }, // will be passed to the page component as props
    }
}