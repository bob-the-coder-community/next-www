import React from 'react';
import MarkdownViewer from '../../../components/test-platform/MDViewer';
import TestPlatformNavbar from '../../../components/test-platform/Nabar';

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
                                <div className="flex-fill lhs">
                                    <ul className="nav">
                                        <li className="nav-item">
                                            <a className={`nav-link ${ active_problem === 'problem-1' && 'active'  }`} onClick={() => this.toggleProblem('problem-1')}>Problem #1</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className={`nav-link ${ active_problem === 'problem-2' && 'active'  }`} onClick={() => this.toggleProblem('problem-2')}>Problem #2</a>
                                        </li>
                                    </ul>
                                    <MarkdownViewer text={markdown} />
                                </div>
                                <div className="flex-fill">
                                    {/* <Monaco
                                        height={'60vh'}
                                        defaultLanguage="javascript"
                                        defaultValue="Hello, World!"
                                    /> */}
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