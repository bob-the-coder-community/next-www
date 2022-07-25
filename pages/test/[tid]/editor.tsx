import React from 'react';
import MarkdownViewer from '../../../components/test-platform/MDViewer';
import TestPlatformNavbar from '../../../components/test-platform/Nabar';
import TestPlatformTimer from '../../../components/test-platform/Timer';
import { NextPageContext } from 'next';
import httpClient from '../../../services/api/axios';
import { AxiosResponse } from 'axios';
import { markdown } from '../../../services/markdown';
import TestPlatformEditor from '../../../components/test-platform/Editor';
import dayjs from 'dayjs';

type Props = {
    tid: string;
    problems: {
        _id: string;
        title: string;
        problem: string;
        default_code: string;
    }[];
    test: {
        meta: {
            startTime: number;
        };
    };
    system: {
        os: string;
        userAgent: string;
        browser: string;
    }
};
type State = {
    active_problem: string;
    editor_cache: {
        problem_id: string;
        source_code: string;
    }[];
    system?: {
        os: string;
        ipAddress: string;
        browser: string;
        timezone: string;
        userAgent: string;
        screenResolution: string;
    };
    isTimeout: boolean;
    isSubmitting: boolean;
};

class TestPlatformEditorPage extends React.PureComponent<Props, State> {
    MetaTimeout: any;

    constructor(props: Props) {
        super(props);
        this.state = {
            active_problem: props.problems[0]._id,
            editor_cache: props.problems.map((problem) => ({
                problem_id: problem._id,
                source_code: problem.default_code || ''
            })),
            system: {
                ipAddress: '',
                timezone: '',
                screenResolution: '',
                browser: props.system.browser,
                userAgent: props.system.userAgent,
                os: props.system.os
            },
            isTimeout: dayjs.unix(props.test.meta.startTime).isAfter(dayjs.unix(props.test.meta.startTime).add(30, 'minutes')),
            isSubmitting: false,
        }

        if (typeof window !== 'undefined') {
            this.state = {
                ...this.state,
                system: {
                    ...this.state.system as any,
                    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                    screenResolution: `${window.screen.availWidth}px * ${window.screen.availHeight}px`,
                }
            }
        }

        console.log(this.state);
    }

    componentDidMount() {
        this.updateMeta();
    }

    componentWillUnmount() {
        clearTimeout(this.MetaTimeout);
    }

    updateMeta() {
        this.MetaTimeout = setTimeout(async () => {
            const { tid } = this.props;
            await httpClient.post(`/api/test/${tid}?action=update-meta`, this.state);
            this.updateMeta();
        }, 10000);
    }

    toggleProblem(problem: string): void {
        this.setState({ active_problem: problem });
    }

    getDescription(): string {
        const { problems } = this.props;
        const { active_problem } = this.state;
        return markdown.parse(problems.find((problem) => problem._id == active_problem)?.problem as string);
    }

    getSourceCode(id: string): string {
        const { editor_cache } = this.state;
        const { problems } = this.props;
        const code = editor_cache.find((problem) => id === problem.problem_id)?.source_code as string;
        return ((!code || code.trim() === '') ? problems.find((problem) => id === problem._id)?.default_code : code) as string;
    }

    saveSourceCode(id: string, code: string): void {
        const { editor_cache } = this.state;
        const problemIndex = editor_cache.findIndex((problem) => id === problem.problem_id);

        editor_cache[problemIndex].source_code = code;
        this.setState({ editor_cache });
    }

    async submitTest() {
        const { tid } = this.props;
        this.setState({ isSubmitting: true });
        
        try {
            await httpClient.post(`/api/test/${tid}?action=submit-test`, this.state);
            window.location.href = `/test/${tid}/thank-you`
        } catch (err) {
            alert('There was an error. Try again');
            console.error(err);
        } finally {
            this.setState({ isSubmitting: false });
        }
    }

    render(): JSX.Element {
        const { problems, test, } = this.props;
        const { active_problem, isTimeout } = this.state;

        return (
            <div className="test-platform-editor-page">
                <div className="d-flex flex-column">
                    <TestPlatformNavbar />
                    <main>
                        <div className="page-content">
                            <div className="d-flex flex-row page-tabs">
                                <div className="flex-fill lhs page-tab">
                                    <ul className="nav">
                                        {
                                            problems.map((problem, index: number) => (
                                                <li className="nav-item">
                                                    <a
                                                        className={`nav-link ${active_problem === problem._id && 'active'}`}
                                                        onClick={() => this.toggleProblem(problem._id)}>
                                                        Problem #{index + 1}
                                                    </a>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                    <MarkdownViewer
                                        text={this.getDescription()} />
                                </div>
                                <div className="flex-fill rhs page-tab">
                                    {
                                        problems.map((problem) => (
                                            <>
                                                {
                                                    active_problem === problem._id && (
                                                        <TestPlatformEditor
                                                            _id={problem._id}
                                                            key={problem._id}
                                                            onChange={(code) => this.saveSourceCode(problem._id, code)}
                                                            defaultCode={this.getSourceCode(problem._id)}
                                                            disable={isTimeout}
                                                        >
                                                            <TestPlatformTimer
                                                                start={test.meta.startTime}
                                                                onComplete={() => {
                                                                    this.setState({ isTimeout: true });
                                                                    console.log('updating timeout');
                                                                }}
                                                                />
                                                            <div className="actions">
                                                                <button className="btn btn-primary" onClick={() => this.submitTest()}>SUBMIT</button>
                                                            </div>
                                                        </TestPlatformEditor>
                                                    )
                                                }
                                            </>
                                        ))
                                    }
                                </div>
                            </div>
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
        { data: test },
        { data: instruction },
        { data: problems },
    ] = await Promise.all([
        await httpClient.get(`/api/test/${tid}?action=get-test`) as AxiosResponse<any>,
        await httpClient.get(`/api/test/${tid}?action=get-instructions`) as AxiosResponse<any>,
        await httpClient.get(`/api/test/${tid}?action=get-problems`) as AxiosResponse<any>,
    ]);

    if (!test || !instruction || !problems || problems.length == 0) {
        return {
            props: {},
            notFound: true,
        }
    }

    console.log(context.req?.headers);

    test.meta = JSON.parse(test.meta);
    return {
        props: {
            tid,
            test,
            instruction,
            problems,
            system: {
                userAgent: context.req?.headers['user-agent'],
                browser: context.req?.headers['sec-ch-ua'],
                os: context.req?.headers['sec-ch-ua-platform'],
            }
        }
    }
}

export default TestPlatformEditorPage;