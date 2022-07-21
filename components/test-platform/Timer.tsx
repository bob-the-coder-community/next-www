import dayjs from 'dayjs';
import React from 'react';

type Props = {
    start: number;
};
type State = {
    elapsed: string;
};

class TestPlatformTimer extends React.PureComponent<Props, State> {
    Interval: any;
    constructor(props: Props) {
        super(props);
        this.state = {
            elapsed: '--:--'
        }
    }

    componentDidMount() {
        const { start } = this.props;
        const finish = dayjs.unix(start / 1000).add(30, 'minutes').unix() * 1000;

        this.Interval = setInterval(() => {
            const now = dayjs().unix();
            this.setState({ elapsed: dayjs().startOf('day').add(finish - now, 'seconds').format('mm:ss') })
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.Interval);
    }

    render(): JSX.Element {
        const { elapsed } = this.state;

        return (
            <div className="test-platform-timer d-flex flex-row">
                <img src="/images/test-platform/timer.svg" alt="Timer" />
                <h3>{elapsed}</h3>
            </div>
        )
    }
}

export default TestPlatformTimer;
