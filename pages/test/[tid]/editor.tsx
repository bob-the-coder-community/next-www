import React from 'react';
import Monaco from '@monaco-editor/react';
import MarkdownViewer from '../../../components/test-platform/MDViewer';
import TestPlatformNavbar from '../../../components/test-platform/Nabar';
import TestPlatformTimer from '../../../components/test-platform/Timer';

type Props = {};
type State = {
    active_problem: string,
    markdown: string;
};

class TestPlatformEditorPage extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            active_problem: 'problem-1',
            markdown: ''
        }
    }

    componentDidMount() {
        fetch('/mock-data/test-data.md').then((d) => d.text()).then((t) => this.setState({ markdown: t })).catch(console.error);
    }

    toggleProblem(problem: string): void {
        this.setState({ active_problem: problem });
    }

    render(): JSX.Element {
        const { markdown, active_problem } = this.state;

        return (
            <div className="test-platform-editor-page">
                <div className="d-flex flex-column">
                    <TestPlatformNavbar />
                    <main>
                        <div className="page-content">
                            <div className="d-flex flex-row page-tabs">
                                <div className="flex-fill lhs page-tab">
                                    <ul className="nav">
                                        <li className="nav-item">
                                            <a className={`nav-link ${active_problem === 'problem-1' && 'active'}`} onClick={() => this.toggleProblem('problem-1')}>Problem #1</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className={`nav-link ${active_problem === 'problem-2' && 'active'}`} onClick={() => this.toggleProblem('problem-2')}>Problem #2</a>
                                        </li>
                                    </ul>
                                    <MarkdownViewer text={markdown} />
                                </div>
                                <div className="flex-fill rhs page-tab">
                                    <div className="ide">
                                        <ul className="nav">
                                            <li className="nav-item">
                                                <a className="nav-link file-name active">index.js</a>
                                            </li>
                                        </ul>
                                        <Monaco
                                            height={'50vh'}
                                            defaultLanguage="javascript"
                                            defaultValue="Hello, World!"
                                            className="pt-1"
                                        />
                                    </div>
                                    <div className="terminal">
                                        <div className="d-flex flex-column h-100">
                                            <ul className="nav">
                                                <li className="nav-item">
                                                    <a className="nav-link active">Input</a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link">Output</a>
                                                </li>
                                            </ul>
                                            <div className="flex-fill p-3 overflow-auto input-area" contentEditable />
                                            <div className="terminal-footer p-2">
                                                <div className="d-flex flex-row justify-content-between align-items-center">
                                                    <TestPlatformTimer />
                                                    <button className="btn btn-primary">SUBMIT</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        )
    }
}

export default TestPlatformEditorPage;