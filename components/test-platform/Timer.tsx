import React from 'react';

type Props = {};
type State = {};

class TestPlatformTimer extends React.PureComponent<Props, State> {
    render(): JSX.Element {
        return (
            <div className="test-platform-timer d-flex flex-row">
                <img src="/images/test-platform/timer.svg" alt="Timer" />
                <h3>30:00</h3>
            </div>
        )
    }
}

export default TestPlatformTimer;
