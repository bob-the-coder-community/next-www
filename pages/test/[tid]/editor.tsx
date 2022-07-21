import React from 'react';
import MarkdownViewer from '../../../components/test-platform/MDViewer';
import TestPlatformNavbar from '../../../components/test-platform/Nabar';
import TestPlatformTimer from '../../../components/test-platform/Timer';
import { NextPageContext } from 'next';
import httpClient from '../../../services/api/axios';
import { AxiosResponse } from 'axios';
import { markdown } from '../../../services/markdown';
import TestPlatformEditor from '../../../components/test-platform/Editor';

type Props = {
    problems: {
        _id: string;
        title: string;
        problem: any[];
        default_code: string;
    }[];
    test: {
        meta: {
            startTime: number;
        };
    }
};
type State = {
    active_problem: string;
    editor_cache: {
        problem_id: string;
        source_code: string;
    }[];
};

class TestPlatformEditorPage extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            active_problem: props.problems[0]._id,
            editor_cache: props.problems.map((problem) => ({
                problem_id: problem._id,
                source_code: problem.default_code || ''
            }))
        }

        console.log(this.state.editor_cache);
    }

    componentDidMount() {
        console.log(this.props.test);
    }

    toggleProblem(problem: string): void {
        this.setState({ active_problem: problem });
    }

    getDescription(): string {
        const { problems } = this.props;
        const { active_problem } = this.state;
        return markdown.fromSanityBlock(problems.find((problem) => problem._id == active_problem)?.problem as any[]);
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

    render(): JSX.Element {
        const { problems, test, } = this.props;
        const { active_problem } = this.state;

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
                                                        >
                                                            <TestPlatformTimer start={test.meta.startTime} />
                                                            <div className="actions">
                                                                <button className="btn btn-primary">SUBMIT</button>
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

    test.meta = JSON.parse(test.meta);
    return {
        props: {
            test,
            instruction,
            problems
        }
    }
}

export default TestPlatformEditorPage;