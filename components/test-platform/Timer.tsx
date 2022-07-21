import dayjs from 'dayjs';
import React from 'react';

type Props = {
    start: number;
};
type State = {
    elapsed: string;
};

class TestPlatformTimer extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            elapsed: '--:--'
        }
    }

    componentDidMount() {
        requestAnimationFrame(() => {
            const { start } = this.props;
            console.log(start);
            const now = Date.now();

            const inMinutes = dayjs.unix(0).add(dayjs.unix(start).diff(dayjs.unix(now), 'minutes'), 'minutes').format('mm:ss');
            console.log(inMinutes);
            // setTimeout(() => this.componentDidMount(), 1000);
        });
    }

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
