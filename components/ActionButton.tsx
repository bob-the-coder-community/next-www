import React from 'react';

type Props = {
    text: string;
    onClick: (callback?: (status: 'complete' | 'error') => void | null) => void;
};
type State = {
    stage: 'prestine' | 'loading' | 'complete' | 'error';
};

class ActionButton extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            stage: 'prestine',
        }
    }

    changeStatus(status: 'complete' | 'error'): void {
        this.setState({ stage: status });
    }

    handleClick(): void {
        const { onClick } = this.props;
        // this.setState({
        //     stage: 'loading',
        // }, 
        //     () => 
        // );
        return onClick();
    }

    render(): JSX.Element {
        const { text } = this.props;
        const { stage } = this.state;

        return (
            <button type="submit" className={`btn btn-dark`} onClick={() => this.handleClick()} disabled={stage === 'complete'}>
                {
                    stage === 'prestine' && (
                        <>{text}</>
                    )
                }

                {
                    stage === 'loading' && (
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                    )
                }

                {
                    stage === 'complete' && (
                        <>✔ Success</>
                    )
                }

                {
                    stage === 'error' && (
                        <>Error</>
                    )
                }
            </button>
        )
    }
}

export default ActionButton;
