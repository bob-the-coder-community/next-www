import Link from 'next/link';
import React from 'react';
import { NextPageContext } from 'next';
import { Sanity } from '../../../services/api/sanity';
import { markdown } from '../../../services/markdown';
import TestPlatformNavbar from '../../../components/test-platform/Nabar';
import dayjs from 'dayjs';

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
            isLoading: true,
        }
    };

    private async start(): Promise<void> {
        this.setState({ isLoading: true });
        try {
            const { tid } = this.props;
            const result = await Sanity.Patch(tid, { state: 'in-progress' });

            console.log(result);
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
    const tests = await Sanity.Query(`*[_type == "invitation" && _id == "${tid}"]`);
    
    /** Test not found */
    if (!tests || tests.length == 0) {
        return {
            props: {},
            notFound: true,
        }
    }

    const instructions = await Sanity.Query(`*[_type == "position" && _id == "${tests[0].position[0]._ref}"]`);

    /** Instructions not found */
    if (!instructions || instructions.length == 0) {
        return {
            props: {},
            notFound: true,
        }
    }

    /** If exam is completed, then show 404 */
    if (tests[0].state !== 'invitation-pending') {
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
            title: instructions[0].title,
            company: {
                name: instructions[0].company,
                website: instructions[0].website
            },
            instructions: markdown.fromSanityBlock(instructions[0].instructions)
        }, // will be passed to the page component as props
    }
}