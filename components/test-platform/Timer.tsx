import dayjs from 'dayjs';
import React from 'react';

type Props = {
    start: number;
    onComplete?: () => void;
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
        const { start, onComplete } = this.props;

        this.Interval = setInterval(() => {
            const now = dayjs().unix();
            const duration  = dayjs.unix(start / 1000).add(30, 'minutes').diff(dayjs.unix(now), 'seconds');
            const elapsed = dayjs().startOf('day').add(duration, 'seconds').format('mm:ss');

            if (duration < 1) {
                this.setState({ elapsed: '00:00' }, () => onComplete && onComplete());
                return clearInterval(this.Interval);
            }

            this.setState({ elapsed }, () => {
                document.title = `${elapsed} - bobTheCoder: Test Platform`;
            })
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
