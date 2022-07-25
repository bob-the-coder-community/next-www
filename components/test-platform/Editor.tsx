import React from 'react';
import Monaco from '@monaco-editor/react';
import httpClient from '../../services/api/axios';
import { AxiosResponse } from 'axios';

type Props = {
    _id: string;
    defaultCode?: string;
    onChange?: (code: string) => void;
    disable?: boolean;
};
type State = {
    source_code: string;
    running: boolean;
    logs: {
        type: 'error' | 'output',
        output: string;
    }[];
};

class TestPlatformEditor extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            source_code: props.defaultCode || '',
            running: false,
            logs: [],
        }
    }

    saveSourceCode(source_code: string): void {
        this.setState({ source_code }, () => {
            const { onChange } = this.props;
            onChange && onChange(source_code);
        });
    }

    async runCode(source_code: string): Promise<void> {
        this.setState({ running: true, logs: [] });
        try {
            const { _id } = this.props;
            const { data } = await httpClient.post(`/api/test/${_id}?action=execute-program`, { source_code }) as AxiosResponse<any>;

            const results: {
                type: 'error' | 'output',
                output: string;
            }[] = [];

            if (data.result.stderr) {
                data.result.stderr.split('\n').forEach((line: string) => {
                    results.push({ type: 'error', output: line.replace(/\s/g, '&nbsp;') });
                });

                this.setState({ logs: results });
                return;
            }

            if (data.result.stdout) {
                data.result.stdout.split('\n').forEach((line: string) => {
                    results.push({ type: 'output', output: line.replace(/\s/g, '&nbsp;') })
                });
    
                this.setState({ logs: results });
                return;
            }
        } catch (err) {
            console.error(err);
        } finally {
            this.setState({ running: false });
        }
    }

    render(): JSX.Element {
        const { children, disable } = this.props;
        const { source_code, running, logs } = this.state;
        const editorOptions = {
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            // model: null,
            language: "javascript",
            quickSuggestions: false,
            readOnly: disable,
        }

        return (
            <>
                <div className="ide">
                    <ul className="nav">
                        <li className="nav-item">
                            <a className="nav-link file-name active">index.js</a>
                        </li>
                    </ul>
                    <Monaco
                        height={'50vh'}
                        defaultLanguage="javascript"
                        value={source_code}
                        className="pt-1"
                        onChange={(code) => this.saveSourceCode(code as string)}
                        options={editorOptions}
                    />
                </div>
                <div className="terminal">
                    <div className="d-flex flex-column h-100">
                        <div className="flex-fill p-3 overflow-auto input-area">
                            {running && <small className="running">Executing...</small>}
                            {
                                !running && logs.map((line, index: number) => <small key={index} className={line.type} dangerouslySetInnerHTML={{ __html: line.output }} />)
                            }
                            <h6>
                                {'> '}
                                <span className="blinking-cursor" />
                            </h6>
                        </div>
                        <div className="terminal-footer p-2">
                            <div className="d-flex flex-row justify-content-between align-items-center">
                                <div className="flex-grow-1">
                                    <button className="btn run-button" onClick={() => this.runCode(source_code)} disabled={disable}>
                                        <img src="/images/test-platform/run.svg" alt="RUN" />
                                        RUN
                                    </button>
                                </div>
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default TestPlatformEditor;
